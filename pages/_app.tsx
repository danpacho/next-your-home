import type { AppProps } from "next/app"
import Head from "next/head"

import { ThemeProvider } from "styled-components"

import { GlobalStyle } from "@styles/global/GlobalStyle"
import { lightTheme } from "@styles/utils/CustomeTheme"
import Layout from "@components/Layout/Layout"

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
            <ThemeProvider theme={lightTheme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </>
    )
}

export default AppParent
