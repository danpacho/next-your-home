import "../styles/codeStyle.css"

import type { AppProps } from "next/app"
import Head from "next/head"

import { GlobalStyle } from "@styles/global/GlobalStyle"
import { PageType } from "@typing/page/type"

import { DefaultSEO } from "@components/Next/SEO"
import MainLayout from "@components/Next/Layout/Layout"
import { Provider } from "jotai"

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
                <MainLayout pageType={pageType}>
                    <Component {...pageProps} />
                </MainLayout>
            </Provider>
        </>
    )
}

export default App
