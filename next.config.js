// @ts-check

/**
 * @type {import('next').NextConfig}
 */

const { withPlugins } = require("next-compose-plugins")

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
})

module.exports = withPlugins([withBundleAnalyzer], {
    reactStrictMode: true,
    pageExtensions: ["mdx", "tsx", "ts"],
    swcMinify: true,
    compiler: {
        removeConsole: {
            exclude: ["error"],
        },
    },
    experimental: {
        nextScriptWorkers: true,
    },
    webpack: (config, { dev, isServer }) => {
        //* Replace React with Preact in production build
        if (!dev && !isServer) {
            Object.assign(config.resolve.alias, {
                "react-dom": "preact/compat",
                react: "preact/compat",
                "react/jsx-runtime.js": "preact/compat/jsx-runtime",
                "react-dom/test-utils": "preact/test-utils",
            })
        }

        return config
    },
})
