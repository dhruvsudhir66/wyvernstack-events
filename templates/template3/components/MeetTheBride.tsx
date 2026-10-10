"use client";

import { WeddingImage as Image } from "@/components/wedding-media";
import { motion } from "framer-motion";
import { useTemplate3 } from "@/templates/template3/context";

function PhotoCard({
  src,
  alt,
  className,
  delay = 0,
  priority = false,
}: {
  src: string;
  alt: string;
  className: string;
  delay?: number;
  priority?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`absolute ${className}`}
    >
      <div className="relative overflow-hidden bg-[#FFFDF9] p-2 shadow-[0_22px_45px_-30px_rgba(48,53,43,0.5)] sm:p-3">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 42vw, (max-width: 1024px) 28vw, 320px"
            className="object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function MeetTheBride() {
  const weddingConfig = useTemplate3();
  const brideName = weddingConfig.couple.secondName;
  const photos = weddingConfig.assets.bride;

  return (
    <section
      id="bride"
      aria-labelledby="meet-the-bride-title"
      className="relative w-full overflow-hidden bg-[#E9E8DC] text-[#30352B]"
    >
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[28%] top-[10%] h-[52%] w-[70%] rounded-full bg-[#59674D]/[0.035] blur-[90px]" />

        <div className="absolute -right-[18%] top-[12%] h-[54%] w-[70%] rounded-full bg-[#F8F4EA]/[0.72] blur-[90px]" />

        <div className="absolute bottom-[-10%] left-[15%] h-[35%] w-[70%] rounded-full bg-[#59674D]/[0.022] blur-[90px]" />
      </div>

      {/* Subtle paper texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #30352B 0.5px, transparent 0.5px)",
          backgroundSize: "15px 15px",
        }}
      />

      {/* Oversized section number */}
      <div className="pointer-events-none absolute -left-[3vw] top-[1%] select-none font-display text-[clamp(8rem,24vw,26rem)] font-medium leading-none tracking-[-0.09em] text-[#59674D]/[0.02]">
        03
      </div>

      <div className="relative mx-auto w-full max-w-[1500px] px-5 pb-12 pt-8 sm:px-8 sm:pb-16 sm:pt-10 lg:px-14 lg:pb-20 lg:pt-12">
        {/* Section header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="h-px w-7 bg-[#30352B]/45 sm:w-12" />

            <span className="font-display text-[9px] font-semibold uppercase tracking-[0.3em] text-[#59674D] sm:text-[10px]">
              The bride
            </span>
          </div>

          <span className="font-display text-[15px] font-medium italic leading-none text-[#30352B]/55 sm:text-[18px]">
            03
          </span>
        </header>

        <div className="relative z-10 mx-auto mt-8 grid w-full max-w-[1220px] grid-cols-1 gap-10 lg:mt-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-10">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-30 order-1 flex flex-col justify-center"
          >
            <h2
              id="meet-the-bride-title"
              className="
                max-w-[500px]
                font-display
                text-[clamp(2.8rem,12vw,6rem)]
                font-semibold
                leading-[0.84]
                tracking-[-0.045em]
                text-[#30352B]
                sm:text-[clamp(3.5rem,8vw,6rem)]
                lg:text-[clamp(4rem,6vw,6rem)]
              "
            >
              Meet
              <br />
              <span className="ml-[0.06em]">the bride.</span>
            </h2>

            <h3
              className="
                relative
                mt-4
                font-script
                text-[clamp(3.4rem,12vw,6rem)]
                leading-[0.82]
                text-[#59674D]
                sm:mt-5
                sm:text-[clamp(4rem,7vw,6rem)]
              "
            >
              {brideName}
            </h3>

            {/* Primary description */}
            <p className="mt-7 max-w-[430px] font-display text-[15px] font-medium leading-[1.6] text-[#30352B]/80 sm:mt-8 sm:text-[17px] lg:text-[18px] lg:leading-[1.65]">
              Daughter of Vincent &amp; Lilly and sister to Alwin. A close-knit
              family rooted in love, faith, and togetherness.
            </p>

            {/* Secondary description */}
            <p className="mt-5 max-w-[430px] font-display text-[15px] font-medium leading-[1.6] text-[#30352B]/80 sm:mt-6 sm:text-[17px] lg:text-[18px] lg:leading-[1.65]">
              Works in technology, with a love for learning and creativity.
            </p>

            {/* Story label */}
            <div className="mt-7 flex items-center gap-3 sm:mt-9 sm:gap-4">
              <span className="h-px w-8 bg-[#59674D]/50 sm:w-10" />

              <span className="font-display text-[8px] font-semibold uppercase tracking-[0.27em] text-[#30352B]/55 sm:text-[9px]">
                03 · Her story
              </span>
            </div>
          </motion.div>

          {/* Photo composition */}
          <div className="relative order-2 flex min-h-[410px] items-center justify-center sm:min-h-[510px] lg:min-h-[650px] xl:min-h-[700px]">
            <div className="absolute left-1/2 top-1/2 h-[74%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F8F4EA]/65 blur-[45px]" />

            <PhotoCard
              src={photos.main}
              alt={`Portrait of ${brideName}`}
              priority
              delay={0}
              className="
                left-[19%]
                top-[9%]
                z-20
                w-[56%]
                rotate-[1.5deg]
                sm:left-[22%]
                sm:w-[51%]
                lg:left-[20%]
                lg:w-[48%]
              "
            />

            <PhotoCard
              src={photos.second}
              alt={`${brideName} portrait`}
              delay={0.08}
              className="
                left-[1%]
                top-[25%]
                z-30
                w-[34%]
                rotate-[-5deg]
                sm:left-[5%]
                sm:w-[29%]
                lg:left-[4%]
                lg:w-[27%]
              "
            />

            <PhotoCard
              src={photos.third}
              alt={`${brideName} portrait`}
              delay={0.16}
              className="
                bottom-[11%]
                right-[3%]
                z-30
                w-[34%]
                rotate-[4deg]
                sm:right-[7%]
                sm:w-[30%]
                lg:right-[6%]
                lg:w-[28%]
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
