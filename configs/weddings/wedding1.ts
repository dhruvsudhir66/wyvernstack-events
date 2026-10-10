import { template1Defaults } from "../../templates/template1/defaults.ts";
import { template1Schema, type Template1Config } from "../../templates/template1/schema.ts";

const wedding1Input = {
  template: "template1",
  slug: "wedding1",
  couple: {
    bride: "Aneena",
    groom: "Loyed",
    monogram: "L & A",
  },
  seo: {
    title: "Our Wedding | Save the Date",
    description: "A quiet, modern wedding invitation in sage, olive, cream and warm earth tones.",
    openGraphDescription: "Join us as we begin our next chapter together.",
    metadataBase: "https://example.com",
    themeColor: "#2f3524",
    manifestName: "Aneena & Abin — Wedding",
    manifestShortName: "A & A",
  },
  event: {
    displayDate: "22 November 2026",
    compactDate: "22 · 11 · 2026",
    countdownIso: "2026-11-22T00:00:00+05:30",
    timezone: "Asia/Kolkata",
    location: "Kerala",
    locationLine: "Kerala · 2026",
    nav: { day: "22", month: "11", year: "26" },
  },
  footer: {
    date: "17 April 2027",
    place: "Ernakulam · Kerala",
    instagramUrl: "https://instagram.com/aneenaandloyed",
    instagramHandle: "@aneenaandloyed",
  },
  venue: {
    date: "22 November 2026",
    time: "4:00 PM",
    name: "Venue Name",
    address: "Full venue address, Ernakulam, Kerala",
    mapsUrl: "YOUR_GOOGLE_MAPS_LINK",
  },
  music: {
    src: "/music/Until_I_Found_You.mpeg",
    enabled: template1Defaults.music.enabled,
  },
  assets: {
    logo: "/images/logo.png",
    paperTexture: "/crumpled-paper.jpg",
    countdownPaper: "/countdown-paper.jpg",
    hero: "/hero-cropped.jpeg",
    saveDate: "/save-date.webp",
  },
  profiles: {
    bride: {
      name: "Aneena",
      role: "The Bride",
      image: "/images/aneena.jpeg",
      page: "02",
      eyebrow: "Meet the bride",
      description:
        "A short introduction about Aneena goes here. Tell the story in your own voice: the little things she loves, the people who know her best, and the details that make her unmistakably herself.",
      note: "She brings a little warmth into ordinary days.",
      details: [
        { label: "Known for", value: "Her own little things" },
        { label: "Favourite", value: "Add something personal" },
        { label: "Always", value: "Add a meaningful detail" },
      ],
    },
    groom: {
      name: "Loyed",
      role: "The Groom",
      image: "/images/loyed.jpeg",
      page: "03",
      eyebrow: "Meet the groom",
      description:
        "A short introduction about Loyed goes here. Add the little details that feel like him: what he enjoys, what his family would say about him, and the qualities that make his story his own.",
      note: "He makes the familiar feel like something worth remembering.",
      details: [
        { label: "Known for", value: "His own little things" },
        { label: "Favourite", value: "Add something personal" },
        { label: "Always", value: "Add a meaningful detail" },
      ],
    },
  },
  gallery: {
    left: [
      { src: "/images/gallery/couple-gallery-1.webp", alt: "Aneena and Loyed" },
      { src: "/images/gallery/couple-gallery-2.webp", alt: "Aneena and Loyed together" },
      { src: "/images/gallery/couple-gallery-3.webp", alt: "Aneena and Loyed" },
    ],
    right: [
      { src: "/images/gallery/couple-gallery-4.webp", alt: "Aneena and Loyed" },
      { src: "/images/gallery/couple-gallery-5.webp", alt: "Aneena and Loyed together" },
      { src: "/images/gallery/couple-gallery-6.webp", alt: "Aneena and Loyed" },
    ],
    captionDate: "22 · 11 · 2026",
    volumeDate: "22 November 2026",
    sideLabel: "22 · 11 · 2026 · PRIVATE COLLECTION",
  },
  mobileNote: "take your time.",
  integrations: template1Defaults.integrations,
} satisfies Template1Config;

export const wedding1 = template1Schema.parse(wedding1Input);
