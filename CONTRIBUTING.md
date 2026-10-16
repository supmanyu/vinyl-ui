# Contributing to Vinyl UI

Thanks for helping! The full guide lives in the docs at
[`apps/docs/content/docs/contributing.mdx`](apps/docs/content/docs/contributing.mdx). The short version:

1. `pnpm install` (Node ≥ 22.18, pnpm 12).
2. Make your change. Keep web (`registry/web`) and native (`registry/native`) component APIs in sync.
3. `pnpm build && pnpm test && pnpm typecheck && pnpm lint`.
4. If you changed `@vinyl-ui/tokens` or `@vinyl-ui/effects`, run `pnpm changeset`.
5. Open a PR. Include screenshots for visual changes, on both platforms where relevant.

Effects must respect reduced motion and stay under three flashes per second (WCAG 2.3.1). Token
changes must keep the AA contrast test green.

By participating you agree to the [Code of Conduct](CODE_OF_CONDUCT.md).
