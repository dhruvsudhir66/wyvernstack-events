/**
 * Safe template behaviour shared by every template 1 wedding.
 * Couple names, dates, copy, and asset paths are never defaulted here.
 */
export const template1Defaults = {
  music: { enabled: true },
  integrations: {
    rsvpPath: "/api/rsvp",
    uploadPath: "/api/upload",
  },
} as const;
