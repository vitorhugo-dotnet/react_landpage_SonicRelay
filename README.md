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
| `npm run build` | Type-check the project references, then build to `dist/`. |
| `npm run preview` | Serve the production build locally. |
| `npm run lint` | ESLint over the whole project. |
| `npm run typecheck` | `tsc -b` with no emit. |
| `npm test` | Vitest run (jsdom + Testing Library). |

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
└── index.css      Tailwind v4 theme tokens
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
