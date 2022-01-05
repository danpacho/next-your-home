import { GlobalStyle } from "@/styles/GlobalStyle"
import { lightTheme } from "@/styles/utils/CustomeTheme"
import type { AppProps } from "next/app"
import Head from "next/head"
import { ThemeProvider } from "styled-components"

function MyApp({ Component, pageProps }: AppProps) {
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
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    )
}

export default MyApp
