import "../styles/globals.css"

import type { AppProps } from "next/app"
import Head from "next/head"

import { ThemeProvider } from "styled-components"

import { GlobalStyle } from "@styles/global/GlobalStyle"
import { lightTheme } from "@styles/utils/CustomeTheme"

import MainLayout from "@components/Next/Layout/Layout"
import { RecoilRoot } from "recoil"

function AppParent({ Component, pageProps }: AppProps) {
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

            {/* //TODO: light dark mode toggling */}
            <ThemeProvider theme={lightTheme}>
                <MainLayout>
                    <RecoilRoot>
                        <Component {...pageProps} />
                    </RecoilRoot>
                </MainLayout>
            </ThemeProvider>
        </>
    )
}

export default AppParent
