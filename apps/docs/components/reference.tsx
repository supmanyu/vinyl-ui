import { ramps, themes } from '@vinyl-ui/tokens';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { siteUrl } from '@/lib/shared';

const SWATCHES = [
  'magenta',
  'cyan',
  'yellow',
  'orange',
  'mint',
  'ultraviolet',
  'laser',
  'dusk',
] as const;

/** Palette ramps straight from @vinyl-ui/tokens. */
export function Palette() {
  return (
    <div className="not-prose my-6 grid gap-2">
      {SWATCHES.map((name) => (
        <div key={name} className="grid grid-cols-[6rem_1fr] items-center gap-3">
          <code className="text-xs">{name}</code>
          <div className="grid grid-cols-11 overflow-hidden rounded-sm">
            {Object.entries(ramps[name]).map(([step, hex]) => (
              <div
                key={step}
                title={`${name}-${step} ${hex}`}
                className="h-8"
                style={{ background: hex }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Every semantic token with its dark and light value. */
export function TokenTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Token</th>
          <th>Night Drive (dark)</th>
          <th>Sun-Faded (light)</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(themes.dark).map((key) => {
          const k = key as keyof typeof themes.dark;
          return (
            <tr key={k}>
              <td>
                <code>{k}</code>
              </td>
              {[themes.dark[k], themes.light[k]].map((hex, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: fixed two columns
                <td key={i}>
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="inline-block size-4 rounded-sm border"
                      style={{ background: hex }}
                    />
                    <code>{hex}</code>
                  </span>
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

/** components.json snippet pointing the @vinyl namespace at this site's registry. */
export function RegistrySetup({ platform }: { platform: 'web' | 'native' }) {
  const code = JSON.stringify(
    { registries: { '@vinyl': `${siteUrl}/r/${platform}/{name}.json` } },
    null,
    2,
  );
  return <DynamicCodeBlock lang="json" code={code} codeblock={{ title: 'components.json' }} />;
}
