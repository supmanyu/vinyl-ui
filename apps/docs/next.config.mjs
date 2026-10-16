import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Static export → deployed to Cloudflare Pages (see wrangler.toml).
  output: 'export',
};

export default withMDX(config);
