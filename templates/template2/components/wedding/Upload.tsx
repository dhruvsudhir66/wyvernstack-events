"use client";

import { WeddingImg } from "@/components/wedding-media";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Camera, Check, Heart, Mail, X } from "lucide-react";
import Reveal from "@/templates/template2/components/ui/Reveal";
import { useTemplate2 } from "@/templates/template2/context";

type PopupType = "invitation" | "greeting" | null;

type Photo = {
  id: string;
  name: string;
  url: string;
  file: File;
};

export default function Upload() {
  const wedding = useTemplate2();
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [popup, setPopup] = useState<PopupType>(null);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const [isSendingWish, setIsSendingWish] = useState(false);
  const [wishSent, setWishSent] = useState(false);
  const [wishError, setWishError] = useState("");

  function addPhotos(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? []);

    if (!selectedFiles.length) return;

    const newPhotos = selectedFiles.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      name: file.name,
      url: URL.createObjectURL(file),
      file,
    }));

    setPhotos((current) => [...current, ...newPhotos]);

    event.target.value = "";
  }

  function fileToDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Could not read the image."));

      reader.readAsDataURL(file);
    });
  }

  async function prepareImage(file: File): Promise<File> {
    const MAX_SIZE = 1400;
    const QUALITY = 0.78;

    const objectUrl = URL.createObjectURL(file);

    try {
      const image = new Image();

      image.decoding = "async";
      image.src = objectUrl;

      await image.decode();

      let width = image.naturalWidth;
      let height = image.naturalHeight;

      if (!width || !height) {
        throw new Error("Invalid image dimensions.");
      }

      // Resize only when necessary.
      if (width > MAX_SIZE || height > MAX_SIZE) {
        if (width >= height) {
          height = Math.round((height / width) * MAX_SIZE);
          width = MAX_SIZE;
        } else {
          width = Math.round((width / height) * MAX_SIZE);
          height = MAX_SIZE;
        }
      }

      const canvas = document.createElement("canvas");

      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Could not prepare the image.");
      }

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "medium";

      context.drawImage(image, 0, 0, width, height);

      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, "image/jpeg", QUALITY);
      });

      if (!blob) {
        throw new Error("Could not convert the image.");
      }

      const baseName = file.name.replace(/\.[^/.]+$/, "").replace(/\s+/g, "-");

      return new File([blob], `${baseName || "wedding-photo"}.jpg`, {
        type: "image/jpeg",
        lastModified: Date.now(),
      });
    } finally {
      // Very important on low-memory Android devices.
      URL.revokeObjectURL(objectUrl);
    }
  }

  function savePhotoToDevice(file: File) {
    const url = URL.createObjectURL(file);

    const link = document.createElement("a");
    link.href = url;
    link.download = file.name;
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    link.remove();

    // Give the browser time to start the download
    window.setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  function submitToGoogleDrive(file: File): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const image = await fileToDataURL(file);
        const frameName = `wedding-upload-frame-${Date.now()}-${Math.random()}`;

        const iframe = document.createElement("iframe");
        iframe.name = frameName;
        iframe.style.display = "none";
        iframe.setAttribute("aria-hidden", "true");
        document.body.appendChild(iframe);

        const form = document.createElement("form");
        form.method = "POST";
        form.action = wedding.integrations.uploadUrl;
        form.target = frameName;
        form.style.display = "none";

        const imageInput = document.createElement("input");
        imageInput.type = "hidden";
        imageInput.name = "image";
        imageInput.value = image;

        const mimeInput = document.createElement("input");
        mimeInput.type = "hidden";
        mimeInput.name = "mimeType";
        mimeInput.value = "image/jpeg";

        const fileNameInput = document.createElement("input");
        fileNameInput.type = "hidden";
        fileNameInput.name = "fileName";
        fileNameInput.value = file.name;

        form.appendChild(imageInput);
        form.appendChild(mimeInput);
        form.appendChild(fileNameInput);
        document.body.appendChild(form);

        form.submit();

        // Apps Script redirects the POST through Google's web-app endpoint.
        // The hidden iframe avoids browser CORS restrictions.
        window.setTimeout(() => {
          form.remove();
          iframe.remove();
          resolve();
        }, 2200);
      } catch (error) {
        reject(error);
      }
    });
  }

  async function uploadPhotos() {
    if (!photos.length || isUploading) return;

    setIsUploading(true);
    setUploadComplete(false);
    setUploadError("");

    try {
      for (const photo of photos) {
        const preparedFile = await prepareImage(photo.file);
        await submitToGoogleDrive(preparedFile);

        savePhotoToDevice(preparedFile);
      }

      photos.forEach((photo) => URL.revokeObjectURL(photo.url));
      setPhotos([]);
      setUploadComplete(true);
    } catch (error) {
      console.error("Wedding photo upload failed:", error);
      setUploadError(
        error instanceof Error
          ? error.message
          : "Something went wrong while uploading your photos.",
      );
    } finally {
      setIsUploading(false);
    }
  }

  function removePhoto(id: string) {
    setPhotos((current) => {
      const photo = current.find((item) => item.id === id);

      if (photo) {
        URL.revokeObjectURL(photo.url);
      }

      return current.filter((item) => item.id !== id);
    });
  }

  async function handleGreetingSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSendingWish) return;

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedMessage) return;

    setIsSendingWish(true);
    setWishError("");

    try {
      const body = new URLSearchParams();
      body.append("type", "wish");
      body.append("name", trimmedName);
      body.append("message", trimmedMessage);

      const response = await fetch(wedding.integrations.wishesUrl, {
        method: "POST",
        body,
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(
          result.error || "Unable to send your wishes. Please try again.",
        );
      }

      setWishSent(true);
      setName("");
      setMessage("");
    } catch (error) {
      console.error("Wedding wish submission failed:", error);

      setWishError(
        error instanceof Error
          ? error.message
          : "Something went wrong while sending your wishes.",
      );
    } finally {
      setIsSendingWish(false);
    }
  }

  return (
    <>
      {/* =========================================================
          SECTION
      ========================================================= */}

      <section
        id="upload"
        className="
          relative
          isolate
          overflow-hidden
          bg-[#F8EBE6]
          py-16
          sm:py-20
          md:py-24
        "
      >
        {/* =======================================================
            BACKGROUND ATMOSPHERE
        ======================================================= */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Main atmosphere */}
          <div
            className="
      absolute
      left-1/2
      top-[25%]
      h-[400px]
      w-[90vw]
      -translate-x-1/2
      rounded-full
      bg-[#C890A7]/[0.055]
      sm:h-[500px]
      sm:w-[65vw]
    "
          />

          {/* Left blush */}
          <div
            className="
      absolute
      -left-[180px]
      top-[30%]
      h-[340px]
      w-[340px]
      rounded-full
      bg-[#D9AFC0]/[0.07]
    "
          />

          {/* Right blush */}
          <div
            className="
      absolute
      -right-[180px]
      bottom-[5%]
      h-[360px]
      w-[360px]
      rounded-full
      bg-[#C890A7]/[0.05]
    "
          />

          {/* Soft top fade */}
          <div
            className="
      absolute
      inset-x-0
      top-0
      h-40
      bg-gradient-to-b
      from-white/[0.18]
      to-transparent
    "
          />

          {/* Paper grain */}
          <div
            className="
      absolute
      inset-0
      opacity-[0.022]
      [background-image:radial-gradient(
        rgba(105,22,56,0.65)_0.5px,
        transparent_0.5px
      )]
      [background-size:5px_5px]
    "
          />
        </div>

        <div
          className="
            container-wedding
            relative
            z-10
            w-full
            px-5
            sm:px-6
            md:px-8
          "
        >
          <Reveal>
            <div className="mx-auto max-w-4xl">
              {/* =================================================
                  INTRO
              ================================================= */}

              <div className="text-center">
                <div className="flex items-center justify-center gap-3">
                  <span className="h-px w-9 bg-[#691638]/15 sm:w-12" />

                  <p
                    className="
                      text-[8px]
                      font-medium
                      uppercase
                      tracking-[0.3em]
                      text-[#691638]/50
                      sm:text-[9px]
                    "
                  >
                    A little something
                  </p>

                  <span className="h-px w-9 bg-[#691638]/15 sm:w-12" />
                </div>

                <h2
                  className="
                    mx-auto
                    mt-5
                    max-w-[360px]
                    font-display
                    text-[42px]
                    leading-[0.92]
                    tracking-[-0.05em]
                    text-[#691638]
                    sm:max-w-2xl
                    sm:text-[54px]
                    md:text-[64px]
                  "
                >
                  Keep this moment
                  <br />
                  <span className="serif-italic font-light">
                    close to your heart.
                  </span>
                </h2>

                <p
                  className="
                    mx-auto
                    mt-5
                    max-w-[340px]
                    text-[11px]
                    leading-6
                    text-[#691638]/55
                    sm:max-w-lg
                    sm:text-[13px]
                    sm:leading-7
                  "
                >
                  View our invitation, leave us a wish, or capture a little
                  memory from the day.
                </p>
              </div>

              {/* =================================================
                  INTERACTIVE ACTIONS
              ================================================= */}

              <div
                className="
                  mx-auto
                  mt-10
                  flex
                  max-w-2xl
                  items-start
                  justify-center
                  gap-7
                  sm:mt-14
                  sm:gap-12
                  md:gap-16
                "
              >
                {/* -----------------------------------------------
                    INVITATION
                ----------------------------------------------- */}

                <ActionItem
                  label="View invitation"
                  icon={
                    <div className="relative">
                      <Mail size={24} strokeWidth={1.1} />

                      <span
                        className="
                          absolute
                          -right-1
                          -top-1
                          h-1.5
                          w-1.5
                          rounded-full
                          bg-[#C890A7]
                        "
                      />
                    </div>
                  }
                  onClick={() => setPopup("invitation")}
                  delay={0}
                />

                {/* Center ornament */}

                <div
                  className="
                    mt-9
                    hidden
                    h-12
                    w-px
                    bg-[#691638]/10
                    sm:block
                  "
                />

                <div
                  className="
                    mt-9
                    h-1.5
                    w-1.5
                    rotate-45
                    bg-[#C890A7]/60
                    sm:hidden
                  "
                />

                {/* -----------------------------------------------
                    GREETINGS
                ----------------------------------------------- */}

                <ActionItem
                  label="Send your wishes"
                  icon={
                    <div className="relative">
                      <Heart size={24} strokeWidth={1.1} />

                      <span
                        className="
                          absolute
                          -bottom-1
                          -right-2
                          h-1.5
                          w-1.5
                          rounded-full
                          bg-[#C890A7]/70
                        "
                      />
                    </div>
                  }
                  onClick={() => {
                    setWishSent(false);
                    setWishError("");
                    setPopup("greeting");
                  }}
                  delay={0.1}
                />

                <div
                  className="
                    mt-9
                    h-1.5
                    w-1.5
                    rotate-45
                    bg-[#C890A7]/60
                    sm:hidden
                  "
                />

                {/* -----------------------------------------------
                    PHOTOS
                ----------------------------------------------- */}

                <ActionItem
                  label="Share a memory"
                  icon={<Camera size={24} strokeWidth={1.1} />}
                  onClick={() => cameraInputRef.current?.click()}
                  delay={0.2}
                />
              </div>

              {/* =================================================
                  PHOTO PREVIEW
              ================================================= */}

              <AnimatePresence>
                {photos.length > 0 && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0,
                      marginTop: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                      marginTop: 42,
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                      marginTop: 0,
                    }}
                    className="overflow-hidden"
                  >
                    <div
                      className="
                        border
                        border-[#691638]/10
                        bg-[#F3E7E3]/75
                        p-5
                        sm:p-7
                      "
                    >
                      <div
                        className="
                          flex
                          flex-col
                          gap-2
                          sm:flex-row
                          sm:items-end
                          sm:justify-between
                        "
                      >
                        <div>
                          <p
                            className="
                              text-[8px]
                              uppercase
                              tracking-[0.25em]
                              text-[#691638]/50
                            "
                          >
                            Your memories
                          </p>

                          <h3
                            className="
                              mt-2
                              font-display
                              text-2xl
                              tracking-[-0.03em]
                              text-[#691638]
                              sm:text-3xl
                            "
                          >
                            {photos.length}{" "}
                            {photos.length === 1 ? "photo" : "photos"} selected
                          </h3>
                        </div>

                        <button
                          type="button"
                          onClick={() => cameraInputRef.current?.click()}
                          className="
                            flex
                            w-fit
                            items-center
                            gap-2
                            text-[8px]
                            uppercase
                            tracking-[0.18em]
                            text-[#691638]/55
                            transition-colors
                            hover:text-[#691638]
                          "
                        >
                          <Camera size={12} strokeWidth={1.3} />
                          Add another
                        </button>
                      </div>

                      {/* Photo grid */}

                      <div
                        className="
                          mt-6
                          grid
                          grid-cols-2
                          gap-3
                          sm:grid-cols-3
                          md:grid-cols-4
                        "
                      >
                        <AnimatePresence>
                          {photos.map((photo) => (
                            <motion.div
                              key={photo.id}
                              initial={{
                                opacity: 0,
                                scale: 0.92,
                              }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                              }}
                              exit={{
                                opacity: 0,
                                scale: 0.9,
                              }}
                              transition={{
                                duration: 0.3,
                              }}
                              className="
                                group
                                relative
                                aspect-square
                                overflow-hidden
                                bg-[#D8C0C5]
                              "
                            >
                              <WeddingImg
                                src={photo.url}
                                alt="Selected memory"
                                className="
                                  h-full
                                  w-full
                                  object-cover
                                  transition-transform
                                  duration-700
                                  group-hover:scale-[1.04]
                                "
                              />

                              <div
                                className="
                                  pointer-events-none
                                  absolute
                                  inset-0
                                  bg-gradient-to-t
                                  from-[#691638]/20
                                  via-transparent
                                  to-transparent
                                "
                              />

                              <button
                                type="button"
                                onClick={() => removePhoto(photo.id)}
                                aria-label="Remove photo"
                                className="
                                  absolute
                                  right-2
                                  top-2
                                  flex
                                  h-7
                                  w-7
                                  items-center
                                  justify-center
                                  border
                                  border-white/40
                                  bg-[#F8EBE6]/85
                                  text-[#691638]
                                  backdrop-blur-sm
                                  transition-colors
                                  hover:bg-white
                                "
                              >
                                <X size={12} strokeWidth={1.5} />
                              </button>
                            </motion.div>
                          ))}

                          {/* Add photo tile */}

                          <button
                            type="button"
                            onClick={() => cameraInputRef.current?.click()}
                            className="
                              flex
                              aspect-square
                              flex-col
                              items-center
                              justify-center
                              border
                              border-dashed
                              border-[#691638]/20
                              bg-[#F8EBE6]/40
                              text-[#691638]/60
                              transition-all
                              hover:border-[#C890A7]/60
                              hover:bg-[#F8EBE6]/80
                              hover:text-[#691638]
                            "
                          >
                            <Camera size={20} strokeWidth={1.2} />

                            <span
                              className="
                                mt-3
                                text-[7px]
                                uppercase
                                tracking-[0.16em]
                              "
                            >
                              Add photo
                            </span>
                          </button>
                        </AnimatePresence>
                      </div>

                      {/* Selected status */}

                      <div
                        className="
                          mt-6
                          flex
                          items-center
                          gap-2
                          border-t
                          border-[#691638]/10
                          pt-5
                        "
                      >
                        <Check
                          size={13}
                          strokeWidth={1.5}
                          className="text-[#691638]"
                        />

                        <span
                          className="
                            text-[8px]
                            uppercase
                            tracking-[0.15em]
                            text-[#691638]/50
                          "
                        >
                          Photos selected on this device
                        </span>
                      </div>

                      {/* Upload */}

                      <div className="mt-6 border-t border-[#691638]/10 pt-5">
                        <button
                          type="button"
                          onClick={uploadPhotos}
                          disabled={isUploading || photos.length === 0}
                          className="
                            inline-flex
                            items-center
                            gap-3
                            border
                            border-[#691638]
                            bg-[#691638]
                            px-6
                            py-3.5
                            text-[8px]
                            uppercase
                            tracking-[0.22em]
                            text-[#F8EBE6]
                            shadow-[0_8px_20px_rgba(105,22,56,0.10)]
                            transition-all
                            duration-300
                            hover:bg-[#7B244A]
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                          "
                        >
                          {isUploading
                            ? "Uploading memories..."
                            : "Submit photos"}
                          {!isUploading && (
                            <ArrowUpRight size={12} strokeWidth={1.3} />
                          )}
                        </button>

                        {uploadComplete && (
                          <div className="mt-4 flex items-center gap-2 text-[8px] uppercase tracking-[0.15em] text-[#691638]/55">
                            <Check
                              size={13}
                              strokeWidth={1.5}
                              className="text-[#691638]"
                            />
                            <span>Your memories have been shared.</span>
                          </div>
                        )}

                        {uploadError && (
                          <p className="mt-4 max-w-xl text-[9px] leading-5 text-[#691638]/60">
                            {uploadError}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hidden camera input */}

              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={addPhotos}
              />

              {/* =================================================
                  BOTTOM ORNAMENT
              ================================================= */}

              <div className="mt-10 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-[#691638]/10" />

                <span
                  className="
                    h-1.5
                    w-1.5
                    rotate-45
                    border
                    border-[#C890A7]/50
                    bg-[#F8EBE6]
                  "
                />

                <span className="h-px w-8 bg-[#691638]/10" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          POPUPS
      ========================================================= */}

      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              bg-[#691638]/20
              p-4
              sm:p-8
            "
            onClick={() => setPopup(null)}
          >
            {/* ===================================================
                INVITATION POPUP
            =================================================== */}

            {popup === "invitation" && (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.94,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.96,
                  y: 10,
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  relative
                  max-h-[92vh]
                  max-w-[680px]
                  overflow-hidden
                  border
                  border-[#691638]/10
                  bg-[#F8EBE6]
                  p-2
                  shadow-[0_30px_100px_rgba(105,22,56,0.20)]
                "
                onClick={(event) => event.stopPropagation()}
              >
                {/* Inner frame */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-3
                    z-10
                    border
                    border-[#691638]/10
                  "
                />

                {/* Close */}

                <button
                  type="button"
                  aria-label="Close invitation"
                  onClick={() => setPopup(null)}
                  className="
                    absolute
                    right-4
                    top-4
                    z-20
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    border
                    border-[#691638]/10
                    bg-[#F8EBE6]/90
                    text-[#691638]/65
                    transition-all
                    duration-300
                    hover:bg-white
                    hover:text-[#691638]
                  "
                >
                  <X size={15} strokeWidth={1.3} />
                </button>

                {/* Invitation image */}

                <div className="max-h-[90vh] overflow-auto">
                  <WeddingImg
                    src="/images/invitation.webp"
                    alt="Wedding invitation"
                    className="
                      mx-auto
                      h-auto
                      max-h-[88vh]
                      w-auto
                      max-w-full
                      object-contain
                    "
                  />
                </div>
              </motion.div>
            )}

            {/* ===================================================
                GREETING POPUP
            =================================================== */}

            {popup === "greeting" && (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.94,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.96,
                  y: 10,
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  relative
                  w-full
                  max-w-[510px]
                  overflow-hidden
                  border
                  border-[#691638]/10
                  bg-[#F3E7E3]
                  px-6
                  py-8
                  shadow-[0_30px_90px_rgba(105,22,56,0.16)]
                  sm:px-9
                  sm:py-10
                "
                onClick={(event) => event.stopPropagation()}
              >
                {/* Ambient blush */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-20
                    h-56
                    w-56
                    rounded-full
                    bg-[#C890A7]/[0.12]
                    blur-[80px]
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    -bottom-20
                    -left-20
                    h-56
                    w-56
                    rounded-full
                    bg-[#D9AFC0]/[0.10]
                    blur-[80px]
                  "
                />

                {/* Inner frame */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-3
                    border
                    border-[#691638]/[0.07]
                    sm:inset-4
                  "
                />

                {/* Close */}

                <button
                  type="button"
                  aria-label="Close greetings"
                  onClick={() => setPopup(null)}
                  className="
                    absolute
                    right-4
                    top-4
                    z-20
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    border
                    border-[#691638]/10
                    bg-[#F8EBE6]/70
                    text-[#691638]/50
                    transition-colors
                    hover:bg-[#F8EBE6]
                    hover:text-[#691638]
                  "
                >
                  <X size={14} strokeWidth={1.3} />
                </button>

                <div className="relative z-10">
                  {/* Heading */}

                  <div className="text-center">
                    <div
                      className="
                        mx-auto
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        border
                        border-[#C890A7]/30
                        bg-[#F8EBE6]
                      "
                    >
                      <Heart
                        size={17}
                        strokeWidth={1.15}
                        className="text-[#C890A7]"
                      />
                    </div>

                    <p
                      className="
                        mt-4
                        text-[8px]
                        uppercase
                        tracking-[0.28em]
                        text-[#691638]/45
                      "
                    >
                      A little note
                    </p>

                    <h3
                      className="
                        mt-2
                        font-display
                        text-3xl
                        tracking-[-0.03em]
                        text-[#691638]
                        sm:text-4xl
                      "
                    >
                      Send us your wishes.
                    </h3>

                    <p
                      className="
                        mx-auto
                        mt-3
                        max-w-sm
                        text-xs
                        leading-6
                        text-[#691638]/50
                      "
                    >
                      Leave us a few words to carry with us into this beautiful
                      new chapter.
                    </p>
                  </div>

                  {/* Form */}

                  <form onSubmit={handleGreetingSubmit} className="mt-8">
                    {/* Name */}

                    <div>
                      <label
                        htmlFor="wish-name"
                        className="
                          block
                          text-[8px]
                          uppercase
                          tracking-[0.2em]
                          text-[#691638]/50
                        "
                      >
                        Your name
                      </label>

                      <input
                        id="wish-name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                        disabled={isSendingWish}
                        type="text"
                        placeholder="Enter your name"
                        className="
                          mt-2
                          w-full
                          border-b
                          border-[#691638]/15
                          bg-transparent
                          px-0
                          py-3
                          text-sm
                          text-[#691638]
                          outline-none
                          placeholder:text-[#691638]/25
                          focus:border-[#C890A7]
                        "
                      />
                    </div>

                    {/* Message */}

                    <div className="mt-6">
                      <label
                        htmlFor="wish-message"
                        className="
                          block
                          text-[8px]
                          uppercase
                          tracking-[0.2em]
                          text-[#691638]/50
                        "
                      >
                        Your message
                      </label>

                      <textarea
                        id="wish-message"
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        required
                        disabled={isSendingWish}
                        rows={4}
                        placeholder="Write something lovely..."
                        className="
                          mt-2
                          w-full
                          resize-none
                          border-b
                          border-[#691638]/15
                          bg-transparent
                          px-0
                          py-3
                          text-sm
                          leading-6
                          text-[#691638]
                          outline-none
                          placeholder:text-[#691638]/25
                          focus:border-[#C890A7]
                        "
                      />
                    </div>

                    {/* Submit */}

                    {wishError && (
                      <div
                        role="alert"
                        className="
                          mt-5
                          border
                          border-[#691638]/10
                          bg-[#E8D6D8]/45
                          px-4
                          py-3
                          text-[9px]
                          leading-5
                          text-[#691638]/70
                        "
                      >
                        {wishError}
                      </div>
                    )}

                    {wishSent && (
                      <div
                        role="status"
                        className="
                          mt-5
                          flex
                          items-center
                          gap-2
                          border
                          border-[#691638]/10
                          bg-[#F8EBE6]/70
                          px-4
                          py-3
                          text-[9px]
                          leading-5
                          text-[#691638]/70
                        "
                      >
                        <Check size={13} strokeWidth={1.5} />
                        Your wishes have been sent. Thank you.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSendingWish}
                      className="
                        group
                        mt-7
                        inline-flex
                        items-center
                        gap-3
                        border
                        border-[#691638]/15
                        bg-[#691638]
                        px-5
                        py-3
                        text-[8px]
                        uppercase
                        tracking-[0.22em]
                        text-[#F8EBE6]
                        shadow-[0_8px_20px_rgba(105,22,56,0.10)]
                        transition-all
                        duration-300
                        hover:bg-[#7B244A]
                      "
                    >
                      {isSendingWish ? "Sending..." : "Send wishes"}
                      {!isSendingWish && (
                        <ArrowUpRight
                          size={12}
                          strokeWidth={1.3}
                          className="
                          transition-transform
                          duration-300
                          group-hover:-translate-y-0.5
                          group-hover:translate-x-0.5
                        "
                        />
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* =============================================================
   ACTION ITEM
============================================================= */

function ActionItem({
  label,
  icon,
  onClick,
  delay,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  delay: number;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{
        opacity: 0,
        y: 15,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.5,
      }}
      transition={{
        delay,
        duration: 0.6,
      }}
      whileHover={{
        y: -4,
      }}
      whileTap={{
        scale: 0.97,
      }}
      className="
        group
        flex
        min-w-[76px]
        flex-col
        items-center
        gap-4
        outline-none
        sm:min-w-[88px]
      "
    >
      {/* Icon */}

      <span
        className="
          relative
          flex
          h-[72px]
          w-[72px]
          items-center
          justify-center
          border
          border-[#691638]/12
          bg-[#F3E7E3]
          text-[#691638]
          shadow-[0_10px_30px_rgba(105,22,56,0.045)]
          transition-all
          duration-500
          group-hover:border-[#C890A7]/50
          group-hover:bg-[#F1DFDF]
          group-hover:shadow-[0_14px_35px_rgba(105,22,56,0.08)]
          sm:h-[84px]
          sm:w-[84px]
        "
      >
        {/* Inner diamond */}

        <span
          className="
            pointer-events-none
            absolute
            inset-2
            rotate-45
            border
            border-[#C890A7]/20
            transition-transform
            duration-700
            group-hover:rotate-[135deg]
          "
        />

        {/* Icon */}

        <span
          className="
            relative
            z-10
            transition-transform
            duration-500
            group-hover:scale-110
          "
        >
          {icon}
        </span>
      </span>

      {/* Label */}

      <span
        className="
          flex
          items-center
          gap-1.5
          whitespace-nowrap
          text-[7px]
          uppercase
          tracking-[0.17em]
          text-[#691638]/50
          transition-colors
          duration-300
          group-hover:text-[#691638]
          sm:text-[8px]
          sm:tracking-[0.2em]
        "
      >
        {label}

        <ArrowUpRight
          size={10}
          strokeWidth={1.3}
          className="
            transition-transform
            duration-300
            group-hover:-translate-y-0.5
            group-hover:translate-x-0.5
          "
        />
      </span>
    </motion.button>
  );
}
