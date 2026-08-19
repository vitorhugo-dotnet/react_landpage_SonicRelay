# react_landpage_SonicRelay

Marketing landing page for **SonicRelay**, the open-source suite that streams
Windows system audio to a paired phone over WebRTC. Built with React 19,
TypeScript, Vite and Tailwind CSS v4, and deployed as a static site.

The page explains what the product does, how the four-step flow works
(pair → join → stream → monitor), what the architecture is, and what the
backend actually stores — all sourced from the API repository's own
documentation.

## Project suite

| Project | Repository | Stack | Responsibility |
| --- | --- | --- | --- |
| Backend API | [dotnet_SonicRelay](https://github.com/vitorhugo-dotnet/dotnet_SonicRelay) | .NET 10, ASP.NET Core, PostgreSQL, Redis | Device identity, pairing, sessions, join codes and signaling. |
| Mobile Viewer | [flutter_SonicRelay](https://github.com/vitorhugo-dotnet/flutter_SonicRelay) | Flutter, `flutter_webrtc` | Join a session and play WebRTC audio. |
| Windows Publisher | [windows_SonicRelay](https://github.com/vitorhugo-dotnet/windows_SonicRelay) | C#/.NET Desktop, WASAPI, WebRTC | Capture system audio and publish it to viewers. |
| Landing Page | [react_landpage_SonicRelay](https://github.com/vitorhugo-dotnet/react_landpage_SonicRelay) | React, TypeScript, Vite, Tailwind CSS | Public marketing site for the suite. |

## Quick start

Requirements: Node.js 20.19+ (22 LTS recommended).

```bash
npm install
npm run dev
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Vite dev server with fast refresh. |
| `npm run build` | Type-check, prerender, then build to `dist/` (including the `404.html` fallback). |
| `npm run build:server` | Compile `src/entry-server.tsx` for Node — the first half of the prerender step, run for you by `npm run build`. |
| `npm run preview` | Serve the production build locally. |
| `npm run lint` | ESLint over the whole project. |
| `npm run typecheck` | `tsc -b` with no emit. |
| `npm test` | Vitest run (jsdom + Testing Library). |

## Deployment

The site deploys to **GitHub Pages using the GitHub Actions source** — not a
branch or `/docs` folder. `.github/workflows/deploy-pages.yml` lints,
type-checks, tests and builds on every push to `main`, uploads `dist/` as a
Pages artifact and publishes it.

The workflow passes `enablement: true` to `actions/configure-pages`, so the
first run creates the Pages site and points it at this workflow — no manual
setting needed. If that call is ever refused, enable it by hand under
**Settings → Pages → Build and deployment → Source: GitHub Actions**.

Three details make a static host behave:

- **Base path.** A project site is served from `/<repo>/`, so asset URLs need
  that prefix. `actions/configure-pages` reports it and the workflow passes it
  to Vite as `VITE_BASE`; `vite.config.ts` normalises it and falls back to `/`
  locally. Moving to a custom domain needs no code change — the same output
  becomes empty and the base returns to `/`.
- **404 fallback.** The build writes `dist/404.html` as a copy of
  `index.html`, so GitHub Pages serves the app for any unknown path instead of
  its default error page. Deep links and stale URLs land on the site rather
  than a 404.
- **Canonical URL.** `actions/configure-pages` also reports the full address
  the site will answer on, and the workflow passes it as `SITE_URL`. The
  canonical link, the Open Graph URLs, `robots.txt` and `sitemap.xml` are all
  built from it, so moving to a custom domain changes no code here either.
  Local builds fall back to the published Pages address.

Build against a subpath locally with:

```bash
VITE_BASE=/react_landpage_SonicRelay npm run build && npm run preview
```

## Architecture

The page is a single static route, so it stays deliberately small: no router,
no state manager, no CSS-in-JS runtime.

```text
src/
├── content/       Typed copy modules — the only place wording lives
├── components/
│   ├── ui/        Primitives: Container, Section, Card, Button, Badge, Icon
│   ├── layout/    SiteHeader, SiteFooter, SkipLink
│   ├── media/     Device frames and the mocked product screens
│   └── sections/  One component per page section
├── hooks/         useScrollSpy
├── lib/           cn class-name helper
├── entry-server   Build-time render entry (prerendering)
└── index.css      Tailwind v4 theme tokens

vite/
├── seo.ts         Head tags, JSON-LD, robots.txt, sitemap.xml
└── prerender.ts   Bakes the rendered page into dist/index.html
```

Four conventions keep it that way:

- **Content is data.** Every section reads a typed module from `src/content`.
  Changing copy never touches a component, and a component never hard-codes a
  sentence.
- **One reason to change per module.** Sections compose primitives; primitives
  own presentation; hooks own behaviour. `Section` is the only place the
  vertical rhythm is defined, `Container` the only place the horizontal one is.
- **Tokens over literals.** Colours, radii and easings live in the `@theme`
  block in `index.css`, so re-skinning the site is a one-file change.
- **No speculative abstraction.** There is no router, theme switcher or i18n
  layer, because the site has one route, one theme and one language today.

## Search engines

A client-rendered page that ships an empty `<div id="root">` is the single
biggest thing standing between a landing page and its index entry. Four
mechanisms remove it, all driven from **`src/content/seo.ts`** — the one place
title, description, social image and canonical URL are written down.

- **Prerendering.** `npm run build` renders the page once in Node
  (`src/entry-server.tsx`) and bakes the markup into `dist/index.html`, so a
  crawler that runs no JavaScript still reads the whole page — and the first
  paint no longer waits on a 230 kB bundle. The browser hydrates that markup
  instead of throwing it away.
- **Head tags.** `vite/seo.ts` generates the title, description, canonical
  link, `robots` directives, Open Graph and Twitter cards, and the icon links,
  substituting them for the `<!--seo-->` marker in `index.html`. Social image
  URLs are absolute, which is the form scrapers require.
- **Rich results.** One JSON-LD `@graph` describes the page as `WebSite`,
  `WebPage`, `SoftwareApplication` (free, MIT, Windows + Android), `Person` and
  `FAQPage`. The FAQ entries are generated from `src/content/faq.ts`, so the
  structured data cannot drift from what the page actually says. Validate with
  the [Rich Results Test](https://search.google.com/test/rich-results).
- **robots.txt and sitemap.xml.** Emitted into `dist/` at build time with
  absolute URLs derived from `SITE_URL`, which the deploy workflow fills in
  from the address GitHub Pages reports.

> **One caveat on a project site.** Crawlers only read `robots.txt` from the
> *domain* root, so on `https://<owner>.github.io/<repo>/` the file this build
> emits is not the one Google obeys — that one belongs to the
> `<owner>.github.io` repository. Nothing is blocked either way, but the
> `Sitemap:` line will not be picked up automatically: submit
> `https://<owner>.github.io/<repo>/sitemap.xml` in Google Search Console (and
> Bing Webmaster Tools) instead. A custom domain makes the emitted file the
> real one.

The social card (`public/og-cover.png`, 1200×630) and the PWA icons are static
assets in `public/`; regenerate them by hand if the branding changes.

## Progressive web app

`vite-plugin-pwa` generates `manifest.webmanifest` and a Workbox service worker
that precaches the app shell and caches Google Fonts at runtime. The manifest
is built from the same content module as the meta tags, so the installed app
and the search result describe the product identically.

Being installable is not itself a ranking signal. What helps is the second
visit painting from the precache instead of the network, since Core Web Vitals
are a ranking input — and the app icons and `theme_color` are the same ones the
social card and the browser tab use.

The service worker is only generated for production builds; `npm run dev`
serves the page without one.

## Accessibility

Semantic landmarks with labelled sections, a skip link, visible focus rings,
`aria-expanded` on the mobile menu, `aria-current` on the active nav item, a
captioned data table, and a `prefers-reduced-motion` rule that disables the
level-meter animation and smooth scrolling.

## Product screenshots

The four product screens (pair, join, playback, monitor) are rendered as
lightweight CSS/SVG mockups in `src/components/media`, not bitmaps — they stay
crisp at any density and cost no extra requests. Swap them for real captures by
replacing the components behind `StepScreenPreview`.

## License

See [LICENSE](LICENSE).
