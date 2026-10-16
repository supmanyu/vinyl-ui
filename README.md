# Vinyl UI

An open-source, MIT-licensed design system with an **80s multi-colour palette** and **analog, glitchy, geometric effects**: RGB splits, film burns, scanlines and SMPTE wipes. It runs on **React web** and **React Native**.

- **Web:** Tailwind CSS v4 tokens + a [shadcn/ui](https://ui.shadcn.com) registry
- **React Native:** [Uniwind](https://uniwind.dev) tokens + a [React Native Reusables](https://reactnativereusables.com)-based registry
- **Effects:** `@vinyl-ui/effects`: RGB split, film burn, scanlines, SMPTE wipes, neon draw, shine and stripe text. One API, with a platform-specific implementation (CSS on web, Reanimated + SVG on native)
- **Components:** 30 restyled shadcn/ui components plus Vinyl originals (Glitch Text, Neon Tile, Test Pattern, Wordmark), for web and native

📖 **Docs:** https://vinyl-ui.pages.dev (source in `apps/docs`, hosted on Cloudflare Pages)

## Quick start (web)

```jsonc
// components.json
{ "registries": { "@vinyl": "https://vinyl-ui.pages.dev/r/web/{name}.json" } }
```

```bash
npx shadcn@latest add @vinyl/theme @vinyl/button @vinyl/glitch-text
```

```tsx
import { Button } from '@/components/ui/button';
import { GlitchText } from '@/components/ui/glitch-text';

<GlitchText>Night Drive</GlitchText>
<Button glitch>Play</Button>
```

React Native: point `@vinyl` at `/r/native/{name}.json` instead. See the [native install guide](apps/docs/content/docs/installation/native.mdx).

## Packages

| Package | Description |
| --- | --- |
| [`@vinyl-ui/tokens`](packages/tokens) | Palette, Night Drive / Sun-Faded themes and SMPTE colours, as Tailwind v4 CSS, Uniwind CSS and JS |
| [`@vinyl-ui/effects`](packages/effects) | `RGBSplit`, `FilmBurn`, `Scanlines`, `SmpteWipe`, `NeonDraw`, `Shine` and `StripeText` for web and native, plus Tailwind utilities |
| [`packages/registry`](packages/registry) | shadcn registry sources for the web and native components (not published to npm) |

## Development

```bash
pnpm install
pnpm build && pnpm test && pnpm typecheck && pnpm lint
```

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
