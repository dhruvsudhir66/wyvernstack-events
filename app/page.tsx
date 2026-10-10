import type { Metadata } from "next";
import Link from "next/link";
import { listWeddings } from "@/core/registry";
import { withBasePath } from "@/lib/base-path";
import { getSiteOrigin } from "@/lib/site-url";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteOrigin()),
  title: "Wedding invitations | Wyvernstack",
  description: "Digital wedding invitations crafted by Wyvernstack.",
  openGraph: {
    type: "website",
    url: `${getSiteOrigin()}${withBasePath("/")}`,
    siteName: "Wyvernstack",
    title: "Wedding invitations | Wyvernstack",
    description: "Digital wedding invitations crafted by Wyvernstack.",
  },
};


export default function EventsIndexPage() {
  const weddings = listWeddings();

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F5EF] text-[#292D29]">
      {/* Header */}
      <header className="border-b border-[#292D29]/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            href="/"
            className="text-xs font-semibold tracking-[0.16em] uppercase"
          >
            Wyvernstack
          </Link>

          <span className="text-[10px] tracking-[0.16em] uppercase text-[#716F65]">
            Wedding Collection
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative border-b border-[#292D29]/10 px-5 py-12 sm:px-8 sm:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full border border-[#718064]/15 sm:h-64 sm:w-64"
        />

        <div className="relative mx-auto max-w-6xl">
          <p className="mb-5 flex items-center gap-2.5 text-[9px] font-medium tracking-[0.22em] uppercase text-[#718064] sm:text-[10px]">
            <span className="h-px w-6 bg-[#718064]" />
            A collection by Wyvernstack
          </p>

          <div className="grid gap-7 sm:grid-cols-[1fr_180px] sm:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-medium leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Every love story
                <br />
                <span className="font-serif italic text-[#718064]">
                  starts somewhere.
                </span>
              </h1>

              <p className="mt-5 max-w-md text-xs leading-6 text-[#716F65] sm:text-sm">
                Thoughtfully designed digital wedding invitations,
                created to celebrate your story and bring your
                favourite people together.
              </p>
            </div>

            <div className="flex items-center gap-4 border-t border-[#718064]/30 pt-4 sm:block sm:border-l sm:border-t-0 sm:pb-1 sm:pl-4 sm:pt-0">
              <p className="font-serif text-3xl tracking-tight">
                {String(weddings.length).padStart(2, "0")}
              </p>
              <div>
                <p className="text-[9px] tracking-[0.16em] uppercase text-[#716F65]">
                  Designs in collection
                </p>
                <p className="mt-1 text-[11px] leading-5 text-[#716F65]">
                  Made for different celebrations and traditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collection */}
      <section className="px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-end justify-between border-b border-[#292D29]/15 pb-3">
            <div>
              <p className="text-[9px] tracking-[0.2em] uppercase text-[#718064]">
                The collection
              </p>
              <h2 className="mt-1.5 font-serif text-xl sm:text-2xl">
                Explore the invitations
              </h2>
            </div>

            <span className="pb-0.5 text-[11px] text-[#716F65]">
              {weddings.length} {weddings.length === 1 ? "design" : "designs"}
            </span>
          </div>

          {weddings.length === 0 ? (
            <div className="border border-dashed border-[#292D29]/20 px-5 py-12 text-center">
              <p className="font-serif text-xl sm:text-2xl">
                A new story begins here.
              </p>
              <p className="mt-2 text-xs leading-6 text-[#716F65]">
                Published wedding invitations will appear in this collection.
              </p>
            </div>
          ) : (
            <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {weddings.map((wedding, index) => {
                const firstName =
                  wedding.template === "template3"
                    ? wedding.couple.firstName
                    : wedding.couple.bride;

                const secondName =
                  wedding.template === "template3"
                    ? wedding.couple.secondName
                    : wedding.couple.groom;

                return (
                  <article key={wedding.slug} className="group min-w-0">
                    <Link
                      href={`/${wedding.slug}/`}
                      aria-label={`Preview ${firstName} and ${secondName}'s wedding invitation`}
                      className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#718064]"
                    >
                      {/* Invitation preview */}
                      <div className="relative aspect-[4/3.7] overflow-hidden border border-[#292D29]/10 bg-[#E9E5DA] transition-colors duration-300 group-hover:border-[#718064]/50">
                        <div className="absolute inset-2.5 border border-[#718064]/25 sm:inset-3" />

                        <div
                          aria-hidden="true"
                          className="absolute -right-10 -top-10 h-36 w-36 rounded-full border border-[#718064]/15"
                        />

                        <div
                          aria-hidden="true"
                          className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full border border-[#718064]/10"
                        />

                        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center transition-transform duration-300 group-hover:scale-[1.015]">
                          <span className="text-[8px] tracking-[0.2em] uppercase text-[#718064] sm:text-[9px]">
                            Wedding invitation
                          </span>

                          <div className="my-4 flex items-center gap-2.5 text-[#718064]/70 sm:my-5">
                            <span className="h-px w-6 bg-current" />
                            <span className="font-serif text-base italic">
                              &amp;
                            </span>
                            <span className="h-px w-6 bg-current" />
                          </div>

                          <p className="max-w-full break-words font-serif text-2xl leading-tight tracking-[-0.03em] sm:text-3xl">
                            {firstName}
                          </p>

                          <p className="my-1 font-serif text-sm italic text-[#718064]">
                            and
                          </p>

                          <p className="max-w-full break-words font-serif text-2xl leading-tight tracking-[-0.03em] sm:text-3xl">
                            {secondName}
                          </p>

                          <span className="mt-5 text-[8px] tracking-[0.15em] uppercase text-[#716F65]">
                            Together with their families
                          </span>
                        </div>

                        <span className="absolute left-4 top-4 font-mono text-[9px] text-[#716F65]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-[#718064]/35 bg-[#F7F5EF]/80 text-sm text-[#718064] transition-colors duration-300 group-hover:bg-[#718064] group-hover:text-white">
                          ↗
                        </span>
                      </div>

                      {/* Details */}
                      <div className="flex items-start justify-between gap-3 pt-3.5">
                        <div className="min-w-0">
                          <h3 className="break-words font-serif text-lg leading-snug sm:text-xl">
                            {firstName} &amp; {secondName}
                          </h3>

                          <p className="mt-1.5 break-all text-[9px] tracking-[0.12em] uppercase text-[#716F65]">
                            {wedding.slug}
                          </p>
                        </div>

                        <span className="shrink-0 pt-1.5 text-[9px] tracking-[0.1em] uppercase text-[#718064]">
                          Preview ↗
                        </span>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#292D29]/10 px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 text-[10px] text-[#716F65] sm:flex-row sm:items-center sm:justify-between">
          <span className="font-medium tracking-[0.14em] uppercase">
            Wyvernstack
          </span>
          <span>Thoughtfully made for your special day.</span>
        </div>
      </footer>
    </main>
  );
}
