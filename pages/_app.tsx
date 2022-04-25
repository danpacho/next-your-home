import type { AppProps } from "next/app"
import Head from "next/head"

import { GlobalStyle } from "@styles/global/GlobalStyle"

import MainLayout from "@components/Next/Layout/Layout"

import { RecoilRoot } from "recoil"
import { PageType } from "@/types/page/type"

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
