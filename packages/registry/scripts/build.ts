// Builds both shadcn registries into dist/r/{web,native}, injecting theme cssVars from @vinyl-ui/tokens.
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const cssVars = JSON.parse(readFileSync(require.resolve('@vinyl-ui/tokens/shadcn.json'), 'utf8'));

mkdirSync('dist', { recursive: true });
for (const platform of ['web', 'native']) {
  const registry = readFileSync(`registry.${platform}.json`, 'utf8').replace(
    '"__TOKENS__"',
    JSON.stringify(cssVars),
  );
  writeFileSync(`dist/registry.${platform}.json`, registry);
  execFileSync('shadcn', ['build', `dist/registry.${platform}.json`, '-o', `dist/r/${platform}`], {
    stdio: 'inherit',
  });
}
