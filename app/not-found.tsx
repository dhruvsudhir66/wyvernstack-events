
import Image from "next/image";
import Link from "next/link";

import { withBasePath } from "@/lib/base-path";

const RED = "#9B1528";
const INK = "#292522";
const MUTED = "#716B66";
const PAPER = "#F4F2ED";

export default function NotFound() {
  return (
    <main
      className="relative flex min-h-screen flex-col overflow-hidden"
      style={{ backgroundColor: PAPER, color: INK }}
    >
      {/* Header */}
      <header className="border-b border-[#292522]/10">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <Link
            href={withBasePath("/")}
            aria-label="Wyvernstack home"
            className="inline-flex items-center"
          >
            <Image
              src={withBasePath("/events/images/logo.png")}
              alt="Wyvernstack"
              width={240}
              height={80}
              priority
              className="h-auto w-36 object-contain sm:w-40"
            />
          </Link>

          <span className="text-[9px] uppercase tracking-[0.16em] text-[#716B66]">
            Digital invitations
          </span>
        </div>
      </header>

      {/* Not found content */}
      <section className="relative flex flex-1 items-center justify-center px-5 py-16 sm:px-8 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#9B1528]/[0.06] sm:h-[480px] sm:w-[480px]"
        />

        <div className="relative mx-auto w-full max-w-xl text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9B1528]">
            Wyvernstack · Events
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[#9B1528]/40" />
            <span className="font-serif text-sm italic text-[#9B1528]">
              A little detour
            </span>
            <span className="h-px w-10 bg-[#9B1528]/40" />
          </div>

          <h1 className="mt-5 font-serif text-[clamp(6rem,20vw,10rem)] leading-[0.85] tracking-[-0.08em] text-[#9B1528]">
            404
          </h1>

          <h2 className="mt-7 text-2xl font-medium tracking-[-0.04em] sm:text-3xl">
            This invitation is missing.
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#716B66]">
            It looks like this link doesn't lead to an invitation. It may be
            incorrect, or the page may no longer be available.
          </p>

          <p className="mt-10 text-[9px] uppercase tracking-[0.16em] text-[#817A75]">
            Every moment has a story.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#292522]/10 px-5 py-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-[10px] sm:flex-row sm:items-center sm:justify-between">
          <span className="font-medium tracking-[0.16em]">
            WYVERNSTACK
          </span>

          <span className="text-[#716B66]">
            Digital invitations for moments that matter.
          </span>

          <Link
            href={withBasePath("/events/")}
            className="self-start text-[#9B1528] transition-colors hover:text-[#7F1021] sm:self-auto"
          >
            Discover more ↗
          </Link>
        </div>
      </footer>
    </main>
  );
}
