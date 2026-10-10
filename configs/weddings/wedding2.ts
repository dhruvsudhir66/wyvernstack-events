import { template2Defaults } from "../../templates/template2/defaults.ts";
import { template2Schema, type Template2Config } from "../../templates/template2/schema.ts";

const wedding2Input = {
  template: "template2",
  slug: "aneena-bethrothal",
  couple: {
    bride: "Aneena",
    groom: "Loyed",
    brideFull: "Aneena Vincent",
    groomFull: "Loyed Varghese",
    joined: "Aneena & Loyed",
  },
  seo: {
    title: "Aneena & Loyed | Wedding",
    description: "Our Wedding.",
    icon: "/images/logo.png",
  },
  event: {
    displayDate: "15 November 2026",
    weekdayDate: "Sunday, 15 November 2026",
    compactNumeric: "15.11.2026",
    navDate: "15 · 11 · 2026",
    countdownIso: "2026-11-15T16:00:00+05:30",
    timezone: "Asia/Kolkata",
    location: "Kerala, India",
  },
  sections: { marquee: template2Defaults.sections.marquee },
  music: {
    src: "/music/red-velvet.mpeg",
    enabled: template2Defaults.music.enabled,
    volume: template2Defaults.music.volume,
  },
  assets: {
    logo: "/images/logo.png",
    hero: "/images/hero-blurred.webp",
    saveDate: "/images/save-date.webp",
    invitation: "/images/invitation.png",
    church: "/images/church-thuruthipuram.webp",
    storyPrimary: "/images/couple.webp",
    storySecondary: "/images/couple-2.webp",
  },
  people: [
    {
      role: "The bride",
      name: "Aneena Vincent",
      image: "/images/aneena.webp",
      family:
        "Daughter of Vincent & Lilly and sister to Alwin. A close-knit family rooted in love, faith, and togetherness.",
      work: "Works in technology, with a love for learning and creativity.",
    },
    {
      role: "The groom",
      name: "Loyed Varghese",
      image: "/images/loyed.webp",
      family:
        "Son of Varghese & Ancy, and brother to Leanda. Rooted in the love, memories, and values of the family that shaped him.",
      work: "Works as a Merchant Navy officer, travelling the seas while building a life grounded in family and purpose.",
    },
  ],
  story: {
    captionLabel: "Bethrothal",
    captionDate: "15 November 2026",
    paragraphs: [
      "Somewhere between then and now. It all started with a glance at church — a little eye contact that neither of us knew would become the beginning of our story. Then came an Instagram follow, a few messages, and conversations that slowly turned a familiar face into someone we couldn’t imagine not knowing. Then came the miles. With him at sea, we learned to love through long calls, quiet waits, missed moments, and precious reunions.",
      "The distance wasn’t always easy, but it made every moment together mean a little more. From that first glance to crossing oceans and countless little moments, we found our way to each other. And now, after all the waiting, we’re ready for the chapter where coming home means coming home to each other. A simple glance. A love across oceans. A lifetime together.",
    ],
  },
  gallery: [
    { src: "/images/gallery/couple-gallery-1.webp", alt: "Long Drives" },
    { src: "/images/gallery/couple-gallery-2.webp", alt: "Together" },
    { src: "/images/gallery/couple-gallery-3.webp", alt: "Waves & Tides" },
    { src: "/images/gallery/couple-gallery-4.webp", alt: "Date Nights" },
    { src: "/images/gallery/couple-gallery-5.webp", alt: "Celebration" },
    { src: "/images/gallery/couple-gallery-7.webp", alt: "Tea + Laughter" },
  ],
  venue: {
    churchImageAlt: "Church where the celebration begins",
    events: [
      {
        number: "01",
        type: "Bethrothal",
        time: "4:00 PM",
        place: "St Francis Assisi Church, Thuruthipuram",
        description:
          "We begin our betrothal surrounded by our families and loved ones, at the very place where we first met.",
        mapsUrl: "https://maps.app.goo.gl/owMGgWLTWnmmyMat9",
      },
      {
        number: "02",
        type: "Reception",
        time: "6:00 PM Onwards",
        place: "Infant Jesus Church Parish hall",
        description:
          "An evening of dinner, conversation, music, dancing, and celebrating together.",
        mapsUrl: "https://maps.app.goo.gl/FU5VgkeMbASUa4qz9",
      },
    ],
    colors: ["#C88C8D", "#B87880", "#edd9bc", "#9B6975", "#53015286"],
  },
  calendar: {
    title: "Aneena & Loyed — Wedding Day",
    start: "2026-11-15T00:00:00+05:30",
    end: "2026-11-16T00:00:00+05:30",
    location: "Kerala, India",
    description: "Save the date for Aneena & Loyed's wedding celebration.",
  },
  marquee: ["Aneena & Loyed", "15.11.2026", "Bethrothal", "Forever starts here"],
  footer: {
    eyebrow: "Until forever",
    creditUrl: "https://wyvernstack.com",
    creditLabel: "wyvernstack.com",
    copyright: "© 2026 Wyvernstack",
  },
  integrations: {
    rsvpUrl:
      "https://script.google.com/macros/s/AKfycbxRiGkA8_39HVV6Irzm59olEsI9YJbHq-ExFd9cCBKbA9aYF0dnr8jtl8UYAyX6Aiv3wQ/exec",
    uploadUrl:
      "https://script.google.com/macros/s/AKfycbxJ2RQiVhs2-wJ0pjcJPRjFm-M3OmFiYUfqSptQBOC8nvH39UPRCtc4BFwAN1-kn--7/exec",
    wishesUrl:
      "https://script.google.com/macros/s/AKfycbx9DmkJuMlGaY0CR_ccaa3L2pLELRx24a-3TPN39GqTq1XYiKAlZVoESqVuk30VBvmG4A/exec",
  },
} satisfies Template2Config;

export const wedding2 = template2Schema.parse(wedding2Input);
