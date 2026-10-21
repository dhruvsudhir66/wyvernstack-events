
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { withBasePath } from "@/lib/base-path";
import { getSiteOrigin } from "@/lib/site-url";
import ContactForm from "@/components/ContactForm";

const RED = "#9B1528";
const INK = "#292522";
const MUTED = "#716B66";
const PAPER = "#F4F2ED";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteOrigin()),
  title: "Digital Invitations | Wyvernstack",
  description:
    "Thoughtfully designed digital invitations and personalised experiences for weddings, engagements, birthdays, and special occasions.",
  openGraph: {
    type: "website",
    url: `${getSiteOrigin()}${withBasePath("/events/")}`,
    siteName: "Wyvernstack",
    title: "Wyvernstack Events",
    description:
      "Digital invitations and thoughtful surprises for life's meaningful celebrations.",
  },
};

const previews = [
  {
    number: "01",
    category: "WEDDINGS",
    title: "A beginning worth celebrating.",
    image: "./events/images/demo-2.png",
    alt: "Traditional wedding invitation design",
  },
  {
    number: "02",
    category: "ENGAGEMENTS",
    title: "A new chapter together.",
    image: "./events/images/demo-3.png",
    alt: "Elegant engagement invitation design",
  },
  {
    number: "03",
    category: "PERSONAL WISHES",
    title: "A little love, sent your way.",
    image: "./events/images/demo-4.png",
    alt: "Personalised celebration greeting design",
  },
] as const;

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p
      className="flex items-center gap-2.5 text-[10px] font-medium uppercase tracking-[0.17em]"
      style={{ color: RED }}
    >
      <span aria-hidden="true" className="h-px w-5 bg-current" />
      {children}
    </p>
  );
}

function InvitationPreview({
  preview,
}: {
  preview: (typeof previews)[number];
}) {
  return (
    <article className="group min-w-0">
      {/* Full invitation image with shadow only */}
      <div className="relative aspect-[3/4]">
        <Image
          src={withBasePath(preview.image)}
          alt={preview.alt}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-contain object-center drop-shadow-[0_8px_14px_rgba(41,37,34,0.14)] transition-transform duration-300 group-hover:-translate-y-1"
        />
      </div>

      {/* Centred caption */}
      <div className="min-h-[88px] px-2 pt-4 text-center">
        <p className="text-[9px] uppercase tracking-[0.16em] text-[#9B1528]">
          {preview.category}
        </p>

        <h3 className="mx-auto mt-2 max-w-sm font-serif text-lg leading-snug text-[#292522] sm:text-xl">
          {preview.title}
        </h3>
      </div>
    </article>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
    >
      <path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.7a8.5 8.5 0 1 1 16.3-3.8Z" />
      <path d="M8.4 8.2c.2 2.6 2.8 5.2 5.4 5.4l1.4-1.3 2 1c-.2 1.5-1.2 2.2-2.5 2.2-3.8-.5-6.7-3.4-7.2-7.2 0-1.3.7-2.3 2.2-2.5l1 2-1.3 1.4Z" />
    </svg>
  );
}

export default function EventsIndexPage() {
  const instagramUrl =
    process.env.NEXT_PUBLIC_WYVERNSTACK_INSTAGRAM_URL;

  const instagramHandle = instagramUrl
    ? instagramUrl
        .replace(/\/+$/, "")
        .split("/")
        .pop()
        ?.split("?")[0]
    : undefined;

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WYVERNSTACK_WHATSAPP_NUMBER?.replace(
      /\D/g,
      "",
    );

  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        "Hi Wyvernstack! I'd like to enquire about a digital invitation.",
      )}`
    : undefined;

  return (
    <main
      className="min-h-screen overflow-hidden"
      style={{ backgroundColor: PAPER, color: INK }}
    >
      {/* Header */}
      <header className="border-b border-[#292522]/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
          <Link
            href={withBasePath("/")}
            aria-label="Wyvernstack home"
            className="inline-flex shrink-0 items-center"
          >
            <Image
              src={withBasePath("./events/images/logo.png")}
              alt="Wyvernstack"
              width={240}
              height={80}
              priority
              className="h-auto w-40 object-contain sm:w-44"
            />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-[#292522]/10">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_0.72fr] lg:gap-20 lg:px-12 lg:py-20">
          <div>
            <Eyebrow>Digital invitations, made personal</Eyebrow>

            <h1 className="mt-6 max-w-3xl text-[clamp(2.8rem,6.5vw,5.5rem)] font-medium leading-[1.02] tracking-[-0.06em]">
              Every moment
              <br />
              <span
                className="font-serif font-normal italic"
                style={{ color: RED }}
              >
                has a story.
              </span>
            </h1>

            <p
              className="mt-6 max-w-md text-sm leading-7 sm:text-base sm:leading-8"
              style={{ color: MUTED }}
            >
              Personalised digital invitations and thoughtful surprises for
              the moments that matter, from wedding celebrations to a birthday
              wish sent across the distance.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href="#sneak-peek"
                className="inline-flex items-center gap-4 px-5 py-3.5 text-xs font-medium text-white transition-colors hover:bg-[#7F1021]"
                style={{ backgroundColor: RED }}
              >
                Explore our ideas
                <span aria-hidden="true">↘</span>
              </a>

              <a
                href="#contact"
                className="text-xs underline decoration-[#9B1528]/40 underline-offset-4 transition-colors hover:text-[#9B1528]"
              >
                Tell us what you need
              </a>
            </div>

            <div
              className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-[#292522]/10 pt-4 text-[9px] uppercase tracking-[0.14em]"
              style={{ color: MUTED }}
            >
              <span>Weddings</span>
              <span style={{ color: RED }}>·</span>
              <span>Engagements</span>
              <span style={{ color: RED }}>·</span>
              <span>Personal wishes</span>
            </div>
          </div>

          {/* Featured invitation */}
          <div className="mx-auto w-full max-w-[390px]">
            <div className="p-1">
              <div className="relative aspect-[3/4]">
                <Image
                  src={withBasePath("./events/images/demo-1.png")}
                  alt="Featured Wyvernstack digital wedding invitation"
                  fill
                  priority
                  sizes="(max-width: 1023px) 85vw, 390px"
                  className="object-contain drop-shadow-[0_10px_18px_rgba(41,37,34,0.13)]"
                />
              </div>

              <div className="flex items-center justify-between gap-3 px-1 pt-4">
                <p
                  className="text-[9px] uppercase tracking-[0.12em]"
                  style={{ color: MUTED }}
                >
                  Featured design
                </p>

                <a
                  href="#sneak-peek"
                  className="text-[10px] transition-colors hover:text-[#7F1021]"
                  style={{ color: RED }}
                >
                  Explore designs ↘
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sneak peek */}
      <section
        id="sneak-peek"
        className="scroll-mt-8 border-b border-[#292522]/10 px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>A small preview</Eyebrow>

              <h2 className="mt-4 text-3xl tracking-[-0.045em] sm:text-4xl">
                Simple ideas,{" "}
                <span
                  className="font-serif font-normal italic"
                  style={{ color: RED }}
                >
                  personal touches.
                </span>
              </h2>
            </div>

            <p
              className="max-w-sm text-xs leading-6 sm:text-sm"
              style={{ color: MUTED }}
            >
              A few creative directions for weddings, family celebrations, and
              thoughtful surprises.
            </p>
          </div>

          <div className="mt-8 grid items-start gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {previews.map((preview) => (
              <InvitationPreview
                key={preview.number}
                preview={preview}
              />
            ))}
          </div>

          <p className="mt-6 text-[10px] leading-5" style={{ color: MUTED }}>
            Illustrative concepts, not finished client projects. Each design
            can be tailored to your occasion.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="scroll-mt-8 px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Contact information */}
          <div>
            <Eyebrow>Have something in mind?</Eyebrow>

            <h2 className="mt-5 max-w-lg text-4xl leading-[1.06] tracking-[-0.055em] sm:text-5xl">
              Let's make it
              <br />
              <span
                className="font-serif font-normal italic"
                style={{ color: RED }}
              >
                mean something.
              </span>
            </h2>

            <p
              className="mt-5 max-w-md text-sm leading-7"
              style={{ color: MUTED }}
            >
              Share a few details about your celebration or surprise. We can
              start with a simple idea and build from there.
            </p>

            {/* Social contact cards */}
            <div className="mt-8 border-t border-[#292522]/10 pt-5">
              <p
                className="text-[10px] uppercase tracking-[0.14em]"
                style={{ color: MUTED }}
              >
                Find us on social
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {/* Instagram */}
                {instagramUrl ? (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Wyvernstack on Instagram${instagramHandle ? `: @${instagramHandle}` : ""}`}
                    className="group flex min-w-0 items-center gap-3 border border-[#292522]/10 p-3 transition-colors hover:border-[#9B1528]/40"
                  >
                    <span style={{ color: RED }}>
                      <InstagramIcon />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium">Instagram</p>
                      <p className="mt-1 truncate text-[10px]" style={{ color: MUTED }}>
                        {instagramHandle ? `@${instagramHandle}` : "Visit our profile"}
                      </p>
                    </div>

                    <span
                      aria-hidden="true"
                      className="text-sm transition-transform group-hover:translate-x-0.5"
                      style={{ color: RED }}
                    >
                      ↗
                    </span>
                  </a>
                ) : (
                  <div className="flex min-w-0 items-center gap-3 border border-[#292522]/10 p-3">
                    <span style={{ color: RED }}>
                      <InstagramIcon />
                    </span>
                    <div>
                      <p className="text-xs font-medium">Instagram</p>
                      <p className="mt-1 text-[10px]" style={{ color: MUTED }}>
                        Profile link not configured
                      </p>
                    </div>
                  </div>
                )}

                {/* WhatsApp */}
                {whatsappUrl ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contact Wyvernstack on WhatsApp"
                    className="group flex min-w-0 items-center gap-3 border border-[#292522]/10 p-3 transition-colors hover:border-[#9B1528]/40"
                  >
                    <span style={{ color: RED }}>
                      <WhatsAppIcon />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium">WhatsApp</p>
                      <p className="mt-1 truncate text-[10px]" style={{ color: MUTED }}>
                        {whatsappNumber ? `+${whatsappNumber}` : "Chat with us"}
                      </p>
                    </div>

                    <span
                      aria-hidden="true"
                      className="text-sm transition-transform group-hover:translate-x-0.5"
                      style={{ color: RED }}
                    >
                      ↗
                    </span>
                  </a>
                ) : (
                  <div className="flex min-w-0 items-center gap-3 border border-[#292522]/10 p-3">
                    <span style={{ color: RED }}>
                      <WhatsAppIcon />
                    </span>
                    <div>
                      <p className="text-xs font-medium">WhatsApp</p>
                      <p className="mt-1 text-[10px]" style={{ color: MUTED }}>
                        Number not configured
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enquiry form */}
          <div className="border border-[#292522]/10 bg-white/45 p-5 sm:p-7 lg:p-9">
            <p
              className="text-[9px] uppercase tracking-[0.16em]"
              style={{ color: RED }}
            >
              Project enquiry
            </p>

            <h3 className="mt-2 font-serif text-2xl">
              Tell us about your idea.
            </h3>

            <p
              className="mb-6 mt-2 text-xs leading-6"
              style={{ color: MUTED }}
            >
              Just the essentials. We'll take it from there.
            </p>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#292522]/10 px-5 py-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={withBasePath("/")}
            className="text-[10px] font-semibold tracking-[0.18em]"
          >
            WYVERNSTACK
          </Link>

          <p className="text-[10px]" style={{ color: MUTED }}>
            Digital invitations for moments that matter.
          </p>

          <a
            href="#contact"
            className="self-start text-[10px] transition-colors hover:text-[#7F1021] sm:self-auto"
            style={{ color: RED }}
          >
            Get in touch ↗
          </a>
        </div>
      </footer>
    </main>
  );
}
