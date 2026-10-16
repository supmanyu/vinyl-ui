# @vinyl-ui/effects

Analog, glitch and geometric effects for React **and** React Native, from [Vinyl UI](../../README.md).

```tsx
import { FilmBurn, NeonDraw, RGBSplit, Scanlines, Shine, SmpteWipe, StripeText } from '@vinyl-ui/effects';

<RGBSplit animated>Night Drive</RGBSplit>
<FilmBurn className="bg-ultraviolet p-6">…</FilmBurn>
<SmpteWipe pattern="blinds" onEnd={done}>…</SmpteWipe>
<StripeText>86</StripeText>
```

- **Web:** add `@import '@vinyl-ui/effects/effects.css';` after Tailwind and `@vinyl-ui/tokens/web.css`. It also exposes utilities (`rgb-split`, `animate-glitch`, `film-burn`, `scanlines`, `animate-wipe-*`, `wipe-out`, `bg-sunset`, `bg-vice`, `text-vice`, `text-stripes`, `glow`, `glow-text`, `animate-draw`, `animate-shine`, `animate-collapse-open/close`).
- **React Native:** resolved automatically through the `react-native` export condition. Needs `react-native-reanimated` ≥ 4 and `react-native-svg` ≥ 15. `StripeText` also needs `@react-native-masked-view/masked-view`.

Every animation respects reduced motion. MIT
