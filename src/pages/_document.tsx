import Document, { Html, Head, Main, NextScript } from "next/document"

import { BaseSEO } from "@components/Next/SEO"
class MyDocument extends Document {
    render() {
        return (
            <Html lang="ko_KR">
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
}

export default MyDocument
