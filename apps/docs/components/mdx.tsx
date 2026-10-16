import { Step, Steps } from 'fumadocs-ui/components/steps';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import { TypeTable } from 'fumadocs-ui/components/type-table';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Preview } from './preview';
import { Palette, RegistrySetup, TokenTable } from './reference';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...TabsComponents,
    Step,
    Steps,
    TypeTable,
    Preview,
    Palette,
    TokenTable,
    RegistrySetup,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
