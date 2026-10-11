
import { template1Defaults } from "../../templates/template1/defaults.ts";
import {
  template1Schema,
  type Template1Config,
} from "../../templates/template1/schema.ts";

const wedding1Input = {
  template: "template1",
  slug: "paper-theme-demo",

  couple: {
    bride: "Isabella",
    groom: "Nathan",
    monogram: "I & N",
  },

  seo: {
    title: "Isabella & Nathan | Wedding Invitation",
    description:
      "A timeless wedding invitation in sage, olive, cream and warm earth tones.",
    openGraphDescription:
      "Join Isabella and Nathan as they begin their next chapter together on 14 February 2027, in Kochi.",
    ogImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
    metadataBase: "https://wyvernstack.com",
    themeColor: "#2f3524",
    manifestName: "Isabella & Nathan — Wedding",
    manifestShortName: "I & N",
  },

  event: {
    displayDate: "14 February 2027",
    compactDate: "14 · 02 · 2027",
    countdownIso: "2027-02-14T15:00:00+05:30",
    timezone: "Asia/Kolkata",
    location: "Kochi, Kerala",
    locationLine: "Kochi · 2027",
    nav: {
      day: "14",
      month: "02",
      year: "27",
    },
  },

  footer: {
    date: "14 February 2027",
    place: "Kochi · Kerala",
    instagramUrl: "https://instagram.com/",
    instagramHandle: "@yourcouplename",
  },

  venue: {
    date: "14 February 2027",
    time: "3:00 PM",
    name: "The Garden Estate",
    address: "Demo Venue, Fort Kochi, Kerala, India",
    mapsUrl: "https://maps.google.com/",
  },

  music: {
    src: "/music/Until_I_Found_You.mpeg",
    enabled: template1Defaults.music.enabled,
  },

  assets: {
    logo:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=85",
    paperTexture: "/crumpled-paper.jpg",
    countdownPaper: "/countdown-paper.jpg",
    hero:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1800&q=90",
    saveDate:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85",
  },

  profiles: {
    bride: {
      name: "Isabella",
      role: "The Bride",
      image:
        "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=900&q=85",
      page: "02",
      eyebrow: "Meet the bride",
      description:
        "A lover of quiet mornings, handwritten notes and flowers gathered from the garden. Isabella finds happiness in the little things and believes the most beautiful memories are the ones shared with the people she loves.",
      note: "She finds magic in the little things.",
      details: [
        { label: "Known for", value: "Her thoughtful heart" },
        { label: "Favourite", value: "Flowers and slow mornings" },
        { label: "Always", value: "Finding joy in the details" },
      ],
    },

    groom: {
      name: "Nathan",
      role: "The Groom",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
      page: "03",
      eyebrow: "Meet the groom",
      description:
        "A thoughtful soul with a love for good music, spontaneous road trips and long conversations. Nathan believes life is best enjoyed with a little adventure, a lot of laughter and the right person by his side.",
      note: "He makes every ordinary moment count.",
      details: [
        { label: "Known for", value: "His easygoing nature" },
        { label: "Favourite", value: "Music and road trips" },
        { label: "Always", value: "Making people smile" },
      ],
    },
  },

  gallery: {
    left: [
      {
        src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85",
        alt: "An elegant wedding celebration",
      },
      {
        src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=85",
        alt: "A romantic wedding moment",
      },
      {
        src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=900&q=85",
        alt: "A couple celebrating their love",
      },
    ],

    right: [
      {
        src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=85",
        alt: "An intimate wedding reception",
      },
      {
        src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85",
        alt: "Wedding flowers and celebration details",
      },
      {
        src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=85",
        alt: "A romantic wedding setting",
      },
    ],

    captionDate: "14 · 02 · 2027",
    volumeDate: "14 February 2027",
    sideLabel: "14 · 02 · 2027 · OUR STORY",
  },

  mobileNote: "a little moment, forever.",

  integrations: template1Defaults.integrations,
} satisfies Template1Config;

export const wedding1 = template1Schema.parse(wedding1Input);
