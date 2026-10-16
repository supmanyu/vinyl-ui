# @vinyl-ui/tokens

Design tokens for [Vinyl UI](../../README.md): an 80s palette with **Night Drive** (dark) and **Sun-Faded** (light) themes.

```css
/* Web — Tailwind CSS v4 (+ shadcn/ui variable names) */
@import 'tailwindcss';
@import '@vinyl-ui/tokens/web.css';
```

```css
/* React Native — Uniwind global.css */
@import 'tailwindcss';
@import 'uniwind';
@import '@vinyl-ui/tokens/native.css';
```

```ts
// JS (animations, charts, native styles)
import { themes, ramps, effects, smpte } from '@vinyl-ui/tokens';
```

| Export | Contents |
| --- | --- |
| `web.css` | `palette.css` + `:root`/`.dark` semantic vars + `@theme inline` mapping |
| `palette.css` | Palette ramps, effect colours, fonts, shadows (`@theme static`) |
| `native.css` | Palette + Uniwind `@variant dark` / `@variant light` themes |
| `shadcn.json` | `cssVars` used by the `@vinyl/theme` registry item |

MIT
