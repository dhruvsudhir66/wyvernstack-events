"use client";

import { FormEvent, useState } from "react";
import { Check, Send } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "@/templates/template2/components/ui/Reveal";
import AddToCalendar from "@/templates/template2/components/wedding/AddToCalendar";
import { useTemplate2 } from "@/templates/template2/context";

// =========================================================
// GOOGLE APPS SCRIPT — RSVP ONLY
// Replace this with your NEW RSVP Apps Script Web App URL.
// Do NOT use your photo-upload Apps Script URL here.
// =========================================================

export default function RSVP() {
  const wedding = useTemplate2();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [attendance, setAttendance] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const note = String(formData.get("note") || "").trim();

    if (!name) {
      setError("Please enter your name.");
      setSubmitting(false);
      return;
    }

    if (!attendance) {
      setError("Please let us know whether you'll be joining us.");
      setSubmitting(false);
      return;
    }

    try {
      const body = new URLSearchParams();

      body.append("type", "rsvp");
      body.append("name", name);
      body.append("attendance", attendance);
      body.append("note", note);

      const response = await fetch(wedding.integrations.rsvpUrl, {
        method: "POST",
        body,
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(
          result.error || "Unable to send RSVP. Please try again.",
        );
      }

      setSubmitted(true);
    } catch (err) {
      console.error("RSVP submission failed:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="rsvp"
      className="
        relative
        isolate
        overflow-hidden
        bg-[#F7F3ED]
        py-16
        sm:py-20
        md:py-28
        lg:py-32
      "
    >
      {/* =========================================================
          LIGHT ATMOSPHERE
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Warm central glow */}
        <div
          className="
            absolute
            left-1/2
            top-[35%]
            h-[430px]
            w-[95vw]
            -translate-x-1/2
            rounded-full
            bg-[#E8D6D8]/35
            blur-[120px]
            sm:h-[560px]
            sm:w-[70vw]
          "
        />

        {/* Soft blush */}
        <div
          className="
            absolute
            -right-[180px]
            top-[8%]
            h-[380px]
            w-[380px]
            rounded-full
            bg-[#C890A7]/[0.06]
            blur-[110px]
          "
        />

        {/* Warm beige glow */}
        <div
          className="
            absolute
            -left-[180px]
            bottom-[5%]
            h-[400px]
            w-[400px]
            rounded-full
            bg-[#D8C7B8]/[0.12]
            blur-[110px]
          "
        />

        {/* Subtle top light */}
        <div
          className="
            absolute
            inset-x-[10%]
            top-0
            h-32
            bg-gradient-to-b
            from-white/40
            to-transparent
            blur-2xl
          "
        />

        {/* Paper grain */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.028]
            [background-image:radial-gradient(
              rgba(63,57,53,0.8)_0.5px,
              transparent_0.5px
            )]
            [background-size:5px_5px]
          "
        />
      </div>

      {/* =========================================================
          CONTENT
      ========================================================= */}

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
        <div
          className="
            grid
            gap-12
            lg:grid-cols-[0.8fr_1.2fr]
            lg:items-center
            lg:gap-20
            xl:gap-28
          "
        >
          {/* =====================================================
              INTRO
          ===================================================== */}

          <Reveal>
            <div className="relative">
              <div className="mb-7 flex items-center gap-3">
                <span className="h-px w-9 bg-[#8F596C]/45 sm:w-12" />

                <span
                  className="
                    text-[8px]
                    font-medium
                    uppercase
                    tracking-[0.3em]
                    text-[#514943]
                    sm:text-[9px]
                  "
                >
                  Be our guest
                </span>
              </div>

              <h2
                className="
                  max-w-[350px]
                  font-display
                  text-[45px]
                  leading-[0.9]
                  tracking-[-0.05em]
                  text-[#3F3935]
                  sm:max-w-xl
                  sm:text-[58px]
                  md:text-[68px]
                "
              >
                We&apos;d love to
                <span className="serif-italic font-light"> hear from you.</span>
              </h2>

              <p
                className="
                  mt-6
                  max-w-[340px]
                  text-[11px]
                  leading-6
                  text-[#514943]/70
                  sm:max-w-md
                  sm:text-[13px]
                  sm:leading-7
                "
              >
                Let us know that you&apos;re coming. A little note from you would
                make our day even more special.
              </p>

              {/* Quote */}

              <div
                className="
                  relative
                  mt-10
                  max-w-[330px]
                  border-l
                  border-[#8F596C]/30
                  pl-5
                  sm:mt-12
                "
              >
                <p
                  className="
                    serif-italic
                    text-[17px]
                    leading-7
                    text-[#514943]/55
                    sm:text-lg
                  "
                >
                  &quot;The best moments are the ones we share.&quot;
                </p>
              </div>

              {/* =================================================
                  DATE + CALENDAR
              ================================================= */}

              <div className="mt-9">
                <div className="mt-5 flex justify-start">
                  <AddToCalendar
                    event={wedding.calendar}
                  />
                </div>
              </div>
            </div>
          </Reveal>

          {/* =====================================================
              RSVP FORM
          ===================================================== */}

          <Reveal delay={0.12}>
            {submitted ? (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  relative
                  min-h-[390px]
                  overflow-hidden
                  border
                  border-[#8F596C]/20
                  bg-[#E8D6D8]
                  px-6
                  py-12
                  text-center
                  shadow-[0_25px_70px_rgba(95,60,68,0.08)]
                  sm:min-h-[450px]
                  sm:px-10
                "
              >
                {/* Decorative circles */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-1/2
                    h-64
                    w-64
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    border
                    border-[#8F596C]/15
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-1/2
                    h-44
                    w-44
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-white/20
                    blur-2xl
                  "
                />

                <div className="relative z-10 flex min-h-[330px] flex-col items-center justify-center">
                  <div
                    className="
                      flex
                      h-14
                      w-14
                      rotate-45
                      items-center
                      justify-center
                      border
                      border-[#8F596C]/30
                      bg-[#F7F3ED]
                    "
                  >
                    <Check
                      size={21}
                      strokeWidth={1.3}
                      className="-rotate-45 text-[#514943]"
                    />
                  </div>

                  <h3
                    className="
                      mt-9
                      font-display
                      text-[40px]
                      leading-none
                      tracking-[-0.04em]
                      text-[#3F3935]
                      sm:text-5xl
                    "
                  >
                    Thank you.
                  </h3>

                  <p
                    className="
                      mt-4
                      max-w-[300px]
                      text-[11px]
                      leading-6
                      text-[#514943]/65
                      sm:text-[13px]
                      sm:leading-7
                    "
                  >
                    Your response has been received. We cannot wait to celebrate
                    this beautiful day with you.
                  </p>

                  <div className="mt-7 flex items-center gap-3">
                    <span className="h-px w-8 bg-[#8F596C]/35" />

                    <span
                      className="
                        serif-italic
                        text-sm
                        text-[#514943]/55
                      "
                    >
                      {wedding.couple.joined}
                    </span>

                    <span className="h-px w-8 bg-[#8F596C]/35" />
                  </div>
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="
                  relative
                  overflow-hidden
                  border
                  border-[#8F596C]/25
                  bg-[#fff8f8]
                  p-6
                  shadow-[0_25px_70px_rgba(95,60,68,0.08)]
                  sm:p-9
                  md:p-10
                "
              >
                {/* Top accent */}

                <div
                  className="
                    absolute
                    left-0
                    right-0
                    top-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-[#8F596C]/60
                    to-transparent
                  "
                />

                {/* Corner ornament */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    right-6
                    top-6
                    h-7
                    w-7
                    rotate-45
                    border
                    border-[#8F596C]/20
                    sm:right-8
                    sm:top-8
                  "
                />

                <div className="relative z-10">
                  {/* Heading */}

                  <div>
                    <p
                      className="
                        text-[8px]
                        uppercase
                        tracking-[0.25em]
                        text-[#514943]/55
                      "
                    >
                      RSVP
                    </p>

                    <h3
                      className="
                        mt-3
                        font-display
                        text-[30px]
                        leading-none
                        tracking-[-0.035em]
                        text-[#3F3935]
                        sm:text-4xl
                      "
                    >
                      Save your place.
                    </h3>
                  </div>

                  {/* NAME */}

                  <label
                    className="
                      mt-10
                      block
                      text-[9px]
                      uppercase
                      tracking-[0.18em]
                      text-[#514943]/75
                    "
                  >
                    <span className="flex items-center gap-2">
                      Name
                      <span className="text-[#8F596C]">*</span>
                    </span>

                    <input
                      required
                      name="name"
                      autoComplete="name"
                      placeholder="Your name"
                      disabled={submitting}
                      className="
                        mt-3
                        w-full
                        border-b
                        border-[#514943]/25
                        bg-transparent
                        px-0
                        py-3
                        text-[13px]
                        normal-case
                        tracking-normal
                        text-[#3F3935]
                        outline-none
                        placeholder:text-[#514943]/30
                        transition-colors
                        duration-300
                        focus:border-[#8F596C]
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    />
                  </label>

                  {/* ATTENDANCE */}

                  <fieldset
                    className="
                      mt-8
                      border-0
                      p-0
                    "
                  >
                    <legend
                      className="
                        text-[9px]
                        uppercase
                        tracking-[0.18em]
                        text-[#514943]/75
                      "
                    >
                      Will you be joining us?
                      <span className="ml-2 text-[#8F596C]">*</span>
                    </legend>

                    <div className="mt-4 space-y-3">
                      <label
                        className="
                          flex
                          cursor-pointer
                          items-center
                          gap-3
                          text-[12px]
                          text-[#3F3935]
                        "
                      >
                        <input
                          type="radio"
                          name="attendance"
                          value="Yes, I'll be there"
                          checked={attendance === "Yes, I'll be there"}
                          onChange={(event) =>
                            setAttendance(event.target.value)
                          }
                          disabled={submitting}
                          className="
                            h-4
                            w-4
                            accent-[#691638]
                          "
                        />

                        <span>Yes, I&apos;ll be there</span>
                      </label>

                      <label
                        className="
                          flex
                          cursor-pointer
                          items-center
                          gap-3
                          text-[12px]
                          text-[#3F3935]
                        "
                      >
                        <input
                          type="radio"
                          name="attendance"
                          value="Sorry, I can't make it"
                          checked={attendance === "Sorry, I can't make it"}
                          onChange={(event) =>
                            setAttendance(event.target.value)
                          }
                          disabled={submitting}
                          className="
                            h-4
                            w-4
                            accent-[#691638]
                          "
                        />

                        <span>Sorry, I can&apos;t make it</span>
                      </label>
                    </div>
                  </fieldset>

                  {/* NOTE */}

                  <label
                    className="
                      mt-8
                      block
                      text-[9px]
                      uppercase
                      tracking-[0.18em]
                      text-[#514943]/75
                    "
                  >
                    <span>
                      Note <span className="text-[#514943]/35">(optional)</span>
                    </span>

                    <textarea
                      name="note"
                      rows={4}
                      placeholder="A note for the couple..."
                      disabled={submitting}
                      className="
                        mt-3
                        w-full
                        resize-none
                        border-b
                        border-[#514943]/25
                        bg-transparent
                        px-0
                        py-3
                        text-[13px]
                        normal-case
                        leading-6
                        tracking-normal
                        text-[#3F3935]
                        outline-none
                        placeholder:text-[#514943]/30
                        transition-colors
                        duration-300
                        focus:border-[#8F596C]
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    />
                  </label>

                  {/* ERROR */}

                  {error && (
                    <div
                      role="alert"
                      className="
                        mt-5
                        border
                        border-[#8F596C]/20
                        bg-[#E8D6D8]/40
                        px-4
                        py-3
                        text-[10px]
                        leading-5
                        text-[#691638]
                      "
                    >
                      {error}
                    </div>
                  )}

                  {/* SUBMIT */}

                  <div
                    className="
                      mt-9
                      flex
                      flex-col
                      gap-4
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >
                    <button
                      type="submit"
                      disabled={submitting}
                      className="
                        group
                        inline-flex
                        w-fit
                        items-center
                        gap-3
                        border
                        border-[#691638]/70
                        bg-[#691638]/70
                        px-6
                        py-3.5
                        text-[8px]
                        uppercase
                        tracking-[0.2em]
                        text-[#F7F3ED]
                        transition-all
                        duration-300
                        hover:bg-[#514943]
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    >
                      {submitting ? "Sending..." : "Send RSVP"}

                      <Send
                        size={13}
                        strokeWidth={1.4}
                        className="
                          transition-transform
                          duration-300
                          group-hover:translate-x-0.5
                          group-hover:-translate-y-0.5
                        "
                      />
                    </button>
                  </div>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>

      {/* Bottom ornament */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-8
          left-1/2
          hidden
          -translate-x-1/2
          items-center
          gap-3
          sm:flex
        "
      >
        <span className="h-px w-10 bg-[#514943]/15" />

        <span
          className="
            h-1.5
            w-1.5
            rotate-45
            border
            border-[#8F596C]/45
          "
        />

        <span className="h-px w-10 bg-[#514943]/15" />
      </div>
    </section>
  );
}
