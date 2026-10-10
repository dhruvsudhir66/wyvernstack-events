"use client";

import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTemplate3 } from "@/templates/template3/context";

type RSVPModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function RSVPModal({ open, onClose }: RSVPModalProps) {
  const googleScriptUrl = useTemplate3().integrations.rsvpUrl;
  const [mounted, setMounted] = useState(false);

  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"yes" | "no" | "">("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const [errorMessage, setErrorMessage] = useState("");

  /* =========================================================
     MOUNT
  ========================================================= */

  useEffect(() => {
    setMounted(true);
  }, []);

  /* =========================================================
     BODY SCROLL LOCK
  ========================================================= */

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;

      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!mounted || !open) {
    return null;
  }

  /* =========================================================
     RESET
  ========================================================= */

  const resetForm = () => {
    setName("");
    setAttending("");
    setMessage("");
    setStatus("idle");
    setErrorMessage("");
  };

  const closeModal = () => {
    if (status === "submitting") return;

    resetForm();
    onClose();
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      setStatus("error");
      return;
    }

    if (!attending) {
      setErrorMessage("Please let us know if you will attend.");
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const formData = new URLSearchParams();

      formData.append("name", name.trim());

      formData.append("attending", attending === "yes" ? "Yes" : "No");

      formData.append("message", message.trim());

      formData.append("submittedAt", new Date().toISOString());

      await fetch(googleScriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: formData.toString(),
      });

      setStatus("success");
    } catch (error) {
      console.error("RSVP submission failed:", error);

      setErrorMessage("Something went wrong. Please try again.");

      setStatus("error");
    }
  };

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
        bg-[#30352B]/55
        p-4
        backdrop-blur-[5px]
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="rsvp-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closeModal();
        }
      }}
    >
      {/* ===================================================
          RSVP CARD
      =================================================== */}

      <div
        className="
          relative
          w-full
          max-w-[380px]
          overflow-hidden
          bg-[#F8F4EA]
          text-[#30352B]
          shadow-[0_20px_60px_rgba(20,24,20,0.25)]
        "
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
      >
        {/* Top accent */}

        <div
          className="
            absolute
            left-0
            right-0
            top-0
            h-[2px]
            bg-[#A87E8E]
          "
        />

        {/* =================================================
            CLOSE
        ================================================= */}

        <button
          type="button"
          onClick={closeModal}
          disabled={status === "submitting"}
          aria-label="Close RSVP"
          className="
            absolute
            right-3
            top-3
            z-10
            flex
            h-7
            w-7
            items-center
            justify-center
            text-[#59674D]/70
            transition-opacity
            hover:opacity-50
          "
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            className="h-3.5 w-3.5"
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
            <span className="font-mono text-[6px] tracking-[0.2em] text-[#A87E8E]">
              RSVP
            </span>

            <span className="h-px w-4 bg-[#A87E8E]/40" />
          </div>

          <h2
            id="rsvp-title"
            className="
              mt-2.5
              font-display
              text-[1.85rem]
              font-medium
              leading-[0.9]
              tracking-[-0.03em]
            "
          >
            Will you join us?
          </h2>

          <p
            className="
              mt-1.5
              max-w-[280px]
              font-display
              text-[12px]
              leading-[1.45]
              text-[#59674D]/70
            "
          >
            We would love to celebrate with you.
          </p>
        </div>

        {/* =================================================
            SUCCESS
        ================================================= */}

        {status === "success" ? (
          <div
            className="
              px-5
              py-9
              text-center
            "
          >
            <div
              className="
                mx-auto
                flex
                h-10
                w-10
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
                className="h-4 w-4"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>
            </div>

            <h3
              className="
                mt-4
                font-display
                text-[1.8rem]
                leading-none
              "
            >
              Thank you.
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
              Your RSVP has been received.
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
          /* =================================================
             FORM
          ================================================= */

          <form
            onSubmit={handleSubmit}
            className="
              space-y-4
              px-5
              py-5
            "
          >
            {/* NAME */}

            <div>
              <label
                htmlFor="rsvp-name"
                className="
                  font-sans
                  text-[6px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#59674D]
                "
              >
                Your name
              </label>

              <input
                id="rsvp-name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your name"
                className="
                  mt-1.5
                  w-full
                  border-b
                  border-[#59674D]/20
                  bg-transparent
                  px-0
                  py-2
                  font-display
                  text-[15px]
                  outline-none
                  placeholder:text-[#59674D]/30
                  focus:border-[#59674D]/60
                "
              />
            </div>

            {/* ATTENDANCE */}

            {/* ATTENDANCE */}

            <div>
              <p
                className="
                font-sans
                text-[6px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#59674D]
              "
              >
                Will you attend?
              </p>

              <div className="mt-2 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setAttending("yes");
                    setStatus("idle");
                    setErrorMessage("");
                  }}
                  className={[
                    "min-w-[108px] border px-3.5 py-2 font-sans text-[6px] font-semibold uppercase tracking-[0.13em] transition-all duration-200",
                    attending === "yes"
                      ? "border-[#59674D] bg-[#59674D] text-[#F8F4EA]"
                      : "border-[#59674D]/25 bg-transparent text-[#59674D] hover:border-[#59674D]/50",
                  ].join(" ")}
                >
                  Joyfully, yes
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAttending("no");
                    setStatus("idle");
                    setErrorMessage("");
                  }}
                  className={[
                    "min-w-[108px] border px-3.5 py-2 font-sans text-[6px] font-semibold uppercase tracking-[0.13em] transition-all duration-200",
                    attending === "no"
                      ? "border-[#A87E8E] bg-[#A87E8E] text-[#F8F4EA]"
                      : "border-[#59674D]/25 bg-transparent text-[#59674D] hover:border-[#A87E8E]/50",
                  ].join(" ")}
                >
                  Regretfully, no
                </button>
              </div>
            </div>

            {/* MESSAGE */}

            <div>
              <label
                htmlFor="rsvp-message"
                className="
                  font-sans
                  text-[6px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#59674D]
                "
              >
                Message
              </label>

              <textarea
                id="rsvp-message"
                rows={3}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Leave a little message..."
                className="
                  mt-1.5
                  w-full
                  resize-none
                  border
                  border-[#59674D]/18
                  bg-transparent
                  p-2.5
                  font-display
                  text-[14px]
                  leading-[1.4]
                  outline-none
                  placeholder:text-[#59674D]/30
                  focus:border-[#59674D]/45
                "
              />
            </div>

            {/* ERROR */}

            {status === "error" && (
              <p
                className="
                  font-sans
                  text-[7px]
                  leading-[1.4]
                  text-[#A87E8E]
                "
              >
                {errorMessage}
              </p>
            )}

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={status === "submitting" || !attending}
              className="
                w-full
                bg-[#30352B]
                px-4
                py-3
                font-sans
                text-[6px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-[#F8F4EA]
                transition-all
                duration-200
                hover:bg-[#59674D]
                disabled:cursor-not-allowed
                disabled:opacity-35
              "
            >
              {status === "submitting" ? "Sending..." : "Send RSVP"}
            </button>

            <p
              className="
                text-center
                font-sans
                text-[5.5px]
                uppercase
                tracking-[0.14em]
                text-[#59674D]/40
              "
            >
              Thank you for letting us know
            </p>
          </form>
        )}
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
