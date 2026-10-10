"use client";

import { useTemplate2 } from "@/templates/template2/context";

export default function Footer() {
  const wedding = useTemplate2();
  return (
    <footer className="relative overflow-hidden bg-[#F7F3ED] px-5 py-10 text-[#691638] sm:py-16">
      {/* Subtle atmosphere */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[300px]
          w-[300px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#F8EBE6]/20
          blur-[100px]
        "
      />

      <div className="container-wedding relative z-10">
        {/* Main */}
        <div className="flex flex-col items-center text-center">
          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.32em]
              text-[#691638]
            "
          >
            Until forever
          </p>

          <h2
            className="
              font-500
              mt-4
              text-xl
              leading-[0.9]
              tracking-[-0.055em]
              text-[#691638]
            "
          >
            {wedding.couple.bride}
            <span className="serif-italic font-light text-[#8F596C]">
              {" "}
              & &nbsp;
            </span>
            {wedding.couple.groom}
          </h2>

          <p
            className="
              mt-6
              text-[10px]
              leading-6
              text-[#691638]/55
              sm:text-[11px]
            "
          >
            {wedding.event.weekdayDate}
            <br />
          </p>
        </div>

        {/* Bottom */}
        <div
          className="
            mt-4
            flex
            flex-col
            items-center
            gap-3
            border-t
            border-[#691638]/15
            pt-5
            text-center
            sm:mt-14
            sm:flex-row
            sm:justify-between
          "
        >
          <div
            className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-3
              gap-y-1
            "
          >
            <a
              href={wedding.footer.creditUrl}
              target="_blank"
              rel="noreferrer"
              className="
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-[#691638]/65
                transition-colors
                duration-300
                hover:text-[#691638]
              "
            >
              {wedding.footer.creditLabel}
            </a>

            <span
              className="hidden h-2 w-px bg-[#691638]/15 sm:inline"
              aria-hidden="true"
            />

            <a
              href="https://instagram.com/wyvernstack"
              target="_blank"
              rel="noreferrer"
              aria-label="Wyvernstack on Instagram"
              className="
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-[#691638]/65
                transition-colors
                duration-300
                hover:text-[#691638]
              "
            >
              @wyvernstack
            </a>
          </div>

          <p
            className="
              text-[8px]
              uppercase
              tracking-[0.18em]
              text-[#691638]/40
            "
          >
            {wedding.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
