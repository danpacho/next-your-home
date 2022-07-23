// @ts-check

/**
 * @type {import('next').NextConfig}
 */

const { withPlugins } = require("next-compose-plugins")

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
})

//* next default config ------------------------------
const nextConfig = {
    pageExtensions: ["mdx", "tsx", "ts"],
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        reactStrictMode: true,
        styledComponents: true,
        removeConsole: {
            exclude: ["error"],
        },
    },
    experimental: {
        nextScriptWorkers: true,
    },
    webpack: (config, { dev, isServer }) => {
        // Replace React with Preact in production build
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
