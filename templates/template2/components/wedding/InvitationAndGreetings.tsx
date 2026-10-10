"use client";

import { WeddingImg } from "@/components/wedding-media";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Heart, Mail, X } from "lucide-react";

type PopupType = "invitation" | "greeting" | null;

export default function InvitationAndGreetings() {
  const [popup, setPopup] = useState<PopupType>(null);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleGreetingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) return;

    // Connect this to Supabase later.
    console.log({
      name,
      message,
    });

    setName("");
    setMessage("");
    setPopup(null);
  };

  return (
    <>
      {/* =========================================================
          INVITATION + GREETINGS
      ========================================================= */}

      <section
        id="invitation"
        className="
          relative
          overflow-hidden
          bg-[#f8ebe6]
          py-16
          sm:py-20
          md:py-24
        "
      >
        {/* Background atmosphere */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-[360px]
              w-[360px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-[#C890A7]/[0.08]
              blur-[120px]
            "
          />

          <div
            className="
              absolute
              -left-32
              top-[20%]
              h-[260px]
              w-[260px]
              rounded-full
              bg-[#D9AFC0]/[0.08]
              blur-[100px]
            "
          />

          <div
            className="
              absolute
              -right-32
              bottom-[10%]
              h-[300px]
              w-[300px]
              rounded-full
              bg-[#C890A7]/[0.06]
              blur-[110px]
            "
          />

          {/* Fine grain */}
          <div
            className="
              absolute
              inset-0
              opacity-[0.025]
              [background-image:radial-gradient(
                rgba(105,22,56,0.8)_0.5px,
                transparent_0.5px
              )]
              [background-size:5px_5px]
            "
          />
        </div>

        <div className="container-wedding relative z-10">
          {/* Small intro */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <p
              className="
                text-[8px]
                uppercase
                tracking-[0.3em]
                text-[#691638]/45
              "
            >
              Before you go
            </p>

            <p
              className="
                mt-3
                font-display
                text-2xl
                tracking-[-0.025em]
                text-[#691638]
                sm:text-3xl
              "
            >
              A little something for you.
            </p>
          </motion.div>

          {/* =====================================================
              INTERACTIVE ORNAMENT
          ===================================================== */}

          <div
            className="
              mx-auto
              mt-10
              flex
              max-w-xl
              items-center
              justify-center
              gap-5
              sm:mt-12
              sm:gap-8
            "
          >
            {/* Invitation */}
            <InteractiveItem
              label="The invitation"
              icon={
                <div className="relative">
                  <Mail size={24} strokeWidth={1.15} />

                  <span
                    className="
                      absolute
                      -right-1
                      -top-1
                      h-2
                      w-2
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
                hidden
                h-16
                w-px
                bg-[#691638]/10
                sm:block
              "
            />

            <div
              className="
                flex
                h-2
                w-2
                rotate-45
                border
                border-[#C890A7]/50
                bg-[#f8ebe6]
                sm:hidden
              "
            />

            {/* Greeting */}
            <InteractiveItem
              label="Send a wish"
              icon={
                <div className="relative">
                  <Heart size={24} strokeWidth={1.15} />

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
              onClick={() => setPopup("greeting")}
              delay={0.1}
            />
          </div>

          {/* Bottom ornament */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-[#691638]/10 sm:w-20" />

            <span
              className="
                h-1.5
                w-1.5
                rotate-45
                bg-[#C890A7]/55
              "
            />

            <span className="h-px w-12 bg-[#691638]/10 sm:w-20" />
          </div>
        </div>
      </section>

      {/* =========================================================
          POPUPS
      ========================================================= */}

      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              bg-[#2d1622]/80
              p-4
              backdrop-blur-md
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
                  border-white/15
                  bg-[#f8ebe6]
                  p-2
                  shadow-[0_30px_100px_rgba(0,0,0,0.35)]
                "
                onClick={(e) => e.stopPropagation()}
              >
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
                    border-white/30
                    bg-[#691638]/80
                    text-white
                    backdrop-blur-md
                    transition-colors
                    duration-300
                    hover:bg-[#691638]
                  "
                >
                  <X size={15} strokeWidth={1.3} />
                </button>

                {/* Invitation */}
                <div className="max-h-[90vh] overflow-auto">
                  <WeddingImg
                    src="/images/invitation.jpg"
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
                  max-w-[520px]
                  overflow-hidden
                  border
                  border-[#691638]/10
                  bg-[#691638]
                  px-6
                  py-8
                  shadow-[0_30px_100px_rgba(0,0,0,0.35)]
                  sm:px-9
                  sm:py-10
                "
                onClick={(e) => e.stopPropagation()}
              >
                {/* Ambient light */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-24
                    -top-24
                    h-64
                    w-64
                    rounded-full
                    bg-[#C890A7]/20
                    blur-[90px]
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    -bottom-24
                    -left-24
                    h-64
                    w-64
                    rounded-full
                    bg-[#D9AFC0]/10
                    blur-[90px]
                  "
                />

                {/* Inner border */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-3
                    border
                    border-white/[0.09]
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
                    border-white/10
                    text-white/60
                    transition-colors
                    hover:text-white
                  "
                >
                  <X size={14} strokeWidth={1.3} />
                </button>

                <div className="relative z-10">
                  <div className="text-center">
                    <Heart
                      size={20}
                      strokeWidth={1.15}
                      className="
                        mx-auto
                        text-[#C890A7]
                      "
                    />

                    <p
                      className="
                        mt-4
                        text-[8px]
                        uppercase
                        tracking-[0.28em]
                        text-white/40
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
                        text-[#FFF8F5]
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
                        text-white/50
                      "
                    >
                      Leave us a few words to remember this beautiful chapter
                      by.
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
                          text-white/40
                        "
                      >
                        Your name
                      </label>

                      <input
                        id="wish-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        type="text"
                        placeholder="Enter your name"
                        className="
                          mt-2
                          w-full
                          border-b
                          border-white/15
                          bg-transparent
                          px-0
                          py-3
                          text-sm
                          text-white
                          outline-none
                          placeholder:text-white/20
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
                          text-white/40
                        "
                      >
                        Your message
                      </label>

                      <textarea
                        id="wish-message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={4}
                        placeholder="Write something lovely..."
                        className="
                          mt-2
                          w-full
                          resize-none
                          border-b
                          border-white/15
                          bg-transparent
                          px-0
                          py-3
                          text-sm
                          leading-6
                          text-white
                          outline-none
                          placeholder:text-white/20
                          focus:border-[#C890A7]
                        "
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="
                        group
                        mt-7
                        inline-flex
                        items-center
                        gap-3
                        border
                        border-[#C890A7]/50
                        bg-[#C890A7]
                        px-5
                        py-3
                        text-[8px]
                        uppercase
                        tracking-[0.22em]
                        text-white
                        transition-all
                        duration-300
                        hover:bg-[#B9829A]
                      "
                    >
                      Send wishes
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
   INTERACTIVE ITEM
============================================================= */

function InteractiveItem({
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
        flex-col
        items-center
        gap-4
        outline-none
      "
    >
      {/* Icon */}
      <span
        className="
          relative
          flex
          h-[76px]
          w-[76px]
          items-center
          justify-center
          border
          border-[#691638]/15
          bg-[#F3E7E3]
          text-[#691638]
          shadow-[0_10px_30px_rgba(105,22,56,0.05)]
          transition-all
          duration-500
          group-hover:border-[#C890A7]/50
          group-hover:bg-[#F1DFDF]
          group-hover:shadow-[0_14px_35px_rgba(105,22,56,0.09)]
          sm:h-[88px]
          sm:w-[88px]
        "
      >
        {/* outer diamond */}
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
          gap-2
          text-[8px]
          uppercase
          tracking-[0.22em]
          text-[#691638]/55
          transition-colors
          duration-300
          group-hover:text-[#691638]
        "
      >
        {label}

        <ArrowUpRight
          size={11}
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
