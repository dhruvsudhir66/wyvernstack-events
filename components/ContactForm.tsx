
"use client";

import { useState, type FormEvent } from "react";
import { withBasePath } from "@/lib/base-path";

type FormStatus = "idle" | "sending" | "success" | "error";

const inputClass =
  "mt-2 w-full border border-[#252124]/15 bg-transparent px-3 py-3 text-sm text-[#292522] outline-none placeholder:text-[#817A75] transition-colors focus:border-[#9B1528]";

const labelClass =
  "text-[10px] font-medium uppercase tracking-[0.12em] text-[#716B66]";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setError("");

    try {
      const response = await fetch(withBasePath("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          celebrationType: String(data.get("celebrationType") ?? ""),
          message: String(data.get("message") ?? ""),
          phone: "",
          eventDate: "",
          website: String(data.get("website") ?? ""),
        }),
      });

      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(result.error || "Unable to send your enquiry.");
      }

      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Spam prevention */}
      <div aria-hidden="true" className="absolute" style={{ left: "-10000px" }}>
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Your name *
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            minLength={2}
            maxLength={100}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email address *
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            maxLength={254}
            required
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-type" className={labelClass}>
          Occasion *
        </label>
        <select
          id="contact-type"
          name="celebrationType"
          defaultValue=""
          required
          className={`${inputClass} appearance-none`}
        >
          <option value="" disabled>
            What are you celebrating?
          </option>
          <option value="Wedding invitation">Wedding</option>
          <option value="Engagement or family function">
            Engagement or family function
          </option>
          <option value="Birthday invitation or surprise">
            Birthday or surprise
          </option>
          <option value="Valentines or anniversary wish">
            Valentine&apos;s Day or anniversary
          </option>
          <option value="Personalised digital greeting">
            Personalised greeting
          </option>
          <option value="Other celebration">Something else</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Tell us about your idea *
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          minLength={10}
          maxLength={4000}
          required
          placeholder="Tell us a little about what you have in mind..."
          className={`${inputClass} resize-y leading-6`}
        />
      </div>

      {status === "success" && (
        <p
          role="status"
          className="border-l-2 border-[#9B1528] pl-3 text-xs leading-6 text-[#81202D]"
        >
          Thank you! Your enquiry has been sent successfully.
        </p>
      )}

      {status === "error" && (
        <p role="alert" className="text-xs leading-6 text-[#9B1528]">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-3 border-t border-[#252124]/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-[10px] leading-5 text-[#817A75]">
          Your details will only be used to respond to your enquiry.
        </p>

        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-11 items-center justify-center gap-4 bg-[#9B1528] px-5 py-3 text-xs font-medium text-white transition-colors hover:bg-[#7F1021] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Send enquiry"}
          {status !== "sending" && <span aria-hidden="true">↗</span>}
        </button>
      </div>
    </form>
  );
}
