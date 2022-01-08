import Document, { Html, Main, NextScript } from "next/document"
import SEO from "@components/Next/SEO/SEO"

class MyDocument extends Document {
    render() {
        return (
            <Html lang="ko">
                <SEO />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
