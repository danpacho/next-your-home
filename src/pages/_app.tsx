import type { AppProps } from "next/app"
import Head from "next/head"

import { RecoilRoot } from "recoil"

import { GlobalStyle } from "@styles/global/GlobalStyle"
import { PageType } from "@typing/page/type"

import MainLayout from "@components/Next/Layout/Layout"

function AppParent({ Component, pageProps }: AppProps) {
    const pageType = Component?.displayName as PageType
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <title>boilerplate</title>
            </Head>

            <GlobalStyle />

            <RecoilRoot>
                <MainLayout pageType={pageType}>
                    <Component {...pageProps} />
                </MainLayout>
            </RecoilRoot>
        </>
    )
}

export default AppParent
