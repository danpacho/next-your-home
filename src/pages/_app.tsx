import "../styles/codeStyle.css"

import { useEffect, useRef } from "react"

import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import Head from "next/head"

import { Provider } from "jotai"

import { GlobalStyle } from "@styles/global/GlobalStyle"
import { PageType } from "@typing/page/type"

import { DefaultSEO } from "@components/Next/SEO"
import { Layout } from "@components/Next/Layout"

import { GoogleAnalytics } from "@lib/GoogleAnalytics"
import { config } from "blog.config"

const useRestorePageScroll = () => {
    const router = useRouter()

    const savedScrollPosition = useRef(0)
    const isURLBackwardByRouter = useRef(false)

    useEffect(() => {
        const beforeHistoryChange = () => {
            savedScrollPosition.current = window.scrollY
        }

        const routeChangeComplete = () => {
            isURLBackwardByRouter.current &&
                window.scrollTo({
                    top: savedScrollPosition.current,
                    behavior: "auto",
                })
            isURLBackwardByRouter.current = false
        }

        router.beforePopState(() => {
            isURLBackwardByRouter.current = true
            return true
        })

        router.events.on("routeChangeComplete", routeChangeComplete)
        router.events.on("beforeHistoryChange", beforeHistoryChange)

        return () => {
            router.events.off("routeChangeComplete", routeChangeComplete)
            router.events.off("beforeHistoryChange", beforeHistoryChange)
        }
    }, [router])
}

function App({ Component, pageProps }: AppProps) {
    const pageType = Component?.displayName as PageType

    useRestorePageScroll()

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>

            {config.googleAnalyticsID && (
                <GoogleAnalytics googleAnalyticsID={config.googleAnalyticsID} />
            )}

            <DefaultSEO />

            <GlobalStyle />

            <Provider>
                <Layout pageType={pageType}>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        </>
    )
}

export default App
