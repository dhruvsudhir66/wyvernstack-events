"use client";

import { WeddingImage as Image } from "@/components/wedding-media";
import SectionHeading from "@/templates/template2/components/ui/SectionHeading";
import { useTemplate2 } from "@/templates/template2/context";

const photos = [
  {
    src: "/images/gallery/couple-gallery-1.webp",
    alt: "Long Drives",
    number: "01",
    aspect: "aspect-[4/5]",
    imageClass: "object-[center_42%]",
    desktop: "md:col-span-4 md:translate-y-8",
    mobile: "translate-y-0",
  },
  {
    src: "/images/gallery/couple-gallery-2.webp",
    alt: "Together",
    number: "02",
    aspect: "aspect-[5/6]",
    imageClass: "object-center",
    desktop: "md:col-span-5 md:-translate-y-2",
    mobile: "translate-y-6",
  },
  {
    src: "/images/gallery/couple-gallery-3.webp",
    alt: "Waves & Tides",
    number: "03",
    aspect: "aspect-[4/5]",
    imageClass: "object-[center_48%]",
    desktop: "md:col-span-3 md:translate-y-28",
    mobile: "translate-y-0",
  },
  {
    src: "/images/gallery/couple-gallery-4.webp",
    alt: "Date Nights",
    number: "04",
    aspect: "aspect-[5/6]",
    imageClass: "object-center",
    desktop: "md:col-span-5 md:translate-y-20",
    mobile: "translate-y-10",
  },
  {
    src: "/images/gallery/couple-gallery-5.webp",
    alt: "Celebration",
    number: "05",
    aspect: "aspect-[4/5]",
    imageClass: "object-[center_42%]",
    desktop: "md:col-span-4 md:-translate-y-4",
    mobile: "translate-y-0",
  },
  {
    src: "/images/gallery/couple-gallery-7.webp",
    alt: "Tea + Laughter",
    number: "06",
    aspect: "aspect-[5/6]",
    imageClass: "object-[center_42%]",
    desktop: "md:col-span-5 md:translate-y-16",
    mobile: "translate-y-8",
  },
] as const;

function Spark() {
  return (
    <span
      aria-hidden="true"
      className="relative flex h-5 w-5 items-center justify-center"
    >
      <span className="absolute h-px w-5 bg-[#C890A7]/40" />
      <span className="absolute h-5 w-px bg-[#C890A7]/40" />
      <span className="relative h-1.5 w-1.5 rotate-45 bg-[#C890A7]/60" />
    </span>
  );
}

export default function Gallery() {
  const configuredPhotos = useTemplate2().gallery;
  const galleryPhotos = photos.map((photo, index) => ({
    ...photo,
    src: configuredPhotos[index].src,
    alt: configuredPhotos[index].alt,
  }));
  return (
    <section
      id="gallery"
      className="
        relative
        overflow-hidden
        bg-[#F7F3ED]
        py-20
        sm:py-24
        md:py-32
      "
    >
      {/* Static atmosphere.
          The original version used several continuously animated,
          heavily blurred layers. Those are expensive on mobile GPUs.
          This keeps the same visual language without a permanent compositor load. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="
            absolute
            left-1/2
            top-[46%]
            h-[360px]
            w-[360px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[radial-gradient(circle,rgba(200,144,167,0.075)_0%,rgba(200,144,167,0.035)_42%,transparent_72%)]
            sm:h-[520px]
            sm:w-[520px]
            md:h-[700px]
            md:w-[700px]
          "
        />

        <div
          className="
            absolute
            -left-40
            top-[8%]
            h-[280px]
            w-[280px]
            rounded-full
            bg-[radial-gradient(circle,rgba(217,175,192,0.06)_0%,rgba(217,175,192,0.025)_45%,transparent_72%)]
            sm:h-[400px]
            sm:w-[400px]
          "
        />

        <div
          className="
            absolute
            -right-40
            bottom-[2%]
            h-[320px]
            w-[320px]
            rounded-full
            bg-[radial-gradient(circle,rgba(200,144,167,0.05)_0%,rgba(200,144,167,0.02)_45%,transparent_72%)]
            sm:h-[440px]
            sm:w-[440px]
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-[46%]
            -translate-x-1/2
            -translate-y-1/2
            select-none
            font-serif
            text-[180px]
            font-light
            leading-none
            tracking-[-0.08em]
            text-[#691638]/[0.025]
            sm:text-[260px]
            md:text-[390px]
          "
        >
          A&L
        </div>

        {/* Editorial rings are static: no continuous transform animation. */}
        <div
          className="
            absolute
            left-1/2
            top-[47%]
            h-[440px]
            w-[280px]
            -translate-x-1/2
            -translate-y-1/2
            rotate-[18deg]
            rounded-[50%]
            border
            border-[#C890A7]/[0.045]
            sm:h-[620px]
            sm:w-[400px]
            md:h-[800px]
            md:w-[520px]
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-[47%]
            h-[390px]
            w-[210px]
            -translate-x-1/2
            -translate-y-1/2
            rotate-[-22deg]
            rounded-[50%]
            border
            border-[#691638]/[0.02]
            sm:h-[540px]
            sm:w-[300px]
            md:h-[720px]
            md:w-[390px]
          "
        />

        {/* Very subtle paper grain. */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.018]
            [background-image:radial-gradient(rgba(105,22,56,0.8)_0.5px,transparent_0.5px)]
            [background-size:6px_6px]
          "
        />

        {/* Outer editorial frame. */}
        <div className="absolute inset-4 border border-[#691638]/[0.025] sm:inset-6 md:inset-8" />
        <div className="absolute inset-7 border border-[#C890A7]/[0.025] sm:inset-10 md:inset-12" />

        <div className="absolute left-6 top-6 h-8 w-8 border-l border-t border-[#691638]/[0.055] sm:left-10 sm:top-10" />
        <div className="absolute right-6 top-6 h-8 w-8 border-r border-t border-[#691638]/[0.055] sm:right-10 sm:top-10" />
        <div className="absolute bottom-6 left-6 h-8 w-8 border-b border-l border-[#691638]/[0.055] sm:bottom-10 sm:left-10" />
        <div className="absolute bottom-6 right-6 h-8 w-8 border-b border-r border-[#691638]/[0.055] sm:bottom-10 sm:right-10" />
      </div>

      <div className="container-wedding relative z-10">
        <div className="relative">
          <SectionHeading
            eyebrow="A few frames"
            title="Moments worth keeping."
            align="center"
          />

          <div
            aria-hidden="true"
            className="absolute left-1/2 top-full mt-5 -translate-x-1/2"
          >
            <Spark />
          </div>
        </div>

        <div
          className="
            relative
            mt-24
            grid
            grid-cols-2
            gap-x-3
            gap-y-10
            sm:gap-x-5
            sm:gap-y-14
            md:mt-28
            md:grid-cols-12
            md:gap-x-6
            md:gap-y-24
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              bottom-[-80px]
              left-1/2
              top-[-70px]
              hidden
              w-px
              -translate-x-1/2
              bg-gradient-to-b
              from-transparent
              via-[#C890A7]/[0.14]
              to-transparent
              md:block
            "
          />

          {galleryPhotos.map((photo, index) => (
            <div
              key={photo.src}
              className={`
                relative
                h-full
                ${photo.desktop}
                ${photo.mobile}
              `}
            >
              <figure className="group relative overflow-hidden bg-[#E8E2DC]">
                {/* The card remains visually rich, but only one image and one
                    lightweight overlay are composited. */}
                <div className={`relative overflow-hidden ${photo.aspect}`}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    loading="lazy"
                    quality={68}
                    sizes="
                      (max-width: 767px) 50vw,
                      (max-width: 1279px) 34vw,
                      400px
                    "
                    className={`
                      object-cover
                      ${photo.imageClass}
                      md:transition-transform
                      md:duration-[1200ms]
                      md:ease-[cubic-bezier(0.22,1,0.36,1)]
                      md:group-hover:scale-[1.07]
                    `}
                  />

                  {/* Single static photographic treatment instead of
                      multiple full-card overlays + animated light sweep. */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-[#321722]/[0.34]
                      via-transparent
                      to-white/[0.035]
                    "
                  />

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-[radial-gradient(ellipse_at_center,transparent_52%,rgba(45,20,30,0.12)_100%)]
                    "
                  />

                  {/* Outer photo frame. */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-2
                      z-20
                      border
                      border-white/45
                    "
                  />

                  {/* Inner photo frame. */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-4
                      z-20
                      border
                      border-[#F8EBE6]/25
                    "
                  />

                  <div
                    className="
                      absolute
                      left-5
                      top-5
                      z-30
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      border
                      border-white/45
                      bg-[#2C1D23]/[0.18]
                      text-[8px]
                      tracking-[0.12em]
                      text-white/95
                    "
                  >
                    {photo.number}
                  </div>

                  <figcaption
                    className="
                      absolute
                      bottom-5
                      left-5
                      z-30
                      text-[8px]
                      font-medium
                      uppercase
                      tracking-[0.22em]
                      text-white/90
                    "
                  >
                    {photo.alt}
                  </figcaption>

                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      bottom-5
                      right-5
                      z-30
                      h-3
                      w-3
                      border-b
                      border-r
                      border-white/45
                      md:transition-[width,height]
                      md:duration-500
                      md:group-hover:h-5
                      md:group-hover:w-5
                    "
                  />
                </div>
              </figure>
            </div>
          ))}
        </div>

        <div className="relative mt-20 flex items-center justify-center sm:mt-24">
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              h-16
              w-32
              rounded-full
              bg-[radial-gradient(ellipse,rgba(200,144,167,0.08)_0%,transparent_72%)]
            "
          />

          <div className="relative flex items-center gap-5">
            <span className="h-px w-12 bg-[#691638]/[0.10] sm:w-20" />

            <div
              aria-hidden="true"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                border
                border-[#C890A7]/30
              "
            >
              <span className="h-2 w-2 rotate-45 bg-[#C890A7]/65" />
            </div>

            <span className="h-px w-12 bg-[#691638]/[0.10] sm:w-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
