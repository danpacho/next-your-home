/**
 * @type {import('next').NextConfig}
 */

const { withPlugins } = require('next-compose-plugins')

//* custome plugins ---------------------------------


//* next default config ------------------------------
const nextConfig = {
  pageExtensions: ['mdx', 'tsx', 'ts'],
  reactStrictMode: true,
  compiler: {
      styledComponents: true,
  },
}

module.exports = withPlugins(
  [],
  nextConfig
) 


