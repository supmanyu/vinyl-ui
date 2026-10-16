import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    entry: { index: 'src/index.ts' },
    outDir: 'dist/web',
    platform: 'browser',
    dts: true,
    copy: [{ from: 'src/effects.css', to: 'dist' }],
  },
  {
    entry: { index: 'src/index.native.ts' },
    outDir: 'dist/native',
    platform: 'neutral',
    dts: true,
  },
]);
