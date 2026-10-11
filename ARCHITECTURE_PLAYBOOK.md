# Wyvernstack Events — Architecture Playbook

Use this document to add **new clients (weddings)** or **new templates (designs)** to this repo, including work started in a separate Next.js project elsewhere. It matches how `wedding1`, `wedding2`, and `wedding3` are built today.

For deployment and Cloudflare routing, see [DEPLOYMENT.md](./DEPLOYMENT.md). For which file maps to which client, see [THEME_CLIENT_MAP.md](./THEME_CLIENT_MAP.md).

---

## 1. Mental model

| Concept | What it is | Where it lives |
|--------|------------|----------------|
| **App** | One Next.js site for all invitations | Repository root |
| **Template** | A reusable **design** (paper, pink, sage, …) | `templates/templateN/` |
| **Wedding / client** | One couple’s **content** (names, dates, images, URLs) | `configs/weddings/<name>.ts` |
| **Slug** | Public URL segment (not the config filename) | `slug` field in config → `/events/<slug>/` |

**Rule:** A new couple using an **existing** design = new config + assets only.  
A **new look** = new folder under `templates/` + wire-up in `core/`.

```
Visitor → /events/<slug>/ → app/[slug]/page.tsx → registry → template-resolver → templates/templateN/Template.tsx
```

The listing page at `/events/` is `app/page.tsx` and reads every wedding from `core/registry.ts`.

---

## 2. Repository layout

```text
wyvernstack-events/
├── app/
│   ├── layout.tsx              # Root layout, shared Google fonts
│   ├── page.tsx                # /events/ — wedding index
│   ├── not-found.tsx
│   ├── [slug]/page.tsx         # Every invitation URL (metadata + template)
│   └── api/
│       ├── rsvp/route.ts       # Template 1 email RSVP (Resend)
│       └── upload/route.ts     # Template 1 S3 presigned upload
├── configs/weddings/           # One file per client (parsed with Zod)
├── core/
│   ├── registry.ts             # List of all weddings
│   ├── template-resolver.tsx   # template id → React tree
│   └── wedding-base.ts         # Shared TypeScript types
├── components/                 # Cross-template utilities (e.g. wedding-media)
├── lib/
│   ├── base-path.ts            # /events prefix (must match next.config)
│   ├── assets.ts               # Per-slug public file URLs
│   ├── site-url.ts             # Production origin for OG URLs
│   ├── seo-schema.ts           # Shared seo fields (WhatsApp / Open Graph)
│   └── wedding-metadata.ts     # buildWeddingMetadata()
├── public/weddings/<slug>/     # Static files per client (images, audio, fonts)
├── templates/templateN/
│   ├── schema.ts               # Zod schema = config shape
│   ├── defaults.ts             # Non-customer defaults only (music on/off, etc.)
│   ├── context.tsx             # useTemplateN() hook
│   ├── Template.tsx            # Entry: provider + scope + root class
│   ├── styles/template.css     # Scoped under .template-* 
│   └── components/             # UI for this design only
├── tests/weddings.test.mts     # Slugs, assets exist, base path
├── next.config.ts              # basePath: /events, trailingSlash: true
└── .env.example                # Server secrets (Resend, S3, SITE_URL)
```

---

## 3. Routing and `/events` base path

Configured in `next.config.ts`:

- `basePath: "/events"`
- `trailingSlash: true`

**Public URLs:**

| Path | File |
|------|------|
| `https://wyvernstack.com/events/` | `app/page.tsx` |
| `https://wyvernstack.com/events/wedding1/` | `app/[slug]/page.tsx` |
| `https://wyvernstack.com/events/api/rsvp/` | `app/api/rsvp/route.ts` |

**Rules when writing code:**

1. **`next/link`** — use paths **without** `/events` (Next adds `basePath`): `href="/wedding1/"` or `href={`/${slug}/`}`.
2. **Raw `fetch`, `<img>`, `<audio>`, CSS `url()`** — use `mediaUrl(slug, path)` or `withBasePath("/api/...")` from `lib/`.
3. **Config asset paths** — always **relative to** `public/weddings/<slug>/`, e.g. `"/images/hero.webp"` (not `/weddings/...` unless you intentionally pass a full public path).
4. **Do not** strip `/events` in Cloudflare; do not add `/events` twice in the Worker.

`generateStaticParams()` in `app/[slug]/page.tsx` builds one static page per registered slug at build time.

---

## 4. Add a new client (existing template)

Example: new betrothal site using **template2** (pink).

### Step 1 — Choose slug and filename

- **Slug:** URL-safe, lowercase, hyphens — e.g. `shreya-rohan-bethrothal`.
- **File:** `configs/weddings/shreya-rohan-bethrothal.ts` (name after client/event, not `wedding4` unless you want that style).

### Step 2 — Copy a config shape

1. Open the template you need: `configs/weddings/wedding2.ts` for template2, `wedding1.ts` for template1, `wedding3.ts` for template3.
2. Copy the whole `weddingNInput` object.
3. Set `template: "template2"` (or `template1` / `template3`).
4. Set `slug: "shreya-rohan-bethrothal"`.
5. Replace couple names, dates, venue, copy, colors, integration URLs, and every string field.

### Step 3 — Assets

Create:

```text
public/weddings/shreya-rohan-bethrothal/
├── images/
├── music/          # if used
└── fonts/          # only if this client has custom fonts
```

Mirror paths used in the config (`/images/logo.png` → file at `public/weddings/<slug>/images/logo.png`).

### Step 4 — SEO block (required for link previews)

Every wedding config includes `seo` (from `lib/seo-schema.ts`):

```ts
seo: {
  title: "Shreya & Rohan | Betrothal",
  description: "…",                    // meta description
  openGraphDescription: "…",           // WhatsApp / social card line
  ogImage: "/images/og-share.jpg",     // prefer ~1200×630 JPEG, <300KB
  ogImageWidth: 1200,                  // optional but helpful
  ogImageHeight: 630,
  metadataBase: "https://wyvernstack.com", // optional if NEXT_PUBLIC_SITE_URL is set
  // template2 also: icon: "/images/logo.png"
  // template1 also: themeColor, manifestName, manifestShortName
  // template3 also: themeColor
},
```

Add `og-share.jpg` under the client’s `images/` folder for reliable WhatsApp previews.

### Step 5 — Validate at build time

End the config file with:

```ts
} satisfies Template2Config;  // or Template1Config / Template3Config

export const shreyaRohanBethrothal = template2Schema.parse(weddingInput);
```

Fix any Zod errors — missing fields fail the build on purpose.

### Step 6 — Register

In `core/registry.ts`:

```ts
import { shreyaRohanBethrothal } from "../configs/weddings/shreya-rohan-bethrothal.ts";

export const weddings = [wedding1, wedding2, wedding3, shreyaRohanBethrothal] as const;
```

### Step 7 — Verify

```bash
npm run typecheck
npm test
npm run build
```

Open locally: `http://localhost:3000/events/shreya-rohan-bethrothal/`

Update `tests/weddings.test.mts` if you rely on fixed slug lists in tests.

### Step 8 — Deploy

Redeploy the same Worker; URL is live at `/events/<slug>/`. No new template code required.

---

## 5. Integrations by template

| Template | RSVP | Photos / wishes |
|----------|------|------------------|
| **template1** | `POST` to `withBasePath("/api/rsvp")` — needs Resend env vars on Worker | `POST` to `withBasePath("/api/upload")` then S3 PUT — needs S3 env vars |
| **template2** | Google Apps Script URL in `integrations.rsvpUrl` | `integrations.uploadUrl`, `integrations.wishesUrl` |
| **template3** | `integrations.rsvpUrl` (Google Apps Script) | `integrations.photoUrl` (Google Apps Script) |

Put **per-client** script URLs in that client’s config. Keep request shape the same as the template component already sends (copy from an existing wedding’s config).

Template 1 paths in config use **relative API paths** (`/api/rsvp`), not full URLs — see `templates/template1/defaults.ts`.

---

## 6. Add a new template (new design)

Use this when you built a site elsewhere or need a fourth distinct look.

### Phase A — Plan the config contract

1. List every piece of **customer-specific** text, images, colors, and URLs on the design.
2. Group them into a single TypeScript object shape.
3. Define that shape in `templates/template4/schema.ts` using **Zod** (copy structure from `template2/schema.ts`).
4. Import shared SEO fields:

   ```ts
   import { weddingShareSeoSchema } from "../../lib/seo-schema.ts";

   seo: weddingShareSeoSchema.extend({
     // template-only seo fields, e.g. icon, themeColor
   }),
   ```

5. Add `template: z.literal("template4")` and `slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)`.

**Do not** put real couple names or dates in `defaults.ts` — only safe toggles (e.g. `music.enabled`).

### Phase B — Create the template folder

```text
templates/template4/
├── schema.ts
├── defaults.ts
├── context.tsx       # createContext + useTemplate4()
├── Template.tsx      # "use client"; provider; WeddingAssetScope; root class
├── styles/template.css
└── components/       # migrated UI
```

**`Template.tsx` checklist:**

- `"use client"` if it uses hooks or browser APIs.
- Wrap with `Template4Provider value={wedding}`.
- Wrap with `<WeddingAssetScope slug={wedding.slug}>`.
- Root wrapper class unique to this theme (e.g. `template-gold`) for CSS scoping.
- Import `./styles/template.css`.
- Pass `wedding` prop typed as `Template4Config` from parent (resolver).

**`context.tsx` pattern:** same as `templates/template1/context.tsx` — throw if hook used outside provider.

### Phase C — Port UI from another project

1. Copy **components** into `templates/template4/components/`.
2. Replace hard-coded copy with `useTemplate4()` (or props from config).
3. Replace image paths:
   - Prefer `<WeddingImage>` / `<WeddingImg>` / `<WeddingAudio>` from `@/components/wedding-media` inside `WeddingAssetScope`.
   - Or `mediaUrl(wedding.slug, configPath)` for CSS backgrounds and inline styles.
4. Replace `fetch("/api/...")` with either:
   - `withBasePath("/api/...")` for this app’s routes, or
   - `wedding.integrations.*` full URLs for Google Apps Script (like template2/3).
5. Move global styles into `styles/template.css`; scope selectors under `.template-gold` (or your class) so themes do not clash.
6. Fonts:
   - Shared fonts: add to `app/layout.tsx` if used on every page.
   - Template-only fonts: put files in `public/weddings/<slug>/fonts/` or load in template CSS with `mediaUrl` — avoid polluting other templates.

7. Delete or avoid duplicate `layout.tsx` metadata from the old project — metadata for invitations is built in `app/[slug]/page.tsx` via `buildWeddingMetadata()`.

### Phase D — Wire the app core

1. **`core/wedding-base.ts`**
   - Add `"template4"` to `TemplateId`.
   - Import `Template4Config` and add to `WeddingConfig` union.

2. **`core/template-resolver.tsx`**
   - Import `Template4`.
   - Add `case "template4": return <Template4 wedding={wedding} />`.

3. **`core/registry.ts`**
   - `isTemplateId()` must include `"template4"` if you use that helper.

4. **First config** — `configs/weddings/<client>.ts` with `template: "template4"` and `template4Schema.parse(...)`.

5. **Assets** — `public/weddings/<slug>/...`

### Phase E — Quality gates

- [ ] No raw `/images/...` in JSX without `mediaUrl` / wedding media components (breaks under `/events`).
- [ ] No secrets in config (script URLs are public; API keys only in Worker env).
- [ ] `seo.ogImage` file exists and is reasonably small for WhatsApp.
- [ ] `npm run typecheck && npm test && npm run build` pass.
- [ ] Compare desktop + mobile with the original design.

---

## 7. Template anatomy (reference)

### `schema.ts`

- Single source of truth for what a wedding JSON **may** contain.
- Exported types: `export type TemplateNConfig = z.infer<typeof templateNSchema>`.
- Config files use `satisfies TemplateNConfig` + `.parse()` so mistakes fail at import time.

### `defaults.ts`

- Shared **non-content** defaults merged in config via spread, e.g. `music: template2Defaults.music`.
- Never default bride/groom names, dates, or asset paths.

### Components

- Read config only through context hook or explicit props — not by importing another wedding’s config file.
- Section order lives in the template’s main experience component (e.g. `WeddingInvitation.tsx`, `WeddingExperience.tsx`).

### Shared media helpers (`components/wedding-media.tsx`)

| Export | Use |
|--------|-----|
| `WeddingAssetScope` | Required ancestor for slug-aware media |
| `WeddingImage` | `next/image`, unoptimized, basePath-safe |
| `WeddingImg` | Plain `<img>` |
| `WeddingAudio` | `<audio src=...>` |

---

## 8. Metadata and social sharing

| Page | Controlled by |
|------|----------------|
| Each invitation | `generateMetadata` in `app/[slug]/page.tsx` → `buildWeddingMetadata(wedding)` |
| `/events/` index | `export const metadata` in `app/page.tsx` |
| Fallback site title | `app/layout.tsx` |

Per-wedding fields: `configs/weddings/*.ts` → `seo` block.  
Logic: `lib/wedding-metadata.ts`.  
Production origin: `NEXT_PUBLIC_SITE_URL` or `seo.metadataBase`.

After deploy, refresh WhatsApp/Facebook cache: [Sharing Debugger](https://developers.facebook.com/tools/debug/).

---

## 9. Environment variables

See `.env.example`. Summary:

| Variable | Used by |
|----------|---------|
| `RESEND_API_KEY`, `RSVP_TO_EMAIL`, `RSVP_FROM_EMAIL` | Template 1 RSVP |
| `S3_*` | Template 1 guest upload |
| `NEXT_PUBLIC_SITE_URL` | Canonical and `og:image` absolute URLs |

Set on the **Cloudflare Worker**, not in client bundles. Template 2/3 Google Script URLs live in config files.

---

## 10. Testing

`tests/weddings.test.mts` checks:

- Registered slugs are unique.
- Referenced files under `public/` exist for each config path.
- `mediaUrl` applies `/events` exactly once.

When adding a wedding, run `npm test` — if a path is wrong, the test prints the missing disk path.

---

## 11. Naming conventions

| Item | Convention |
|------|------------|
| Template id | `template1`, `template2`, … stable forever |
| Config file | Client + event: `loyed-aneena-wedding.ts` |
| Slug | Same as URL: `loyed-aneena-wedding` |
| CSS root class | `.template-paper`, `.template-pink`, `.template-sage`, … |
| Public assets | `public/weddings/<slug>/` only for that client |

Legacy files `wedding1.ts`, `wedding2.ts`, `wedding3.ts` keep old slugs; **new** clients should not be named `wedding4` unless you choose that deliberately.

---

## 12. Quick checklists

### New client (existing template)

1. [ ] `configs/weddings/<client>.ts` with correct `template` + `slug`
2. [ ] `public/weddings/<slug>/` assets
3. [ ] `seo` complete + `og-share` image
4. [ ] Integrations URLs (if RSVP/photos)
5. [ ] Import + add to `core/registry.ts`
6. [ ] `typecheck` / `test` / `build`
7. [ ] Deploy Worker

### New template

1. [ ] `templates/templateN/schema.ts` + `defaults.ts` + `context.tsx` + `Template.tsx` + styles
2. [ ] Port components; use `WeddingAssetScope` + `mediaUrl`
3. [ ] Update `wedding-base.ts`, `template-resolver.tsx`, `isTemplateId` in `registry.ts`
4. [ ] One full `configs/weddings/*.ts` reference client
5. [ ] Document theme in `THEME_CLIENT_MAP.md`
6. [ ] Tests + build + visual QA

### Port from external Next.js app

1. [ ] Extract all variable content into Zod schema fields
2. [ ] Move static files to `public/weddings/<slug>/`
3. [ ] Fix all asset and API paths for `basePath`
4. [ ] Remove old `app/page.tsx` routing — only `[slug]` drives invitations
5. [ ] Register in `registry.ts`
6. [ ] Do not copy `node_modules` or `.next` into this repo

---

## 13. Where to change what (cheat sheet)

| Goal | File(s) |
|------|---------|
| New couple, same design | `configs/weddings/*.ts`, `public/weddings/<slug>/`, `core/registry.ts` |
| New design | `templates/templateN/*`, `core/*` |
| Listing page design | `app/page.tsx` |
| Link preview / WhatsApp | `seo` in config, `lib/wedding-metadata.ts` |
| RSVP email (paper theme) | `app/api/rsvp/route.ts`, env vars |
| Upload (paper theme) | `app/api/upload/route.ts`, env vars |
| Global fonts | `app/layout.tsx` |
| URL prefix `/events` | `lib/base-path.ts`, `next.config.ts` (keep in sync) |

---

## 14. Related docs

- [DEPLOYMENT.md](./DEPLOYMENT.md) — Cloudflare, `/events` routes, env vars
- [THEME_CLIENT_MAP.md](./THEME_CLIENT_MAP.md) — Which template is which theme
- [MIGRATION_AUDIT.md](./MIGRATION_AUDIT.md) — Historical content parity notes
- [CURSOR_MIGRATION_BRIEF.md](./CURSOR_MIGRATION_BRIEF.md) — Original migration goals

When in doubt: **template = how it looks**, **config = whose wedding it is**, **slug = the public URL**.
