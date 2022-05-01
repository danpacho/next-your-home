import { DefaultSeo, DefaultSeoProps } from "next-seo"

import { config } from "blog.config"

const DEFAULT_SEO_PROPS: DefaultSeoProps = {
    title: config.siteName,
    description: config.subtitle,
    canonical: config.url,
    openGraph: {
        type: "website",
        locale: "ko-KR",
        title: config.siteName,
        description: config.subtitle,
        url: config.url,
    },
    additionalMetaTags: [
        {
            name: "author",
            content: config.author.name,
        },
        {
            name: "currentState",
            content: config.author.currentState,
        },
        {
            name: "currentGoal",
            content: config.author.currentGoal,
        },
    ],
}

function DefaultSEO() {
    return <DefaultSeo {...DEFAULT_SEO_PROPS} />
}

export { DefaultSEO }
