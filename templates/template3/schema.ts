import { z } from "zod";
import { weddingShareSeoSchema } from "../../lib/seo-schema.ts";

const photo = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
});

export const template3Schema = z.object({
  template: z.literal("template3"),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  couple: z.object({
    firstName: z.string().min(1),
    secondName: z.string().min(1),
    joined: z.string().min(1),
  }),
  date: z.object({
    display: z.string().min(1),
    compact: z.string().min(1),
    weekday: z.string().min(1),
    location: z.string().min(1),
    day: z.number().int().min(1).max(31),
    monthLabel: z.string().min(1),
    year: z.string().min(1),
    caption: z.string().min(1),
  }),
  countdown: z.object({
    iso: z.string().min(1),
    timezone: z.string().min(1),
  }),
  assets: z.object({
    invitation: z.string().min(1),
    hero: z.string().min(1),
    invitationCard: z.string().min(1),
    music: z.string().min(1),
    bride: z.object({
      main: z.string().min(1),
      second: z.string().min(1),
      third: z.string().min(1),
    }),
    groom: z.object({
      main: z.string().min(1),
      second: z.string().min(1),
      third: z.string().min(1),
    }),
    story: z.object({
      background: z.string().min(1),
      childhood: z.string().min(1),
    }),
  }),
  theme: z.object({
    saveDateBackground: z.string().min(1),
    heroBackground: z.string().min(1),
    heroText: z.string().min(1),
    browser: z.string().min(1),
  }),
  copy: z.object({
    saveDate: z.object({
      ariaLabel: z.string().min(1),
      eyebrow: z.string().min(1),
      message: z.string().min(1),
      invitationAlt: z.string().min(1),
      header: z.string().min(1),
      openButton: z.string().min(1),
      openButtonAriaLabel: z.string().min(1),
      tagline: z.string().min(1),
      ringsAriaLabel: z.string().min(1),
    }),
    hero: z.object({
      ariaLabel: z.string().min(1),
      chapter: z.string().min(1),
      photoAlt: z.string().min(1),
      photoCaption: z.string().min(1),
      beginningLabel: z.string().min(1),
      heading: z.string().min(1),
      story: z.string().min(1),
      handwrittenNote: z.string().min(1),
      then: z.string().min(1),
      now: z.string().min(1),
      pageNumber: z.string().min(1),
      continue: z.string().min(1),
    }),
  }),
  seo: weddingShareSeoSchema.extend({
    themeColor: z.string().min(1),
  }),
  music: z.object({
    enabled: z.boolean(),
    volume: z.number().min(0).max(1),
  }),
  gallery: z.object({
    strips: z.array(z.array(photo).length(3)).length(2),
  }),
  venueDetails: z.object({
    events: z.object({
      church: z.object({
        label: z.string().min(1),
        title: z.string().min(1),
        time: z.string().min(1),
        note: z.string().min(1),
        venue: z.string().min(1),
        mapUrl: z.string().min(1),
      }),
      reception: z.object({
        label: z.string().min(1),
        title: z.string().min(1),
        time: z.string().min(1),
        note: z.string().min(1),
        venue: z.string().min(1),
        mapUrl: z.string().min(1),
      }),
    }),
    venue: z.object({
      name: z.string().min(1),
      address: z.string().min(1),
      mapUrl: z.string().min(1),
    }),
    palette: z.object({
      title: z.string().min(1),
      colors: z.array(z.object({ name: z.string().min(1), hex: z.string().min(1) })).min(1),
    }),
  }),
  calendar: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    location: z.string().min(1),
    fileName: z.string().min(1),
    uidHost: z.string().min(1),
    prodId: z.string().min(1),
    durationHours: z.number().positive(),
    start: z.object({
      year: z.number().int(),
      month: z.number().int(),
      day: z.number().int(),
      hour: z.number().int(),
      minute: z.number().int(),
    }),
    end: z.object({
      year: z.number().int(),
      month: z.number().int(),
      day: z.number().int(),
      hour: z.number().int(),
      minute: z.number().int(),
    }),
    display: z.string().min(1),
  }),
  footer: z.object({
    message: z.string().min(1),
    instagramUrl: z.string().min(1),
    instagramHandle: z.string().min(1),
    instagramAria: z.string().min(1),
    studioUrl: z.string().min(1),
    studioInstagramUrl: z.string().min(1),
    copyright: z.string().min(1),
    closing: z.string().min(1),
  }),
  invitationAlt: z.string().min(1),
  integrations: z.object({
    rsvpUrl: z.url(),
    photoUrl: z.url(),
  }),
});

export type Template3Config = z.infer<typeof template3Schema>;
