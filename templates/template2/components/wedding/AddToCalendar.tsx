"use client";

import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  Download,
  ExternalLink,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type CalendarEvent = {
  title: string;
  description?: string;
  location?: string;
  start: string;
  end: string;
};

type AddToCalendarProps = {
  event: CalendarEvent;
  label?: string;
};

function formatCalendarDate(date: Date) {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
}

function escapeICS(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function formatDuration(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  return `${String(hours).padStart(2, "0")}${String(minutes).padStart(2, "0")}`;
}

export default function AddToCalendar({
  event,
  label = "Add to calendar",
}: AddToCalendarProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function openGoogleCalendar() {
    const start = formatCalendarDate(new Date(event.start));
    const end = formatCalendarDate(new Date(event.end));

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: event.title,
      dates: `${start}/${end}`,
      details: event.description ?? "",
      location: event.location ?? "",
    });

    window.open(
      `https://calendar.google.com/calendar/render?${params.toString()}`,
      "_blank",
      "noopener,noreferrer",
    );

    setOpen(false);
  }

  function openOutlook() {
    const params = new URLSearchParams({
      path: "/calendar/action/compose",
      rru: "addevent",
      subject: event.title,
      startdt: new Date(event.start).toISOString(),
      enddt: new Date(event.end).toISOString(),
      body: event.description ?? "",
      location: event.location ?? "",
    });

    window.open(
      `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`,
      "_blank",
      "noopener,noreferrer",
    );

    setOpen(false);
  }

  function openYahooCalendar() {
    const start = new Date(event.start);
    const end = new Date(event.end);

    const duration = Math.round((end.getTime() - start.getTime()) / 1000);

    const params = new URLSearchParams({
      v: "60",
      title: event.title,
      st: formatCalendarDate(start),
      dur: formatDuration(duration),
      desc: event.description ?? "",
      in_loc: event.location ?? "",
    });

    window.open(
      `https://calendar.yahoo.com/?${params.toString()}`,
      "_blank",
      "noopener,noreferrer",
    );

    setOpen(false);
  }

  function downloadICS() {
    const start = formatCalendarDate(new Date(event.start));
    const end = formatCalendarDate(new Date(event.end));

    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Wyvernstack//Wedding Invitation//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${crypto.randomUUID()}`,
      `DTSTAMP:${formatCalendarDate(new Date())}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${escapeICS(event.title)}`,
      `DESCRIPTION:${escapeICS(event.description ?? "")}`,
      `LOCATION:${escapeICS(event.location ?? "")}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], {
      type: "text/calendar;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${event.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}.ics`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setOpen(false);
  }

  return (
    <div
      ref={wrapperRef}
      className="
        relative
        flex
        w-full
        justify-center
      "
    >
      {/* =====================================================
          CENTERED CALENDAR BUTTON
      ===================================================== */}

      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        whileTap={{ scale: 0.98 }}
        className="
          group
          relative
          inline-flex
          items-center
          justify-center
          gap-2.5
          overflow-hidden
          border
          border-[#C890A7]/45
          bg-[#FDF9F7]
          px-5
          py-2.5
          text-[#8F596C]
          shadow-[0_5px_18px_rgba(143,89,108,0.07)]
          transition-all
          duration-300
          hover:border-[#C890A7]/70
          hover:bg-[#F8EBE6]
          hover:shadow-[0_8px_24px_rgba(143,89,108,0.10)]
        "
      >
        {/* Subtle inner border */}
        <span
          className="
            pointer-events-none
            absolute
            inset-[3px]
            border
            border-[#C890A7]/10
          "
        />

        {/* Icon */}
        <span
          className="
            relative
            z-10
            flex
            h-6
            w-6
            items-center
            justify-center
            border
            border-[#C890A7]/25
            bg-[#E8D6D8]/45
          "
        >
          <CalendarDays
            size={13}
            strokeWidth={1.3}
            className="
              transition-transform
              duration-500
              group-hover:-translate-y-0.5
            "
          />
        </span>

        {/* Label */}
        <span
          className="
            relative
            z-10
            text-[8px]
            font-medium
            uppercase
            tracking-[0.2em]
          "
        >
          {label}
        </span>

        {/* Divider */}
        <span className="relative z-10 h-4 w-px bg-[#C890A7]/20" />

        {/* Chevron */}
        <ChevronDown
          size={11}
          strokeWidth={1.25}
          className={`
            relative
            z-10
            text-[#8F596C]/60
            transition-transform
            duration-300
            ${open ? "rotate-180" : ""}
          `}
        />

        {/* Bottom accent */}
        <motion.span
          className="
            pointer-events-none
            absolute
            bottom-0
            left-1/2
            h-px
            -translate-x-1/2
            bg-[#C890A7]
          "
          animate={{
            width: open ? 34 : 14,
            opacity: open ? 0.7 : 0.4,
          }}
          transition={{
            duration: 0.35,
          }}
        />
      </motion.button>

      {/* =====================================================
          CALENDAR OPTIONS
      ===================================================== */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 6,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 6,
              scale: 0.98,
            }}
            transition={{
              duration: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute
              left-1/2
              top-full
              z-50
              mt-3
              w-[250px]
              -translate-x-1/2
              overflow-hidden
              border
              border-[#C890A7]/25
              bg-[#FDF9F7]
              shadow-[0_18px_50px_rgba(105,22,56,0.12)]
            "
          >
            {/* Top accent */}
            <div className="h-px w-full bg-[#C890A7]/50" />

            {/* Header */}
            <div
              className="
                flex
                items-start
                justify-between
                border-b
                border-[#C890A7]/15
                bg-[#E8D6D8]/30
                px-4
                py-3.5
              "
            >
              <div>
                <p
                  className="
                    text-[6px]
                    uppercase
                    tracking-[0.28em]
                    text-[#8F596C]/65
                  "
                >
                  Save the date
                </p>

                <p
                  className="
                    mt-1
                    font-display
                    text-[17px]
                    leading-none
                    tracking-[-0.025em]
                    text-[#691638]
                  "
                >
                  {event.title}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close calendar options"
                className="
                  text-[#8F596C]/40
                  transition-colors
                  hover:text-[#691638]
                "
              >
                <X size={12} strokeWidth={1.2} />
              </button>
            </div>

            {/* Options */}
            <div className="p-1.5">
              <CalendarOption
                title="Google Calendar"
                subtitle="Add online"
                icon={<ExternalLink size={11} strokeWidth={1.2} />}
                onClick={openGoogleCalendar}
              />

              <CalendarOption
                title="Outlook Calendar"
                subtitle="Add online"
                icon={<ExternalLink size={11} strokeWidth={1.2} />}
                onClick={openOutlook}
              />

              <CalendarOption
                title="Yahoo Calendar"
                subtitle="Add online"
                icon={<ExternalLink size={11} strokeWidth={1.2} />}
                onClick={openYahooCalendar}
              />

              <div className="mx-2 my-1 border-t border-[#C890A7]/12" />

              <CalendarOption
                title="Apple / Other"
                subtitle="Download .ics file"
                icon={<Download size={11} strokeWidth={1.2} />}
                onClick={downloadICS}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CalendarOption({
  title,
  subtitle,
  icon,
  onClick,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        flex
        w-full
        items-center
        justify-between
        px-3
        py-2.5
        text-left
        transition-colors
        duration-300
        hover:bg-[#F8EBE6]
      "
    >
      <div>
        <p className="text-[9px] text-[#691638]">{title}</p>

        <p
          className="
            mt-0.5
            text-[6px]
            uppercase
            tracking-[0.16em]
            text-[#8F596C]/50
          "
        >
          {subtitle}
        </p>
      </div>

      <span
        className="
          text-[#8F596C]/45
          transition-all
          duration-300
          group-hover:translate-x-0.5
          group-hover:text-[#8F596C]/75
        "
      >
        {icon}
      </span>
    </button>
  );
}
