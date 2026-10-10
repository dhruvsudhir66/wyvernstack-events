"use client";

import { WeddingImage as Image } from "@/components/wedding-media";
import { useEffect, useState } from "react";
import { useTemplate3 } from "@/templates/template3/context";
import { createPortal } from "react-dom";

type InvitationModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function InvitationModal({
  open,
  onClose,
}: InvitationModalProps) {
  const wedding = useTemplate3();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const modal = (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-[#30352B]/70
        p-4
        backdrop-blur-[6px]
        sm:p-6
      "
      role="dialog"
      aria-modal="true"
      aria-label="Wedding invitation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      {/* =====================================================
          CLOSE BUTTON
      ===================================================== */}

      <button
        type="button"
        onClick={onClose}
        aria-label="Close invitation"
        className="
          absolute
          right-4
          top-4
          z-[10010]
          flex
          h-9
          w-9
          items-center
          justify-center
          border
          border-[#F8F4EA]/25
          bg-[#30352B]/35
          text-[#F8F4EA]
          backdrop-blur-sm
          transition-all
          duration-200
          hover:bg-[#30352B]/55
          active:scale-95
          sm:right-6
          sm:top-6
        "
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M6 6L18 18" />
          <path d="M18 6L6 18" />
        </svg>
      </button>

      {/* =====================================================
          INVITATION IMAGE
      ===================================================== */}

      <div
        className="
          relative
          max-h-[92vh]
          max-w-[92vw]
          animate-[invitation-in_400ms_cubic-bezier(0.22,1,0.36,1)]
        "
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
      >
        <Image
          src={wedding.assets.invitationCard}
          alt={wedding.invitationAlt}
          width={1200}
          height={1800}
          priority
          className="
            block
            max-h-[92vh]
            w-auto
            max-w-[92vw]
            object-contain
            shadow-[0_25px_80px_rgba(20,24,20,0.35)]
          "
        />
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
