// @ts-check

/**
 * @type {import('next').NextConfig}
 */

const { withPlugins } = require('next-compose-plugins')

//* custome plugins ---------------------------------


//* next default config ------------------------------
const nextConfig = {
    pageExtensions: ['mdx', 'tsx', 'ts'],
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        styledComponents: true,
        // removeConsole: {
        //     exclude: ['error'],
        // },
    },
}

module.exports = withPlugins(
  [],
  nextConfig
) 


