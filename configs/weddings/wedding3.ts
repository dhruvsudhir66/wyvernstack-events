import { template3Defaults } from "../../templates/template3/defaults.ts";
import { template3Schema, type Template3Config } from "../../templates/template3/schema.ts";

const wedding3Input = {
  template: "template3",
  slug: "loyed-aneena-wedding",
  couple: {
    firstName: "Loyed",
    secondName: "Aneena",
    joined: "Loyed & Aneena",
  },
  date: {
    display: "22 / 11 / 2026",
    compact: "22 · 11 · 2026",
    weekday: "Sunday",
    location: "Kerala, India",
    day: 22,
    monthLabel: "November",
    year: "2026",
    caption: "Sunday · 22 November 2026",
  },
  countdown: {
    iso: "2026-11-22T15:00:00+05:30",
    timezone: "Asia/Kolkata",
  },
  assets: {
    invitation: "/images/couple-holding-hands.webp",
    hero: "/images/hero-collage.webp",
    invitationCard: "/images/invitation-aneena.png",
    music: "/music/song.mpeg",
    bride: {
      main: "/images/bride-5.webp",
      second: "/images/bride-2.webp",
      third: "/images/bride-4.webp",
    },
    groom: {
      main: "/images/loyed.webp",
      second: "/images/groom-4.webp",
      third: "/images/groom-3.webp",
    },
    story: {
      background: "/images/couple-gallery-6.webp",
      childhood: "/images/childhood-couple.webp",
    },
  },
  theme: {
    saveDateBackground: "#e4d5bd",
    heroBackground: "#e4d5bd",
    heroText: "#34342D",
    browser: "#30352b",
  },
  copy: {
    saveDate: {
      ariaLabel: "Save the date",
      eyebrow: "Save the date",
      message:
        "A new chapter is about to begin. We would love for you to be part of it.",
      invitationAlt: "A couple holding hands by the sea",
      header: "Wedding invitation",
      openButton: "Open invitation",
      openButtonAriaLabel: "Open invitation",
      tagline: "A little beginning",
      ringsAriaLabel: "Wedding rings",
    },
    hero: {
      ariaLabel: "The beginning",
      chapter: "Our little story",
      photoAlt: "A childhood photograph of the couple together",
      photoCaption: "look where it all began",
      beginningLabel: "A tiny beginning",
      heading: "It started with us.",
      story:
        "Two hearts, one sweet little beginning, and a lifetime of ordinary moments waiting to become our favorite memories.",
      handwrittenNote: "and somehow, here we are ♡",
      then: "Once upon a time",
      now: "Our forever",
      pageNumber: "01",
      continue: "Continue",
    },
  },
  seo: {
    title: "Loyed & Aneena | Wedding Invitation",
    description: "A modern wedding invitation for Loyed and Aneena — 22 November 2026, Kerala.",
    openGraphDescription: "Save the date — we're getting married on 22 November 2026.",
    ogImage: "/images/invitation-aneena.png",
    metadataBase: "https://wyvernstack.com",
    themeColor: "#30352B",
  },
  music: template3Defaults.music,
  gallery: {
    strips: [
      [
        { src: "/images/couple-gallery-3.webp", alt: "Aneena and Loyed at the beach" },
        { src: "/images/couple-gallery-2.webp", alt: "Aneena and Loyed walking together" },
        { src: "/images/couple-gallery-1.webp", alt: "Aneena and Loyed in the car" },
      ],
      [
        { src: "/images/couple-gallery-4.webp", alt: "Aneena and Loyed together" },
        { src: "/images/couple-gallery-5.webp", alt: "Aneena and Loyed with their dog" },
        { src: "/images/couple-gallery-6.webp", alt: "Aneena and Loyed walking on the beach" },
      ],
    ],
  },
  venueDetails: {
    events: {
      church: {
        label: "Church ceremony",
        title: "The Wedding",
        time: "3:00 PM",
        note: "Ceremony",
        venue: "St Francis Assisi Church, Thuruthipuram",
        mapUrl: "https://maps.app.goo.gl/owMGgWLTWnmmyMat9",
      },
      reception: {
        label: "Reception",
        title: "The Reception",
        time: "6:00 PM",
        note: "Evening",
        venue: "Infant Jesus Church Parish hall",
        mapUrl: "https://maps.app.goo.gl/FU5VgkeMbASUa4qz9",
      },
    },
    venue: {
      name: "St Francis Assisi Church, Thuruthipuram",
      address: "Complete Venue Address, Kerala, India",
      mapUrl: "https://maps.app.goo.gl/owMGgWLTWnmmyMat9",
    },
    palette: {
      title: "Colors of the wedding",
      colors: [
        { name: "Sand", hex: "#C9BEA7" },
        { name: "Stone", hex: "#D8D4C8" },
        { name: "Sage", hex: "#A3B18A" },
        { name: "Olive", hex: "#59674D" },
      ],
    },
  },
  calendar: {
    title: "Loyed & Aneena - The Wedding",
    description: "Join us as we celebrate the beginning of our forever.",
    location: "Wedding Venue, Complete Venue Address, Kerala, India",
    fileName: "Loyed-and-Aneena-Wedding.ics",
    uidHost: "loyedandaneena",
    prodId: "-//Loyed & Aneena//Wedding Invitation//EN",
    durationHours: 2,
    start: { year: 2026, month: 11, day: 22, hour: 18, minute: 0 },
    end: { year: 2026, month: 11, day: 22, hour: 20, minute: 0 },
    display: "22 November 2026 · 6:00 PM",
  },
  footer: {
    message: "Thank you for being part of our story.",
    instagramUrl: "https://instagram.com/yourcouplehandle",
    instagramHandle: "@yourcouplehandle",
    instagramAria: "Loyed and Aneena on Instagram",
    studioUrl: "https://wyvernstack.com",
    studioInstagramUrl: "https://www.instagram.com/wyvernstack?vrfl=Z2RyejQ1Mjh1eTV1",
    copyright: "© 2026 · Loyed & Aneena",
    closing: "With love, always.",
  },
  invitationAlt: "Loyed and Aneena wedding invitation",
  integrations: {
    rsvpUrl:
      "https://script.google.com/macros/s/AKfycbwNO2WaKdJ40OfmcaU1iCRr7DWtKOU_-b4WxH9UNZQW9QneOkL75qh5ghb7MRMJHcLy/exec",
    photoUrl:
      "https://script.google.com/macros/s/AKfycbw8uZY8yUtqIkhLTCcuiWBbxvYMyGwpb2180wQX1y3oRp-Q3HlPk_HDmid0LWV91XV3/exec",
  },
} satisfies Template3Config;

export const wedding3 = template3Schema.parse(wedding3Input);
