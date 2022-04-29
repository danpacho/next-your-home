import Document, { Html, Head, Main, NextScript } from "next/document"
import SEO from "@components/Next/SEO/SEO"
class MyDocument extends Document {
    render() {
        return (
            <Html lang="ko">
                <Head>
                    <SEO />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
