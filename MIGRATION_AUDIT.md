# Migration audit

Audit date: 9 October 2026. Source of truth is the code in the copied project folders, not the README files. Several READMEs describe earlier or different content than the components that actually render.

No `.env`, `.env.local`, or `.env.production` files were present. Only placeholder `.env.example` files exist. No secret values were found in source, and none are repeated here.

## Repository layout found

```text
wyvernstack-events/
├── CURSOR_MIGRATION_BRIEF.md
├── wedding-paper-theme/wedding-invitation/    Next.js app
├── wedding-pink-white/                        Next.js app (also contains its own .git)
└── wedding-sage-green/wedding-invitation/     Next.js app (also contains its own .git)
```

The consolidated application is added at the repository root. The three copied folders stay in place as references.

Proposed mapping:

| Public slug | Config | Template | Source folder |
| --- | --- | --- | --- |
| `wedding1` | `configs/weddings/wedding1.ts` | `template1` | `wedding-paper-theme/wedding-invitation` |
| `wedding2` | `configs/weddings/wedding2.ts` | `template2` | `wedding-pink-white` |
| `wedding3` | `configs/weddings/wedding3.ts` | `template3` | `wedding-sage-green/wedding-invitation` |

## Package managers and framework versions

All three apps are Next.js App Router, React 19, TypeScript, Tailwind CSS 4 via `@tailwindcss/postcss`. None declare a `packageManager` field. None have a `test` script. There is no `pages/` router, no middleware, and no `output: "export"`.

| | Paper theme | Pink / white | Sage green |
| --- | --- | --- | --- |
| `package.json` name | `loyed-aneena-wedding` | `wedding-invitation` | `wedding-invitation` |
| Package manager | npm. `package-lock.json` lockfileVersion 3 is present, but that project's `.gitignore` ignores `package-lock.json` | npm scripts. No lockfile in the copy | npm scripts. No lockfile in the copy (`.gitignore` does not ignore lockfiles) |
| Next | `16.3.5` | `16.3.5` | `16.3.5` |
| React / React DOM | `19.3.0` | `19.3.0` | `19.3.0` |
| TypeScript | `^5.9.3` | `^5.9.3` | `^5.9.3` |
| Tailwind | `^4.1.13` | `^4.1.13` | `^4.1.14` |
| Framer Motion | `^12.23.12` | `^12.23.12` | `^13.4.6` |
| lucide-react | `^0.468.0` | `^0.468.0` | `^1.49.0` declared, not imported by any component |
| Other runtime deps | `zod ^4.0.5`, `resend ^6.1.0`, `@aws-sdk/client-s3` and `@aws-sdk/s3-request-presigner ^3.864.0` | `lenis ^1.3.11` | none beyond the shared UI stack |
| ESLint | `eslint ^9` + `eslint-config-next 16.3.5`, flat config | `lint` script is `next lint`, but ESLint is not a dependency and there is no ESLint config | `eslint ^9` + `eslint-config-next 16.3.5`, flat config |
| Path alias | `@/*` → `./*` | `@/*` → `./*` | `@/*` → `./*` |

Root application dependency choice: Next `16.3.5`, React `19.3.0`, Tailwind `4.1.14`, TypeScript `5.9.3`, Framer Motion `12.23.12` (the API used by the sage components exists in v12; sage does not import lucide-react), lucide-react `0.468.0`, plus `lenis`, `zod`, `resend`, and the AWS SDK packages required by the paper integrations.

## Generated folders present at audit time

Safe to remove, and only inside the copied apps:

- `wedding-paper-theme/wedding-invitation/node_modules/`
- `wedding-paper-theme/wedding-invitation/.next/`
- `wedding-pink-white/node_modules/`
- `wedding-pink-white/.next/`
- `wedding-sage-green/wedding-invitation/node_modules/`
- `wedding-sage-green/wedding-invitation/.next/`
- `wedding-sage-green/wedding-invitation/tsconfig.tsbuildinfo`

`npx tsc --noEmit` in the paper and pink apps also wrote a `tsconfig.tsbuildinfo` beside those projects because `incremental` is enabled. Those build-info files are generated and are removed with the cleanup.

Not removed: source, `public/`, lockfile, configs, nested `.git` directories, `.agents`, `.cursor`.

No `out/`, `dist/`, `build/`, `.turbo/`, `.cache/`, or `coverage/` directories were present.

## Baseline checks

Commands were run in each source app before the root app replaced them. Node `v24.21.0`, npm `11.19.0`.

| Check | Paper theme | Pink / white | Sage green |
| --- | --- | --- | --- |
| `npx tsc --noEmit` | Exit 0 | Exit 0 | Exit 0 |
| `npm run lint` | Exit 0. 11 warnings, 0 errors (`no-img-element`, unused vars) | Exit 1. `next lint` failed immediately: `Invalid project directory provided, no such directory: ...\wedding-pink-white\lint`. Next 16 does not accept that script the way this `package.json` calls it, and ESLint is not installed | Exit 1. 6 errors, 5 warnings. Errors are `react-hooks/set-state-in-effect` in modal effects (`CalendarModal.tsx`, `PhotoCaptureModal.tsx`, `RSVPModal.tsx`, and the same pattern reported in that run). Warnings include unused vars and `no-img-element` |
| `npm run build` | Recorded at the end of this file after the command finished | Same | Same |
| Tests | No test script | No test script | No test script |

These lint failures belong to the original copies. They are not treated as migration regressions.

## Template 1 — paper theme

Single route: `app/page.tsx` renders `WeddingInvitation`.

Live section order after the visitor opens the invitation:

1. Save the date gate (`SaveTheDate`) with music start
2. Fixed paper navigation, active section tracking, mute control
3. `Hero` (includes its own countdown to `2026-11-22T00:00:00+05:30`)
4. `MeetTheCouple`
5. `Journal` (this is the live story, not `OurStory`)
6. `Gallery`
7. `Venue`
8. `RSVP`
9. `GuestUpload`
10. `Footer`

`PaperSeam` sits between those sections. `PaperFold`, `components/sections/OurStory.tsx`, and `components/sections/Countdown.tsx` are not imported by the live page. The unused countdown targets `2027-04-17T16:00:00+05:30`. The live footer prints **17 April 2027** and **Ernakulam · Kerala**, while the hero, gallery, nav, and venue print **22 November 2026**. Those conflicting dates are preserved as separate config fields.

Customer content to configure:

- Couple names on the invitation: Loyed and Aneena. Monogram asset `public/images/logo.png`. Manifest name is the different string `Aneena & Abin — Wedding` (short name `A & A`).
- Placeholder bios in `MeetTheCouple` for Aneena and Loyed, including the "Known for / Favourite / Always" lines. They are still placeholders in the source and must stay placeholders.
- Venue block: date `22 November 2026`, time `4:00 PM`, venue `Venue Name`, address `Full venue address, Ernakulam, Kerala`, maps URL `YOUR_GOOGLE_MAPS_LINK`.
- Gallery strips `couple-gallery-1.webp` through `couple-gallery-6.webp` with the existing alt text. `couple-gallery-7.webp` is in `public/` but not referenced.
- Music `/music/Until_I_Found_You.mpeg` (about 2.3 MB), starts when the invitation opens, mute toggle, loop. Playback failures are swallowed.
- Footer Instagram `https://instagram.com/aneenaandloyed` and handle `@aneenaandloyed`.
- SEO from `app/layout.tsx`: title `Our Wedding | Save the Date`, the sage/olive description, `metadataBase` `https://example.com`, theme color `#2f3524`.
- Local font `public/fonts/NestaMastone.ttf`. Google fonts loaded from CSS: Cormorant Garamond, DM Sans, Italianno.
- Paper textures: `crumpled-paper.jpg`, `countdown-paper.jpg`, `save-date.webp`, `hero-cropped.jpeg`. `crumpled-newspaper.jpg` and `hero.jpeg` are in `public/` and are copied even though the current components do not reference them. `design-reference/` is a mood board, not a runtime asset.

Design behaviour that stays in the template: torn-paper clip paths, olive/cream palette, grain overlays, scroll spy, mobile menu, paper seams.

### Integrations

- `POST /api/rsvp` JSON body: `name`, `email`, `guests` (1–6), `attendance`, optional `message`. Validated with Zod. Sends mail through Resend. Returns 503 when email is not configured.
- `POST /api/upload` JSON body: `fileName`, `contentType` (`image/jpeg`, `image/png`, or `image/webp`), `guestName`. Returns a 5-minute S3 presigned PUT. Object key prefix `wedding-uploads/`. Client then PUTs the file to that URL. The UI keeps at most 6 photos. `S3_PUBLIC_BASE_URL` is named in `.env.example` and the README, but the route does not read it.
- Greeting card in the upload section copies a share link. It does not call an API.
- Security headers in `next.config.ts`: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`.

Environment variable names: `RESEND_API_KEY`, `RSVP_TO_EMAIL`, `RSVP_FROM_EMAIL`, `S3_REGION`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_PUBLIC_BASE_URL` (unused by code).

These routes need a server. Static export is not valid for this template.

## Template 2 — pink / white

Single route: `app/page.tsx` renders `WeddingExperience`. `SmoothScroll` (Lenis) wraps the page from the root layout.

Live order after open:

1. Save the date gate, then start `/music/red-velvet.mpeg` at volume 0.65
2. `Nav`, `Hero`, `Countdown` (target `2026-11-15T11:00:00+05:30`)
3. `Marquee` is imported and then commented out, so it does not render
4. `Couple`, `Story`, `Gallery`, `Venue`, `RSVP`, `Upload`, `Footer`
5. Fixed mute button. Audio pauses when the tab is hidden.

`InvitationAndGreetings.tsx` is not imported. `public/music/kasoor.mpeg` (about 7.9 MB) is not referenced. `red-velvet.mpeg` is about 1.1 MB. Both music files are copied.

Customer content:

- Aneena Vincent and Loyed Varghese. Display date Sunday, 15 November 2026. Location copy uses Kerala, India.
- Bride family/work and groom family/work paragraphs in `Couple.tsx`.
- Story photos `/images/couple.webp` and `/images/couple-2.webp`, caption `Bethrothal` / `15 November 2026`, and the two story paragraphs about church, Instagram, and the merchant-navy distance.
- Gallery of six photos (`couple-gallery-1` through `5`, then `7`) with captions Long Drives, Together, Waves & Tides, Date Nights, Celebration, Tea + Laughter. Layout classes stay in the template.
- Venue events, including the source spelling `Bethrothal`:
  - 4:00 PM, St Francis Assisi Church, maps `https://maps.app.goo.gl/owMGgWLTWnmmyMat9`
  - 6:00 PM Onwards, Infant Jesus Church Parish hall, maps `https://maps.app.goo.gl/FU5VgkeMbASUa4qz9`
  - Church photo `/images/church-thuruthipuram.webp`
  - Colour chips `#C88C8D`, `#B87880`, `#edd9bc`, `#9B6975`, `#53015286`
- RSVP calendar event: title `Aneena & Loyed — Wedding Day`, start `2026-11-15T00:00:00+05:30`, end `2026-11-16T00:00:00+05:30`, location `Kerala, India`.
- Footer credit links to `https://wyvernstack.com` and `© 2026 Wyvernstack`.
- SEO title `Aneena & Loyed | Wedding`, description `Our Wedding.`, icon `/images/logo.png`.
- Fonts: Playfair Display and DM Sans through `next/font`.
- Palette in CSS: dusty pink `#c9aaa7`, light pink `#ead3d0`, off-white `#f7f3ed`, sage `#a9b0a0`, terracotta `#d9a070`.

`next.config.ts` allows `images.unsplash.com`, but no component references Unsplash. The README's "Anee & James" and dummy-image instructions do not match the rendered site.

### Integrations

All three endpoints are public Google Apps Script web-app URLs already shipped in client code. They stay in wedding config because they are public by nature. Payload shapes stay the same.

- RSVP `POST` `application/x-www-form-urlencoded`: `type=rsvp`, `name`, `attendance`, `note`. Response JSON must have `success`.
- Photo upload: hidden iframe form POST fields `image` (data URL), `mimeType=image/jpeg`, `fileName`. Images are resized to a 1400px max edge at JPEG quality 0.78, then also saved on the visitor's device. The script URL is the first constant in `Upload.tsx`.
- Wishes `POST` form body: `type=wish`, `name`, `message`. Response JSON must have `success`. Second URL in `Upload.tsx`.

No environment variables.

## Template 3 — sage green

`config/wedding.ts` already holds part of the save-the-date and hero copy. Many later sections still hardcode the same couple.

Live page:

1. `SaveTheDate` (fixed overlay). Open dispatches `wedding:open-invitation`.
2. `WeddingMainContent` resets scroll, then reveals Hero, Countdown, Meet the Bride, Meet the Groom, Our Story, Gallery, Venue, Footer.
3. `WeddingAudio` plays `/music/song.mpeg` (about 1.1 MB) at volume 0.55, loop, mute button. Starts on the open event.

`components/Couple.tsx` is not mounted. The README says only the save-the-date chapter exists; that is out of date.

Customer content already in `config/wedding.ts`, preserved verbatim:

- Couple: Loyed, Aneena
- Date display `22 / 11 / 2026`, weekday Sunday, location Kerala, India
- Assets: `/images/couple-holding-hands.webp`, `/images/hero-collage.webp`
- Theme colours: save-date/hero background `#e4d5bd`, hero text `#34342D`, browser `#30352b`
- Save-the-date and hero copy, including `and somehow, here we are ♡`
- SEO title `Save the Date | Wedding Invitation`, description `A modern, editorial wedding invitation.`
- `venue: "Church"`

Additional content still hardcoded, moved into the template 3 schema:

- Countdown target `2026-11-22T00:00:00+05:30`. Calendar grid labels November 2026 and highlights day 22. `calendarDays` is a 30-day November grid.
- Bride photos `bride-5.webp`, `bride-2.webp`, `bride-4.webp`. Groom photos `loyed.webp`, `groom-4.webp`, `groom-3.webp`.
- Story photos `couple-gallery-6.webp` and `childhood-couple.webp`.
- Gallery alts for gallery images 3, 2, 1 and 4, 5, 6.
- Venue/events: church ceremony 3:30 PM at `Church` with map URL `PASTE_CHURCH_GOOGLE_MAPS_LINK_HERE`; reception 6:00 PM at `Wedding Venue` with `PASTE_RECEPTION_GOOGLE_MAPS_LINK_HERE`; address `Complete Venue Address, Kerala, India`; palette Sand `#C9BEA7`, Stone `#D8D4C8`, Sage `#A3B18A`, Olive `#59674D`.
- Calendar event `Loyed & Aneena - The Wedding`, 22 November 2026 18:00–20:00, ICS file `Loyed-and-Aneena-Wedding.ics`. The on-screen calendar line includes `22 November 2026 · 6:00 PM`.
- Invitation image `/images/invitation-aneena.png`.
- Footer: `Thank you for being part of our story.`, Instagram `https://instagram.com/yourcouplehandle` and `@yourcouplehandle`, Wyvernstack links including the existing Instagram URL, copyright `© 2026 · Loyed & Aneena`.
- Fonts: Cormorant Garamond, Allura, DM Sans. `SaveTheDate` and the unused `Couple` component also call `next/font` themselves.

### Integrations

- RSVP modal: `POST` with `mode: "no-cors"` and `Content-Type: application/x-www-form-urlencoded`. Fields: `name`, `attending` (`Yes` or `No`), `message`, `submittedAt` ISO timestamp. The response is not read, because `no-cors` hides it. Success is assumed when `fetch` resolves.
- Photo modal: camera capture, resized to max 1600px, JPEG quality 0.82. `POST` `no-cors` with `Content-Type: text/plain;charset=utf-8` and a JSON string `{ type: "wedding_photo", photo, submittedAt }`. One photo per submission.
- `.env.example` only names `NEXT_PUBLIC_SITE_URL`. No component reads it.

The Apps Script URLs differ from template 2. They must not be merged.

## Conflicts between the projects

- Same couple names appear on all three sites, but the dates differ: paper shows both 22 November 2026 and 17 April 2027, pink uses 15 November 2026, sage uses 22 November 2026. They stay independent.
- Paper manifest says Aneena & Abin. The visible paper invitation says Loyed & Aneena.
- Global CSS (`body`, `:root`, `.font-display`, `.font-script`) would collide if the three stylesheets were imported globally. Each template scopes its CSS under `.template-paper`, `.template-pink`, or `.template-sage`.
- Paper script font is Italianno. Sage script font is Allura. Pink display font is Playfair. Sage/paper display font is Cormorant.
- Framer Motion major ranges differ (12 vs 13). The root app uses 12.23.12.
- Only the paper theme has server route handlers. The combined app therefore cannot be a static export.
- `metadataBase` of `https://example.com` is the paper site's real current value, not a placeholder invented during migration.
- Asset filenames collide (`logo.png`, gallery webps, `aneena`/`loyed`). Each wedding gets `public/weddings/<slug>/`.
- Pink and sage each contain a nested `.git`. Those directories are left untouched. This repository root was not treated as those git histories.

## Deployment conclusion

Use Next.js `basePath: "/events"` and `trailingSlash: true`. The Cloudflare route should forward `wyvernstack.com/events` and `wyvernstack.com/events/*` with the `/events` prefix intact. Stripping the prefix would make Next look up `/wedding1` while the app expects `/events/wedding1`, or it would apply the prefix twice if both sides add it.

`next/link` and `next/image` receive paths without `/events`. Raw `<img>`, `<audio>`, CSS `url()`, `new Audio()`, and `fetch("/api/...")` must add `/events` themselves.

Do not add a root catch-all. The company site keeps `https://wyvernstack.com/`. This app only owns `/events`.

Recommended host: Cloudflare Workers with the OpenNext Cloudflare adapter, because template 1 uses Route Handlers, the Resend SDK, and the AWS SDK. Cloudflare Pages static export would drop RSVP email and presigned uploads. Exact settings are in `DEPLOYMENT.md`. DNS and the existing company-site project are not changed from this repository.

## Migration risks

- Paper date fields disagree with each other. Unifying them would change the current invitation.
- Google Apps Script calls are client-side and depend on each script's CORS behaviour. A URL that works in the browser can still fail if the script deployment or Google account changes. This migration does not call those URLs.
- Template 1 RSVP and S3 uploads stay unconfigured until the environment variables are set on the server. The UI already handles the 503 response.
- One Resend inbox and one S3 bucket are global environment variables, matching the original single-site app. A second customer on template 1 would share that inbox and `wedding-uploads/` prefix until per-wedding server secrets are added. That limit is documented in `DEPLOYMENT.md`.
- Large audio files (`kasoor.mpeg` is unused but copied, about 7.9 MB; `Until_I_Found_You.mpeg` about 2.3 MB) will be part of the static asset set.
- Windows vs Linux path case: public paths keep the source filename casing.
- Visual parity was not pixel-measured in a browser during the audit. See the verification section of the final report.
- Nested `node_modules` must not be bundled. The root `tsconfig` excludes the three source folders.

## Baseline build results

`npm run build` was run in each source app before the root application was built. Next.js 16.3.5 (Turbopack). All three exited 0.

| App | Result |
| --- | --- |
| `wedding-paper-theme/wedding-invitation` | Exit 0 |
| `wedding-pink-white` | Exit 0 |
| `wedding-sage-green/wedding-invitation` | Exit 0 |

No test script exists in any source app, so no source tests were run.

## Cleanup

After the baseline commands above, these generated items were removed from the copied source folders only:

- `wedding-paper-theme/wedding-invitation/node_modules/`
- `wedding-paper-theme/wedding-invitation/.next/`
- `wedding-paper-theme/wedding-invitation/tsconfig.tsbuildinfo` if present
- `wedding-pink-white/node_modules/`
- `wedding-pink-white/.next/`
- `wedding-pink-white/tsconfig.tsbuildinfo` if present
- `wedding-sage-green/wedding-invitation/node_modules/`
- `wedding-sage-green/wedding-invitation/.next/`
- `wedding-sage-green/wedding-invitation/tsconfig.tsbuildinfo`

Source files, `public/`, lockfiles, nested `.git` directories, and `.env.example` files were kept.
