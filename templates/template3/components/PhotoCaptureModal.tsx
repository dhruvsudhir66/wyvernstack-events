"use client";

import { WeddingImg } from "@/components/wedding-media";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTemplate3 } from "@/templates/template3/context";

type PhotoCaptureModalProps = {
  open: boolean;
  onClose: () => void;
};


/* =========================================================
   IMAGE RESIZE
========================================================= */

function resizeImage(source: HTMLVideoElement): string {
  const maxWidth = 1600;
  const maxHeight = 1600;

  let width = source.videoWidth;
  let height = source.videoHeight;

  if (!width || !height) {
    throw new Error("Camera image is not ready.");
  }

  const scale = Math.min(1, maxWidth / width, maxHeight / height);

  width = Math.round(width * scale);
  height = Math.round(height * scale);

  const canvas = document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Could not create image canvas.");
  }

  context.drawImage(source, 0, 0, width, height);

  return canvas.toDataURL("image/jpeg", 0.82);
}

/* =========================================================
   SAVE TO DEVICE

   Android can download the file straight into storage.
   iOS will not write a web photo into Photos from script,
   so the system share sheet is used and the guest taps
   Save Image. Both paths stay inside the shutter tap so
   the browser still treats it as a user gesture.
========================================================= */

function dataUrlToFile(dataUrl: string, fileName: string): File {
  const [header, encoded] = dataUrl.split(",");
  const mime = /:(.*?);/.exec(header)?.[1] ?? "image/jpeg";
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return new File([bytes], fileName, { type: mime });
}

function isIosDevice() {
  const userAgent = navigator.userAgent;
  const iPhoneOrIPad = /iPad|iPhone|iPod/.test(userAgent);
  const iPadOsDesktop =
    navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;

  return iPhoneOrIPad || iPadOsDesktop;
}

function downloadPhotoFile(file: File) {
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");

  link.href = url;
  link.download = file.name;
  link.rel = "noopener";
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1500);
}

async function savePhotoToDevice(dataUrl: string) {
  const file = dataUrlToFile(dataUrl, `wedding-moment-${Date.now()}.jpg`);

  const canShareFile =
    typeof navigator.share === "function" &&
    typeof navigator.canShare === "function" &&
    navigator.canShare({ files: [file] });

  if (isIosDevice() && canShareFile) {
    try {
      await navigator.share({ files: [file] });
      return;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        throw error;
      }
    }
  }

  downloadPhotoFile(file);
}

/* =========================================================
   MODAL
========================================================= */

export default function PhotoCaptureModal({
  open,
  onClose,
}: PhotoCaptureModalProps) {
  const googleScriptUrl = useTemplate3().integrations.photoUrl;
  const [mounted, setMounted] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const streamRef = useRef<MediaStream | null>(null);

  const [cameraReady, setCameraReady] = useState(false);

  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  const [deviceCopySaved, setDeviceCopySaved] = useState(false);

  const savedToDeviceRef = useRef(false);
  const saveInFlightRef = useRef(false);

  const [status, setStatus] = useState<
    "idle" | "starting" | "capturing" | "submitting" | "success" | "error"
  >("idle");

  const [errorMessage, setErrorMessage] = useState("");

  /* =========================================================
     CLIENT MOUNT
  ========================================================= */

  useEffect(() => {
    setMounted(true);
  }, []);

  /* =========================================================
     STOP CAMERA
  ========================================================= */

  const stopCamera = () => {
    if (!streamRef.current) {
      return;
    }

    streamRef.current.getTracks().forEach((track) => track.stop());

    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraReady(false);
  };

  /* =========================================================
     START CAMERA
  ========================================================= */

  const startCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setStatus("error");
      setErrorMessage("Camera access is not supported by this browser.");
      return;
    }

    setStatus("starting");
    setErrorMessage("");

    try {
      stopCamera();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: {
            ideal: "environment",
          },
          width: {
            ideal: 1920,
          },
          height: {
            ideal: 1080,
          },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (!videoRef.current) {
        stream.getTracks().forEach((track) => track.stop());

        streamRef.current = null;

        throw new Error("Camera preview could not be initialized.");
      }

      videoRef.current.srcObject = stream;

      await videoRef.current.play();

      setCameraReady(true);
      setStatus("idle");
    } catch (error) {
      console.error("Camera access error:", error);

      stopCamera();

      setStatus("error");

      if (error instanceof DOMException && error.name === "NotAllowedError") {
        setErrorMessage(
          "Camera permission was denied. Please allow camera access and try again.",
        );
      } else if (
        error instanceof DOMException &&
        error.name === "NotFoundError"
      ) {
        setErrorMessage("No camera was found on this device.");
      } else {
        setErrorMessage("We could not open your camera. Please try again.");
      }
    }
  };

  /* =========================================================
     OPEN / CLOSE
  ========================================================= */

  useEffect(() => {
    if (!open) {
      stopCamera();

      setCapturedPhoto(null);
      setDeviceCopySaved(false);
      savedToDeviceRef.current = false;
      setStatus("idle");
      setErrorMessage("");

      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    void startCamera();

    return () => {
      document.body.style.overflow = previousOverflow;

      document.removeEventListener("keydown", handleEscape);

      stopCamera();
    };
  }, [open]);

  /* =========================================================
     CLOSE
  ========================================================= */

  const closeModal = () => {
    stopCamera();

    setCapturedPhoto(null);
    setDeviceCopySaved(false);
    savedToDeviceRef.current = false;
    setStatus("idle");
    setErrorMessage("");

    onClose();
  };

  const rememberDeviceSave = async (photo: string) => {
    if (savedToDeviceRef.current || saveInFlightRef.current) {
      return;
    }

    saveInFlightRef.current = true;

    try {
      await savePhotoToDevice(photo);
      savedToDeviceRef.current = true;
      setDeviceCopySaved(true);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      console.error("Could not save photo to device:", error);
    } finally {
      saveInFlightRef.current = false;
    }
  };

  /* =========================================================
     CAPTURE
  ========================================================= */

  const capturePhoto = () => {
    if (!videoRef.current || !cameraReady || capturedPhoto) {
      return;
    }

    try {
      setStatus("capturing");

      const photo = resizeImage(videoRef.current);

      /*
       * Exactly one photo is stored.
       *
       * Camera is stopped immediately after capture
       * so another photo cannot accidentally be taken.
       */
      setCapturedPhoto(photo);

      stopCamera();

      setStatus("idle");

      void rememberDeviceSave(photo);
    } catch (error) {
      console.error("Photo capture error:", error);

      setStatus("error");
      setErrorMessage("We could not capture the photo. Please try again.");
    }
  };

  /* =========================================================
     RETAKE
  ========================================================= */

  const retakePhoto = () => {
    setCapturedPhoto(null);
    setDeviceCopySaved(false);
    savedToDeviceRef.current = false;
    setErrorMessage("");
    setStatus("idle");

    void startCamera();
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const submitPhoto = async () => {
    if (!capturedPhoto) {
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    if (!savedToDeviceRef.current) {
      void rememberDeviceSave(capturedPhoto);
    }

    try {
      /*
       * We deliberately send text/plain instead of
       * application/json so the request remains a
       * simple cross-origin request to Google Apps Script.
       */
      const payload = {
        type: "wedding_photo",
        photo: capturedPhoto,
        submittedAt: new Date().toISOString(),
      };

      await fetch(googleScriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      setStatus("success");
    } catch (error) {
      console.error("Photo submission error:", error);

      setStatus("error");

      setErrorMessage("We could not submit your photo. Please try again.");
    }
  };

  /* =========================================================
     NOT MOUNTED / CLOSED
  ========================================================= */

  if (!mounted || !open) {
    return null;
  }

  /* =========================================================
     MODAL
  ========================================================= */

  const modal = (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-[#30352B]/65
        p-4
        backdrop-blur-[6px]
        sm:p-6
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="photo-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closeModal();
        }
      }}
    >
      <div
        className="
          relative
          w-full
          max-w-[390px]
          overflow-hidden
          bg-[#F8F4EA]
          text-[#30352B]
          shadow-[0_24px_75px_rgba(20,24,20,0.30)]
        "
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
      >
        {/* =================================================
            TOP ACCENT
        ================================================= */}

        <div
          aria-hidden="true"
          className="
            absolute
            left-0
            right-0
            top-0
            h-[2px]
            bg-[#59674D]
          "
        />

        {/* =================================================
            CLOSE
        ================================================= */}

        <button
          type="button"
          onClick={closeModal}
          disabled={status === "submitting"}
          aria-label="Close photo upload"
          className="
            absolute
            right-3
            top-3
            z-30
            flex
            h-7
            w-7
            items-center
            justify-center
            text-[#59674D]/70
            transition-opacity
            hover:opacity-50
            disabled:opacity-30
          "
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            className="h-3.5 w-3.5"
            aria-hidden="true"
          >
            <path d="M6 6L18 18" />
            <path d="M18 6L6 18" />
          </svg>
        </button>

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            border-b
            border-[#59674D]/12
            px-5
            pb-4
            pt-6
          "
        >
          <div className="flex items-center gap-2">
            <span className="font-mono text-[6px] tracking-[0.2em] text-[#59674D]">
              04
            </span>

            <span className="h-px w-4 bg-[#59674D]/35" />

            <span className="font-sans text-[6px] font-semibold uppercase tracking-[0.22em] text-[#59674D]">
              SHARE A MOMENT
            </span>
          </div>

          <h2
            id="photo-modal-title"
            className="
              mt-2.5
              pr-8
              font-display
              text-[1.8rem]
              font-medium
              leading-[0.9]
              tracking-[-0.03em]
            "
          >
            Add your photo.
          </h2>

          <p
            className="
              mt-1.5
              max-w-[290px]
              font-display
              text-[12px]
              leading-[1.45]
              text-[#59674D]/70
            "
          >
            Capture one moment from the day and share it with us.
          </p>
        </div>

        {/* =================================================
            SUCCESS
        ================================================= */}

        {status === "success" ? (
          <div
            className="
              px-5
              py-10
              text-center
            "
          >
            <div
              className="
                mx-auto
                flex
                h-11
                w-11
                items-center
                justify-center
                border
                border-[#59674D]/20
                text-[#59674D]
              "
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                className="h-5 w-5"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>
            </div>

            <h3
              className="
                mt-4
                font-display
                text-[1.9rem]
                leading-none
              "
            >
              Moment shared.
            </h3>

            <p
              className="
                mx-auto
                mt-2
                max-w-[270px]
                font-display
                text-[12px]
                leading-[1.5]
                text-[#59674D]/70
              "
            >
              Thank you for adding a little piece of the celebration.
            </p>

            <button
              type="button"
              onClick={closeModal}
              className="
                mt-5
                border
                border-[#59674D]
                px-5
                py-2.5
                font-sans
                text-[6px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#59674D]
                transition-colors
                hover:bg-[#59674D]
                hover:text-[#F8F4EA]
              "
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* =============================================
                CAMERA / PREVIEW
            ============================================= */}

            <div
              className="
                relative
                mx-5
                mt-5
                overflow-hidden
                bg-[#30352B]
                aspect-[4/3]
              "
            >
              {!capturedPhoto ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />
              ) : (
                <WeddingImg
                  src={capturedPhoto}
                  alt="Captured wedding photo preview"
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />
              )}

              {/* CAMERA LOADING */}

              {!capturedPhoto && !cameraReady && status === "starting" && (
                <div
                  className="
                      absolute
                      inset-0
                      flex
                      flex-col
                      items-center
                      justify-center
                      bg-[#30352B]
                      text-[#F8F4EA]
                    "
                >
                  <div
                    className="
                        h-6
                        w-6
                        animate-spin
                        rounded-full
                        border
                        border-[#F8F4EA]/20
                        border-t-[#F8F4EA]
                      "
                  />

                  <span
                    className="
                        mt-3
                        font-sans
                        text-[6px]
                        uppercase
                        tracking-[0.18em]
                        text-[#F8F4EA]/65
                      "
                  >
                    Opening camera
                  </span>
                </div>
              )}

              {/* CAMERA ERROR */}

              {!capturedPhoto && status === "error" && (
                <div
                  className="
                      absolute
                      inset-0
                      flex
                      flex-col
                      items-center
                      justify-center
                      bg-[#30352B]
                      px-6
                      text-center
                      text-[#F8F4EA]
                    "
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    className="h-5 w-5 text-[#A87E8E]"
                  >
                    <path d="M12 4 3 20h18L12 4Z" />
                    <path d="M12 9v5" />
                    <path d="M12 17h.01" />
                  </svg>

                  <p
                    className="
                        mt-3
                        max-w-[260px]
                        font-display
                        text-[13px]
                        leading-[1.45]
                        text-[#F8F4EA]/85
                      "
                  >
                    {errorMessage}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setErrorMessage("");
                      setStatus("idle");
                      void startCamera();
                    }}
                    className="
                        mt-4
                        border
                        border-[#F8F4EA]/35
                        px-4
                        py-2
                        font-sans
                        text-[6px]
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-[#F8F4EA]
                        transition-colors
                        hover:bg-[#F8F4EA]/10
                      "
                  >
                    Try again
                  </button>
                </div>
              )}

              {/* VIEWFINDER CORNERS */}

              {!capturedPhoto && cameraReady && (
                <>
                  <span className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l border-t border-white/70" />
                  <span className="pointer-events-none absolute right-3 top-3 h-5 w-5 border-r border-t border-white/70" />
                  <span className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b border-l border-white/70" />
                  <span className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b border-r border-white/70" />
                </>
              )}
            </div>

            {/* =============================================
                CONTROLS
            ============================================= */}

            <div className="px-5 py-5">
              {!capturedPhoto ? (
                <>
                  <p className="text-center font-sans text-[6px] uppercase tracking-[0.16em] text-[#59674D]/50">
                    One photo only
                  </p>

                  <button
                    type="button"
                    onClick={capturePhoto}
                    disabled={!cameraReady || status === "capturing"}
                    className="
                      mx-auto
                      mt-3
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#59674D]
                      text-[#59674D]
                      transition-all
                      duration-200
                      hover:bg-[#59674D]
                      hover:text-[#F8F4EA]
                      active:scale-95
                      disabled:cursor-not-allowed
                      disabled:opacity-30
                    "
                    aria-label="Take photo"
                  >
                    <span className="h-4 w-4 rounded-full border border-current" />
                  </button>

                  <p className="mt-2 text-center font-sans text-[5.5px] uppercase tracking-[0.14em] text-[#59674D]/40">
                    Tap to capture
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={retakePhoto}
                      disabled={status === "submitting"}
                      className="
                        flex-1
                        border
                        border-[#59674D]/25
                        px-3
                        py-3
                        font-sans
                        text-[6px]
                        font-semibold
                        uppercase
                        tracking-[0.17em]
                        text-[#59674D]
                        transition-colors
                        hover:border-[#59674D]/50
                        disabled:opacity-30
                      "
                    >
                      Retake
                    </button>

                    <button
                      type="button"
                      onClick={submitPhoto}
                      disabled={status === "submitting"}
                      className="
                        flex-[1.35]
                        bg-[#30352B]
                        px-3
                        py-3
                        font-sans
                        text-[6px]
                        font-semibold
                        uppercase
                        tracking-[0.17em]
                        text-[#F8F4EA]
                        transition-colors
                        hover:bg-[#59674D]
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                      "
                    >
                      {status === "submitting" ? "Sending..." : "Submit photo"}
                    </button>
                  </div>

                  {deviceCopySaved && (
                    <p className="mt-3 text-center font-sans text-[6px] uppercase tracking-[0.16em] text-[#59674D]/55">
                      Saved to your device
                    </p>
                  )}

                  {status === "error" && errorMessage && (
                    <p className="mt-3 text-center font-sans text-[7px] leading-[1.4] text-[#A87E8E]">
                      {errorMessage}
                    </p>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
