import "../styles/codeStyle.css"

import type { AppProps } from "next/app"
import Head from "next/head"

import { Provider } from "jotai"

import { GlobalStyle } from "@styles/global/GlobalStyle"
import { PageType } from "@typing/page/type"

import { DefaultSEO } from "@components/Next/SEO"
import { Layout } from "@components/Next/Layout"

function App({ Component, pageProps }: AppProps) {
    const pageType = Component?.displayName as PageType
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
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
