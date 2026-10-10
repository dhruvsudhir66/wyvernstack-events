/** Safe template behaviour. Customer copy is never defaulted. */
export const template2Defaults = {
  sections: { marquee: false },
  music: { enabled: true, volume: 0.65 },
} as const;
