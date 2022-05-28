import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
} from "next/document"

import { ServerStyleSheet } from "styled-components"

import { BaseSEO } from "@components/Next/SEO"

import { config } from "blog.config"

class AppDocument extends Document {
    render() {
        return (
            <Html lang={config.language}>
                <Head>
                    <BaseSEO />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }

    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage
        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                })

            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            }
        } finally {
            sheet.seal()
        }
    }
}

export default AppDocument
