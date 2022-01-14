/** @type {import('next').NextConfig} */
const { withPlugins } = require('next-compose-plugins')

//* custome plugins ---------------------------------
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

//* next default config ------------------------------
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'tsx', 'ts'],
  reactStrictMode: true,
  experimental: {
      styledComponents: true,
  },
}

module.exports = withPlugins(
  [
   withMDX
  ],
  nextConfig
) 


