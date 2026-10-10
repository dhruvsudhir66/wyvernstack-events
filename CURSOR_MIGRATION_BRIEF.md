# Wyvernstack Events: Cursor AI Migration Brief

## Mission

Convert the three existing wedding invitation websites in this
repository into **one maintainable, config-driven Next.js application**
while preserving each website's existing design and functionality.

The result must support URLs such as:

-   `https://wyvernstack.com/events/`
-   `https://wyvernstack.com/events/wedding1/`
-   `https://wyvernstack.com/events/wedding2/`
-   `https://wyvernstack.com/events/wedding3/`
-   Future customers: `https://wyvernstack.com/events/wedding4/`, etc.

A new customer using an existing design should require a new
configuration file and their own assets, **not a copied project or new
template component**.

Do not start by rewriting the designs. First inspect the existing
projects, understand their structure and behaviour, and migrate them
incrementally.

------------------------------------------------------------------------

## 1. Starting repository layout

The repository will initially contain the three existing websites as
separate folders. Their names may differ from the examples below.

``` text
wyvernstack-events/
├── existing-website-1/
├── existing-website-2/
├── existing-website-3/
└── CURSOR_MIGRATION_BRIEF.md
```

Treat the three existing website folders as **source projects and
reference copies**. Do not delete, rename, or destructively modify them
during migration. The new consolidated application should live at the
repository root, alongside these source folders, unless the existing
repository structure makes that unsafe. If a different layout is
necessary, explain why before making that structural change.

Do not copy `node_modules`, `.next`, build output, caches, or other
generated folders into the consolidated application.

------------------------------------------------------------------------

------------------------------------------------------------------------

## 2A. Safe cleanup of the copied source folders

The three projects have already been copied into this repository, including their `node_modules` folders. Clean up the **copied folders inside `wyvernstack-events` only** before doing the main migration.

### Safe to remove when found inside the copied source projects

Remove reproducible dependency folders, build output and caches, including:

- `node_modules/`
- `.next/`
- `out/` (generated static export output)
- `dist/`
- `build/`
- `.turbo/`
- `.cache/`
- `coverage/` (generated test coverage output)
- Clearly generated TypeScript build artifacts such as `*.tsbuildinfo`
- OS noise such as `.DS_Store` and `Thumbs.db`

Inspect other generated folders before removing them. Use targeted cleanup only. Do not run broad deletion commands against the repository root or parent directories. Never delete anything outside the three copied source folders as part of this cleanup.

### Do not remove these source/project files

Keep, as applicable:

- `package.json`
- Package-manager lockfiles (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, `bun.lock` or `bun.lockb`)
- `app/`, `pages/`, `src/`, `components/`, `lib/`, `hooks/`, `styles/`
- `public/` and all unique images, fonts, videos, audio and other original assets
- `next.config.*`, `tsconfig.json`, Tailwind/PostCSS configuration and other source configuration
- Existing tests, scripts, migrations, documentation and license files
- Files needed to understand or reproduce integrations

Do not remove a folder merely because its name is unfamiliar. Inspect it first.

### Environment files and secrets

Files such as `.env`, `.env.local` and `.env.production` may contain credentials or endpoint configuration. Do not display secret values in terminal output, reports, chat or committed files.

1. Identify the environment variable **names** each project expects without printing values.
2. Ensure secret `.env*` files are ignored by Git. Keep `.env.example` only if it contains placeholders and no real secrets.
3. Do not blindly delete environment files before auditing integrations. Preserve required local-only values in a safe, ignored location or tell the user how to configure them locally.
4. Never copy secrets into source code or client-side configuration. Use Cloudflare environment variables/secrets or suitable server-side configuration when required.
5. If a copied `.env` file is unnecessary after migration, remove that copied file only after documenting the variable names and confirming the values can be safely reconfigured. Never touch the user's original project outside this repository.

### Root-level cleanup after consolidation

Once the consolidated application has its own correct root `package.json` and lockfile:

- The final build should use the root app and root dependencies, not nested source-project installations.
- Keep the three copied source folders until all migration checks pass.
- Remove generated folders still present in those copied folders after verification if any remain.
- Do not automatically delete the copied source folders themselves. Keep them as references until the user explicitly approves their removal.
- Do not delete source-project lockfiles before the audit has recorded which package manager and dependency versions each project used.

Record the cleanup in `MIGRATION_AUDIT.md`, including which generated folders were removed and confirmation that only copied generated files/caches were deleted.

## 2. Non-negotiable requirements

1.  **Preserve the three designs.** Each original site becomes a
    separate template. Do not force all templates into one universal
    layout or redesign them.
2.  **Preserve existing content.** Existing couple names, dates, text,
    event details, Bible verses, colours, fonts, image choices, section
    order, and other content must continue to appear as they do now.
3.  **Move customer-specific content into configuration.** Do not leave
    current clients' names, dates, copy, colours, or image paths
    hardcoded in reusable template components when they can be
    configuration values.
4.  **Keep template-specific configuration separate.** Different
    templates can have different sections and settings. Do not make one
    huge universal config full of irrelevant optional properties.
5.  **Preserve functionality.** Keep working countdowns, music controls,
    animations, galleries, forms, RSVP behaviour, photo uploads, Google
    Apps Script integrations, and other features that exist in the
    source projects.
6.  **Do not invent features or content.** Do not add fake testimonials,
    placeholder wedding information, dummy metrics, or unrequested
    functionality.
7.  **Do not expose secrets.** Never copy API keys, service-role keys,
    private tokens, credentials, or `.env` values into source files,
    client-side bundles, documentation, or committed configuration. Keep
    environment variables in the appropriate environment configuration.
8.  **Avoid unnecessary dependencies.** Reuse existing libraries where
    practical. Inspect versions and compatibility before changing
    dependencies.
9.  **Keep the source projects intact.** Do not delete the original
    folders after migration.
10. **Make changes in small, testable steps.** Build and test after
    meaningful stages; fix regressions before continuing.
11. **Use production-quality TypeScript.** Avoid `any` unless there is a
    documented, unavoidable reason. Use explicit types and runtime
    validation where appropriate.
12. **Do not claim a test passed unless it was actually run and
    passed.**

------------------------------------------------------------------------

## 3. Phase 1: Audit all three websites before editing

Inspect each source project thoroughly. At minimum, examine:

-   `package.json` and lockfiles
-   Next.js, React, TypeScript and Tailwind versions
-   `app/`, `pages/`, `src/`, `components/`, `lib/` and `styles/`
-   All routes and page layouts
-   CSS, Tailwind configuration, CSS variables and font loading
-   `public/` and imported media assets
-   Images, videos, audio, local fonts and background assets
-   Animations and animation libraries
-   Countdown and date-handling logic
-   Forms, RSVP flows, photo upload flows and API integrations
-   Google Apps Script URLs and payload formats
-   Environment variable names (inspect names, but do not reveal secret
    values)
-   Next.js configuration and deployment assumptions
-   Any route handlers, server actions, middleware, server-side
    rendering, dynamic APIs or server-only dependencies

Create `MIGRATION_AUDIT.md` in the repository root. Include:

-   The source folder and framework versions for each website
-   A page/section inventory for each site
-   A component inventory
-   Existing content and customer-specific values that need
    configuration
-   Unique template settings and optional sections
-   External integrations and environment variables required
-   Differences and conflicts between the three projects
-   Potential migration risks
-   A proposed mapping from each source site to `template1`,
    `template2`, and `template3`

Do not assume the sites have the same structure just because they are
wedding websites.

If any source project cannot be inspected or built, record the exact
reason and continue with the parts that can be verified. Do not silently
omit it.

------------------------------------------------------------------------

## 4. Target architecture

Use the following as a target direction, adapting names to fit what the
audit finds:

``` text
wyvernstack-events/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── not-found.tsx
│   └── [slug]/
│       └── page.tsx
├── core/
│   ├── wedding-base.ts
│   ├── registry.ts
│   └── template-resolver.ts
├── templates/
│   ├── template1/
│   │   ├── Template.tsx
│   │   ├── schema.ts
│   │   ├── defaults.ts
│   │   ├── components/
│   │   └── styles/
│   ├── template2/
│   │   ├── Template.tsx
│   │   ├── schema.ts
│   │   ├── defaults.ts
│   │   ├── components/
│   │   └── styles/
│   └── template3/
│       ├── Template.tsx
│       ├── schema.ts
│       ├── defaults.ts
│       ├── components/
│       └── styles/
├── configs/
│   └── weddings/
│       ├── wedding1.ts
│       ├── wedding2.ts
│       └── wedding3.ts
├── public/
│   └── weddings/
│       ├── wedding1/
│       ├── wedding2/
│       └── wedding3/
├── lib/
├── tests/
├── next.config.ts
├── package.json
├── tsconfig.json
├── .env.example
├── MIGRATION_AUDIT.md
└── CURSOR_MIGRATION_BRIEF.md
```

The original three source folders can remain at the root during
migration. Do not import application code from a source folder in the
final runtime if that code is meant to be migrated into `templates/`.
Avoid creating a fragile deployment that depends on nested source
projects' build outputs.

### Architectural responsibilities

-   `app/`: shared application shell, landing page and dynamic wedding
    route.
-   `core/`: common wedding metadata types, registry and template
    selection.
-   `templates/templateN/`: the unique design and its template-specific
    components, styles and schema.
-   `configs/weddings/`: per-customer configuration records.
-   `public/weddings/<slug>/`: assets for that wedding.
-   `lib/`: genuinely shared utilities and integrations.
-   `tests/`: configuration validation, routing and regression tests
    where feasible.

Only create shared components when their behaviour and purpose are truly
shared. If two countdowns look different, their presentation may remain
template-specific even if they use a shared date utility.

------------------------------------------------------------------------

## 5. Configuration design: shared core plus independent template schemas

### 5.1 Shared fields

Create a small base type for fields that are genuinely common to every
wedding, such as:

-   Unique URL slug
-   Couple names
-   Wedding/event date and time, including timezone where needed
-   Venue and address when applicable
-   SEO title, description and social-sharing image where supported

Do not put template-specific layout settings in the base type.

### 5.2 Template-specific settings

Each template must define its own TypeScript schema based on the real
source design. For example, one template might need a fullscreen hero
and overlay opacity, while another might need a calendar, editorial
cards, a collage, or a different section sequence. These are examples
only; derive actual fields from the source projects.

Use a discriminated union keyed by a stable template ID, such as:

``` ts
template: "template1"
```

Each template config should be type-checked against its own schema. Do
not use one massive interface with dozens of unrelated optional
properties.

If runtime validation is appropriate, use an existing compatible
validation library if one is already installed; otherwise consider Zod
only if the added dependency is justified. Validate configuration during
development/build so missing required fields fail clearly.

### 5.3 Preserve the existing content in the initial configs

Create one initial configuration from each original site:

-   `configs/weddings/wedding1.ts` must reproduce the current content of
    source website 1.
-   `configs/weddings/wedding2.ts` must reproduce the current content of
    source website 2.
-   `configs/weddings/wedding3.ts` must reproduce the current content of
    source website 3.

Use the original values, not invented examples. Keep the current content
and appearance working after migration.

For each configuration, move all appropriate customer-specific content
into config, including (where present):

-   Names, labels, date/time and venue
-   Headings, paragraphs, captions, invitations and Bible verses
-   Colours, font choices and supported theme options
-   Hero and section images, gallery lists and video/audio paths
-   Section visibility and section order when the original design
    supports those options
-   Countdown target and any timezone-dependent display settings
-   RSVP configuration and relevant public endpoint URL
-   Music enabled state and source, while respecting browser autoplay
    restrictions
-   Existing design-specific animation options that are genuinely
    configurable

Do not try to make every possible visual detail configurable. Keep
structural layout and design implementation in the template. Config
should expose intentional, safe choices rather than arbitrary executable
code.

### 5.4 Defaults and schema evolution

Use template defaults only for values that are truly safe defaults.
Existing client-specific content must be explicitly preserved in that
client's config.

If a required setting is missing, fail validation with a useful message
instead of silently rendering the wrong content. New settings added
later should have documented defaults or a deliberate migration path.

------------------------------------------------------------------------

## 6. Template components and configuration flow

Each template should receive its correctly typed config through props.
Example pattern:

``` tsx
type TemplateProps = {
  wedding: Wedding1Config;
};

export default function Template1({ wedding }: TemplateProps) {
  // Render this template using its own config.
}
```

The type name above is illustrative; use the actual schema created for
that template.

The dynamic route should:

1.  Read the `slug` from the URL.
2.  Look up the corresponding wedding config in the registry.
3.  Return a proper 404 for an unknown slug.
4.  Select the renderer using the config's `template` discriminator.
5.  Pass the config to that renderer.
6.  Avoid importing every source site's original page as a separate
    Next.js application.

The template resolver must be type-safe. Do not solve typing problems by
casting every config to `any`.

The landing page at the app root should be a simple Wyvernstack Weddings
landing page or template/demo index only if that is appropriate for the
project. It must not replace or interfere with the existing company
website at `https://wyvernstack.com/`.

------------------------------------------------------------------------

## 7. URL prefix: `/events`

The intended public URLs are:

-   `/events/`
-   `/events/wedding1/`
-   `/events/wedding2/`
-   `/events/wedding3/`
-   `/events/wedding4/` and future slugs

The company website already owns `wyvernstack.com`. The wedding app must
not take over the root domain.

Before implementing deployment settings, determine how the app will be
hosted:

-   If the wedding app is built with Next.js `basePath: "/events"`,
    verify that internal links, static assets, CSS, fonts, images, API
    requests and redirects all work under the prefix.
-   If Cloudflare routes `/events/*` to a Worker, determine whether the
    Worker forwards the path unchanged or strips the prefix. Make the
    Worker and Next.js configuration agree; do not accidentally apply
    the prefix twice or omit it.
-   Handle `/events` and `/events/` consistently.
-   Do not add a root-level catch-all that intercepts the company
    website's other routes.
-   Do not change DNS, domain settings, or the existing company site's
    deployment as part of this code migration.

Do not assume static export is suitable. Inspect whether the source
websites require route handlers, server actions, SSR, middleware,
server-only dependencies, or other unsupported features. Document the
recommended Cloudflare deployment method based on the actual code: -
Cloudflare Pages with static export if the app is genuinely compatible
with static output; or - Cloudflare Workers with the appropriate Next.js
adapter, such as OpenNext, if server functionality is needed.

Do not add deployment configuration blindly. Record required Cloudflare
build settings, output directory or adapter, route pattern and
environment variables in `DEPLOYMENT.md`.

------------------------------------------------------------------------

## 8. Asset handling

-   Preserve the correct assets for each original design and client.
-   Move or copy assets into `public/weddings/<slug>/` where
    appropriate, keeping filenames clear.
-   Update every config path and component reference after moving an
    asset.
-   Do not replace original images with stock or AI-generated images.
-   Preserve local font files and licensing/attribution notes where
    applicable.
-   Check case sensitivity in asset paths, as Cloudflare's Linux
    environment may differ from a local Windows filesystem.
-   Do not put secret or private customer data into public asset
    folders.
-   Avoid duplicate asset copies when a genuinely shared public asset
    can safely be reused.
-   Verify audio and video file sizes and loading behaviour.

------------------------------------------------------------------------

## 9. Integrations and security

Preserve existing integrations, but audit them before migration.

For Google Apps Script, RSVP forms, photo uploads and other external
endpoints:

-   Keep request methods, payload shape, expected response handling and
    CORS behaviour compatible with the existing implementation.
-   Move configurable public endpoint URLs to suitable configuration or
    environment variables.
-   Keep secrets on the server or in the appropriate secret store. A
    value used in browser code is public even if it is stored in a
    config file.
-   Do not expose service-role keys, access tokens or private
    credentials.
-   Check file type and file size validation for uploads, and do not
    weaken existing protections.
-   Do not silently change the Google Drive folder or upload
    destination.
-   Do not assume that a URL working locally proves the integration
    works on Cloudflare.
-   Document any external setup the deployment requires.

Do not rewrite an integration unless necessary. If a change is
necessary, explain why and test it.

------------------------------------------------------------------------

## 10. Migration workflow

Follow this order. Do not attempt a large all-at-once rewrite.

### Phase A --- Audit and baseline

1.  Inspect all three projects.
2.  Write `MIGRATION_AUDIT.md`.
3.  Identify how to install and run each source project.
4.  Run each source project's existing lint, typecheck, build and tests
    where available.
5.  Record baseline failures separately from failures introduced by
    migration.
6.  Identify secret files and ensure they are not copied into Git.

### Phase B --- Root application setup

1.  Choose compatible dependency versions based on the audit.
2.  Create the root application and one root `package.json`/lockfile.
3.  Keep the original project folders unchanged.
4.  Create the shared route, base types, registry and template resolver.
5.  Configure the `/events` base path only after deciding the deployment
    routing model.
6.  Ensure the root build does not recursively build or bundle the
    legacy source folders.

### Phase C --- Migrate template 1

1.  Copy the first design's required source components, styles and
    assets into its template folder.
2.  Preserve its visual structure and behaviour.
3.  Extract customer-specific content into `wedding1.ts`.
4.  Make the template consume the config through typed props.
5.  Add it to the registry and dynamic route.
6.  Compare it with the original at desktop and mobile widths.
7.  Fix visual and functional regressions before proceeding.

### Phase D --- Migrate templates 2 and 3

Repeat the same process independently for each design. Do not assume the
later templates can use template 1's schema or component hierarchy.

### Phase E --- Regression and production checks

1.  Build the root app.
2.  Type-check and lint.
3.  Test all three original wedding URLs.
4.  Test an unknown slug and verify a 404.
5.  Test links, fonts, images, countdowns, music controls, animations,
    RSVP, uploads and all integrations that exist.
6.  Test mobile and desktop layouts.
7.  Verify the `/events` prefix in generated URLs and asset requests.
8.  Confirm no secret values were committed or bundled.
9.  Write `DEPLOYMENT.md` with exact build/deploy instructions and
    Cloudflare requirements.
10. Keep the source projects intact until the migrated application has
    been verified.

------------------------------------------------------------------------

## 11. Required verification

Create tests where practical for:

-   Every wedding config has a unique slug.
-   Every config references a registered template.
-   Every config validates against its template schema.
-   Unknown slugs return 404.
-   Existing config values reach the correct template.
-   Required image paths and assets exist.
-   The build produces the expected routes or supports the expected
    Worker routing.
-   The `/events` prefix works without broken links or double prefixes.

For visual verification, compare each migrated page to its original
using screenshots at representative desktop and mobile sizes. Do not
report pixel-perfect parity unless it has actually been checked.

If browser automation or screenshot tooling is unavailable, state that
limitation and provide a manual verification checklist.

------------------------------------------------------------------------

## 12. Definition of done

The migration is complete only when:

-   There is one consolidated application at the repository root.
-   Each original design exists as its own reusable template.
-   Each original website has a config that preserves its current
    content.
-   All customer-specific content that should be configurable is
    extracted from the template components.
-   A new customer can reuse an existing template by adding a config and
    assets, registering a slug, and following the documented
    build/deploy workflow.
-   The templates can have different configuration schemas and different
    section structures.
-   All existing integrations are preserved or any necessary changes are
    documented and verified.
-   The app can be hosted under `/events` without taking over the
    company website's root route.
-   Build, typecheck, lint and available tests have been run; results
    are accurately reported.
-   `MIGRATION_AUDIT.md` and `DEPLOYMENT.md` are complete.
-   The three original source folders remain intact.

------------------------------------------------------------------------

## 13. Final instructions to Cursor

Work as a careful migration engineer, not as a redesign agent.

Start by auditing the repository and producing `MIGRATION_AUDIT.md`.
Then propose the migration plan based on the actual source code. Once
the audit is complete, proceed incrementally with the migration.

Do not stop after writing a plan if the source projects are accessible
and the migration can be performed. Implement the work, run the
available checks, and fix issues introduced by your changes.

Do not invent source details, claim tests passed without running them,
remove features to make the build pass, or silently replace existing
content with examples.

At the end, provide a concise report containing:

1.  The final application structure.
2.  Which source site became each template.
3.  The config file for each existing wedding.
4.  Features and integrations preserved.
5.  Files added or changed, plus generated folders/files safely removed from the copied source folders.
6.  Commands executed and their actual results.
7.  Any known limitations or unresolved issues.
8.  Exact steps for adding `wedding4` using an existing template.
9.  Exact Cloudflare deployment settings and any manual configuration
    still required.

**Success criterion:** the three original invitations continue to work
with their original content and visual identity, but are now served by
one config-driven application that can support future weddings without
copying a project.
