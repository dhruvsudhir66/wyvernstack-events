"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTemplate3 } from "@/templates/template3/context";
import type { Template3Config } from "@/templates/template3/schema";

type CalendarEvent = Template3Config["calendar"];

type CalendarModalProps = {
  open: boolean;
  onClose: () => void;
};


/* =========================================================
   ICONS
========================================================= */

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.6 12.23c0-.77-.07-1.53-.22-2.25H12v4.25h5.38a4.6 4.6 0 0 1-1.99 3.02v2.51h3.22c1.89-1.74 2.99-4.3 2.99-7.53Z"
      />
      <path
        fill="currentColor"
        d="M12 22c2.7 0 4.96-.89 6.61-2.42l-3.22-2.51c-.9.61-2.05.98-3.39.98-2.61 0-4.82-1.76-5.61-4.13H3.06v2.59A9.99 9.99 0 0 0 12 22Z"
      />
      <path
        fill="currentColor"
        d="M6.39 13.92A6 6 0 0 1 6.08 12c0-.67.12-1.32.31-1.92V7.49H3.06A10 10 0 0 0 2 12c0 1.61.39 3.13 1.06 4.51l3.33-2.59Z"
      />
      <path
        fill="currentColor"
        d="M12 5.95c1.47 0 2.79.51 3.83 1.5l2.87-2.87C16.96 2.99 14.7 2 12 2a9.99 9.99 0 0 0-8.94 5.49l3.33 2.59C7.18 7.71 9.39 5.95 12 5.95Z"
      />
    </svg>
  );
}

function OutlookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M13.2 4h7.3c.83 0 1.5.67 1.5 1.5v13c0 .83-.67 1.5-1.5 1.5h-7.3V4Z"
      />
      <path
        fill="#F8F4EA"
        d="M15.5 7.5h4v1.3h-4zM15.5 10.2h4v1.3h-4zM15.5 12.9h3v1.3h-3z"
        opacity=".85"
      />
      <path
        fill="currentColor"
        d="M4.3 6.1h8.4c.72 0 1.3.58 1.3 1.3v9.2c0 .72-.58 1.3-1.3 1.3H4.3c-.72 0-1.3-.58-1.3-1.3V7.4c0-.72.58-1.3 1.3-1.3Z"
      />
      <path
        fill="#F8F4EA"
        d="M8.5 8.4c-2.05 0-3.35 1.32-3.35 3.6 0 2.28 1.3 3.6 3.35 3.6s3.35-1.32 3.35-3.6c0-2.28-1.3-3.6-3.35-3.6Zm0 1.32c1.2 0 1.88.82 1.88 2.28s-.68 2.28-1.88 2.28-1.88-.82-1.88-2.28.68-2.28 1.88-2.28Z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M17.05 12.54c-.02-2.2 1.79-3.26 1.87-3.31-1.02-1.49-2.61-1.69-3.17-1.72-1.35-.14-2.66.8-3.34.8-.7 0-1.74-.79-2.86-.77-1.46.02-2.81.87-3.56 2.18-1.54 2.67-.39 6.6 1.08 8.75.74 1.05 1.6 2.2 2.74 2.16 1.1-.04 1.52-.7 2.86-.7 1.32 0 1.7.7 2.85.67 1.18-.02 1.93-1.06 2.65-2.12.87-1.2 1.22-2.37 1.24-2.43-.03-.01-2.33-.89-2.36-3.51ZM14.84 6.07c.6-.75 1.01-1.77.9-2.8-.87.04-1.94.58-2.56 1.32-.55.64-1.04 1.69-.91 2.68.98.08 1.98-.49 2.57-1.2Z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M12 3v11" />
      <path d="m8 10 4 4 4-4" />
      <path d="M4 18v2h16v-2" />
    </svg>
  );
}

/* =========================================================
   DATE HELPERS
========================================================= */

function googleCalendarDates(event: CalendarEvent) {
  const start = new Date(
    Date.UTC(
      event.start.year,
      event.start.month - 1,
      event.start.day,
      event.start.hour,
      event.start.minute,
    ),
  );

  const end = new Date(
    Date.UTC(
      event.end.year,
      event.end.month - 1,
      event.end.day,
      event.end.hour,
      event.end.minute,
    ),
  );

  const format = (date: Date) =>
    date
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}Z$/, "Z");

  return `${format(start)}/${format(end)}`;
}

function outlookDateTime({
  year,
  month,
  day,
  hour,
  minute,
}: {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
    2,
    "0",
  )}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`;
}

/* =========================================================
   CALENDAR URLS
========================================================= */

function getGoogleCalendarUrl(event: CalendarEvent) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: googleCalendarDates(event),
    details: event.description,
    location: event.location,
    stz: "Asia/Kolkata",
    etz: "Asia/Kolkata",
  });

  return `https://calendar.google.com/calendar/r/eventedit?${params.toString()}`;
}

function getOutlookCalendarUrl(event: CalendarEvent) {
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: event.title,
    body: event.description,
    location: event.location,
    startdt: outlookDateTime(event.start),
    enddt: outlookDateTime(event.end),
    allday: "false",
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

/* =========================================================
   ICAL DOWNLOAD
========================================================= */

function downloadICS(event: CalendarEvent) {
  const pad = (value: number) => String(value).padStart(2, "0");

  const start =
    `${event.start.year}` +
    `${pad(event.start.month)}` +
    `${pad(event.start.day)}` +
    `T${pad(event.start.hour)}` +
    `${pad(event.start.minute)}00`;

  const end =
    `${event.end.year}` +
    `${pad(event.end.month)}` +
    `${pad(event.end.day)}` +
    `T${pad(event.end.hour)}` +
    `${pad(event.end.minute)}00`;

  const escapeICS = (value: string) =>
    value
      .replace(/\\/g, "\\\\")
      .replace(/\r?\n/g, "\\n")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;");

  const calendar = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:${event.prodId}`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@${event.uidHost}`,
    `DTSTAMP:${new Date()
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}Z$/, "Z")}`,
    `DTSTART;TZID=Asia/Kolkata:${start}`,
    `DTEND;TZID=Asia/Kolkata:${end}`,
    `SUMMARY:${escapeICS(event.title)}`,
    `DESCRIPTION:${escapeICS(event.description)}`,
    `LOCATION:${escapeICS(event.location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([calendar], {
    type: "text/calendar;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = event.fileName;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

/* =========================================================
   CALENDAR OPTION
========================================================= */

function CalendarOption({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
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
        gap-3
        border-b
        border-[#59674D]/10
        px-5
        py-4
        text-left
        transition-colors
        hover:bg-[#59674D]/[0.04]
        last:border-b-0
      "
    >
      <span
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          border
          border-[#59674D]/15
          text-[#59674D]
          transition-colors
          group-hover:border-[#59674D]/30
        "
      >
        {icon}
      </span>

      <span className="min-w-0 flex-1">
        <span
          className="
            block
            font-display
            text-[17px]
            leading-none
            text-[#30352B]
          "
        >
          {title}
        </span>

        <span
          className="
            mt-1
            block
            font-sans
            text-[6px]
            font-medium
            uppercase
            tracking-[0.16em]
            text-[#59674D]/55
          "
        >
          {description}
        </span>
      </span>

      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3.5 w-3.5 text-[#59674D]/45 transition-transform duration-200 group-hover:translate-x-0.5"
        aria-hidden="true"
      >
        <path d="M5 12h13" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    </button>
  );
}

/* =========================================================
   MODAL
========================================================= */

export default function CalendarModal({ open, onClose }: CalendarModalProps) {
  const calendarEvent = useTemplate3().calendar;
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

  const openExternalCalendar = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");

    onClose();
  };

  const modal = (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-[#30352B]/55
        p-4
        backdrop-blur-[5px]
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="calendar-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="
          relative
          w-full
          max-w-[370px]
          overflow-hidden
          bg-[#F8F4EA]
          text-[#30352B]
          shadow-[0_22px_70px_rgba(20,24,20,0.25)]
        "
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
      >
        {/* TOP ACCENT */}

        <div
          aria-hidden="true"
          className="
            absolute
            left-0
            right-0
            top-0
            h-[2px]
            bg-[#59674D]
          "
        />

        {/* CLOSE */}

        <button
          type="button"
          onClick={onClose}
          aria-label="Close calendar options"
          className="
            absolute
            right-3
            top-3
            z-10
            flex
            h-7
            w-7
            items-center
            justify-center
            text-[#59674D]/70
            transition-opacity
            hover:opacity-50
          "
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            className="h-3.5 w-3.5"
          >
            <path d="M6 6L18 18" />
            <path d="M18 6L6 18" />
          </svg>
        </button>

        {/* HEADER */}

        <div
          className="
            border-b
            border-[#59674D]/12
            px-5
            pb-4
            pt-6
          "
        >
          <div className="flex items-center gap-2">
            <span className="font-mono text-[6px] tracking-[0.2em] text-[#59674D]">
              SAVE THE DATE
            </span>

            <span className="h-px w-4 bg-[#59674D]/35" />
          </div>

          <h2
            id="calendar-modal-title"
            className="
              mt-2.5
              pr-8
              font-display
              text-[1.85rem]
              font-medium
              leading-[0.9]
              tracking-[-0.03em]
            "
          >
            Add to your calendar.
          </h2>

          <p
            className="
              mt-1.5
              font-display
              text-[12px]
              leading-[1.45]
              text-[#59674D]/70
            "
          >
            Choose your preferred calendar.
          </p>
        </div>

        {/* OPTIONS */}

        <div>
          <CalendarOption
            icon={<GoogleIcon />}
            title="Google Calendar"
            description="Open a pre-filled event"
            onClick={() => openExternalCalendar(getGoogleCalendarUrl(calendarEvent))}
          />

          <CalendarOption
            icon={<OutlookIcon />}
            title="Outlook"
            description="Open in Outlook Calendar"
            onClick={() => openExternalCalendar(getOutlookCalendarUrl(calendarEvent))}
          />

          <CalendarOption
            icon={<AppleIcon />}
            title="Apple Calendar"
            description="Download calendar file"
            onClick={() => {
              downloadICS(calendarEvent);
              onClose();
            }}
          />
        </div>

        {/* FOOTER */}

        <div
          className="
            border-t
            border-[#59674D]/10
            px-5
            py-3
          "
        >
          <p
            className="
              text-center
              font-sans
              text-[5.5px]
              font-medium
              uppercase
              tracking-[0.15em]
              text-[#59674D]/40
            "
          >
            {calendarEvent.display}
          </p>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
