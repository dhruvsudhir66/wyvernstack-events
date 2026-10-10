# Theme and client map

The template is the look. The wedding file is the client. A new client reuses a template by adding another `configs/weddings/*.ts` and pointing `template` at `template1`, `template2`, or `template3`.

Public URLs use the `slug` field, not the filename. Locally that is `/events/<slug>/`.

## Templates and how to tell them apart

| Template | Theme | CSS scope | Tell it apart by |
| --- | --- | --- | --- |
| `template1` | Paper | `.template-paper` | Cream paper (`#f2ede2`) with a crumpled grain, torn paper edges between sections, olive ink (`#596041`), and the Nesta Mastone script. Browser chrome is dark olive `#2f3524`. |
| `template2` | Pink / white | `.template-pink` | Dusty pink (`#c9aaa7`) on off-white (`#f7f3ed`), Playfair headlines, no torn paper. The page opens on a blush save-the-date, not a paper card. |
| `template3` | Sage | `.template-sage` | Sand save-the-date (`#e4d5bd`) on an olive page, Allura script, and a small floral mark. Browser chrome is olive `#30352b`. The date is written with slashes, `22 / 11 / 2026`. |

Fonts that only appear on one theme: Nesta Mastone and Italianno on paper, Playfair on pink, Allura on sage. Cormorant and DM Sans are shared.

## Which wedding file is which client

| File | Client | Event | Template | Slug | Path |
| --- | --- | --- | --- | --- | --- |
| `configs/weddings/wedding1.ts` | Loyed & Aneena (manifest still says Aneena & Abin) | Wedding, 22 November 2026. Footer still prints 17 April 2027, Ernakulam | Paper (`template1`) | `wedding1` | `/events/wedding1/` |
| `configs/weddings/wedding2.ts` | Aneena Vincent & Loyed Varghese | Bethrothal, 15 November 2026, Thuruthipuram | Pink (`template2`) | `aneena-bethrothal` | `/events/aneena-bethrothal/` |
| `configs/weddings/wedding3.ts` | Loyed & Aneena | Wedding, 22 November 2026, Kerala | Sage (`template3`) | `loyed-aneena-wedding` | `/events/loyed-aneena-wedding/` |

`wedding2.ts` is the Aneena betrothal site. `wedding3.ts` is the Loyed & Aneena wedding site. `wedding1.ts` is the same couple on the paper theme, and its filename is only a template index.

## Naming rule for the next client

Name the file after the client and the event, and set `slug` to the same words. The template number stays inside the file.

```text
configs/weddings/aneena-loyed-bethrothal.ts   template: "template2"   slug: "aneena-loyed-bethrothal"
configs/weddings/loyed-aneena-wedding.ts      template: "template3"   slug: "loyed-aneena-wedding"
```

`wedding1.ts`, `wedding2.ts`, and `wedding3.ts` stay as they are so existing slugs do not move. New clients should not get the next number.
