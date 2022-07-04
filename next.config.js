// @ts-check

/**
 * @type {import('next').NextConfig}
 */

const { withPlugins } = require("next-compose-plugins")

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
})

//* custome plugins ---------------------------------

//* next default config ------------------------------
const removeConsoleOption =
    process.env.NODE_ENV === "development"
        ? false
        : {
              exclude: ["error"],
          }

const nextConfig = {
    pageExtensions: ["mdx", "tsx", "ts"],
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        removeConsole: removeConsoleOption,
        reactStrictMode: true,
        styledComponents: true,
    },
    webpack: (config, { dev, isServer }) => {
        // Replace React with Preact only in client production build
        if (!dev && !isServer) {
            Object.assign(config.resolve.alias, {
                react: "preact/compat",
                "react-dom": "preact/compat",
                "react-dom/test-utils": "preact/test-utils",
            })
        }

        return config
    },
}

module.exports = withPlugins([withBundleAnalyzer], nextConfig)
