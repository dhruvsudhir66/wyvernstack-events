# Deployment

The wedding application is a Next.js App Router app at the repository root. It is meant to be served only under `https://wyvernstack.com/events`. It must not replace the company site at `https://wyvernstack.com/`.

## Routing model

`next.config.ts` sets:

- `basePath: "/events"`
- `trailingSlash: true`

Next.js therefore emits page and asset URLs such as:

- `/events/`
- `/events/wedding1/`
- `/events/wedding2/`
- `/events/wedding3/`
- `/events/_next/static/...`
- `/events/weddings/<slug>/...` for files in `public/weddings/<slug>/`
- `/events/api/rsvp/` and `/events/api/upload/`

`next/link` receives paths without the `/events` prefix. Next adds that prefix itself.

`images.unoptimized` is `true`. With `basePath`, the image optimizer requests local files at `/weddings/...` and gets a 404, then reports that the resource is not a valid image. `WeddingImage` therefore writes the browser URL itself, including `/events` once, and skips the optimizer. Raw `img`, audio, CSS `url()`, `Audio()`, and `fetch` calls do the same through `lib/base-path.ts`.

Do not strip `/events` in the Worker, or those URLs will miss the prefix. Do not add `/events` again in the Worker, or it will be doubled.

Recommended Cloudflare route: `wyvernstack.com/events` and `wyvernstack.com/events/*`, forwarded with the path unchanged.

`/events` redirects to `/events/` because `trailingSlash` is on.

## Why this is not a static export

Template 1 keeps two Route Handlers:

- `POST /events/api/rsvp` sends email with Resend
- `POST /events/api/upload` returns a five-minute S3 presigned PUT. The object key prefix remains `wedding-uploads/`

Those handlers use the Resend SDK and the AWS SDK. `output: "export"` cannot run them. Host the app on Cloudflare Workers with the OpenNext Cloudflare adapter for Next.js, not as a Pages static export.

This repository does not add a Wrangler or OpenNext config file. Adapter support for Next.js 16.3.5 has to be confirmed against the adapter release you install. Do not change DNS or the existing company-site project from this repo.

## Build

From the repository root, with Node 24:

```bash
npm install
npm run typecheck
npm test
npm run lint
npm run build
```

The root `package-lock.json` is the lockfile for the consolidated app. Do not install dependencies inside the three copied source folders for deployment.

Build output is `.next`. The OpenNext adapter consumes that Next.js build. Set the Worker route to the `/events` prefix above.

## Environment variables

Set these on the Worker, not in client code. No secret values belong in this repository.

Template 1 RSVP email:

- `RESEND_API_KEY`
- `RSVP_TO_EMAIL`
- `RSVP_FROM_EMAIL` (verified Resend sender)

Template 1 uploads:

- `S3_REGION`
- `S3_BUCKET`
- `S3_ACCESS_KEY_ID`
- `S3_SECRET_ACCESS_KEY`

`S3_PUBLIC_BASE_URL` and `NEXT_PUBLIC_SITE_URL` are named in `.env.example` because the original projects listed them. The current route handlers and components do not read them.

Until per-wedding server secrets exist, every template 1 wedding shares one Resend inbox and the `wedding-uploads/` key prefix. Template 2 and template 3 do not use these variables. Their Google Apps Script URLs are public and live in `configs/weddings/wedding2.ts` and `wedding3.ts`.

The S3 principal should stay limited to `s3:PutObject` on `wedding-uploads/*`. The bucket CORS policy must allow `PUT` from `https://wyvernstack.com`.

The combined app sends `Permissions-Policy: camera=(self)` so the sage photo capture can use the camera. The original paper site sent `camera=()`. A paper-only deployment that must keep the camera disabled would need a separate header.

## Adding wedding4 with an existing template

1. Copy that couple's images, audio, and fonts into `public/weddings/wedding4/`, using the same relative paths the template already expects (`/images/...`, `/music/...`) or different paths recorded in the config.
2. Add `configs/weddings/wedding4.ts`. Import the schema for `template1`, `template2`, or `template3`. Set `template` to that id and `slug` to `wedding4`. Copy the shape of the matching existing config and replace the customer values. Do not invent fields the schema does not have.
3. Export it through `templateNSchema.parse(...)` so a missing required value fails the build.
4. Import `wedding4` in `core/registry.ts` and add it to the `weddings` array.
5. Run `npm test`, `npm run typecheck`, and `npm run build`.
6. Deploy the same Worker. The new URL is `https://wyvernstack.com/events/wedding4/`.

No new template component is required when the couple reuses an existing design.

Template 2 and template 3 Google Apps Script URLs are per wedding. Put the new couple's web-app URLs in their config. Keep the request method, field names, and CORS mode already implemented in that template.

## Manual checks still required

- Resend domain verification and the three RSVP/S3 secrets on the Worker.
- S3 bucket CORS for the production origin.
- Each Google Apps Script deployment still accepts the payload documented in `MIGRATION_AUDIT.md`.
- OpenNext adapter version compatible with Next.js 16.3.5.
- Visual comparison of `/events/wedding1/`, `/events/wedding2/`, and `/events/wedding3/` at desktop and mobile widths after the Worker is live.
- Confirm `/` on `wyvernstack.com` is still the company site and only `/events` reaches this app.
