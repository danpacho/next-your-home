import { DefaultSeo, DefaultSeoProps } from "next-seo"

import { config } from "blog.config"

const DEFAULT_SEO_PROPS: DefaultSeoProps = {
    title: config.siteName,
    description: config.subtitle,
    openGraph: {
        type: "website",
        locale: config.language,
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
        {
            name: "email",
            content: config.author.contacts.email,
        },
        {
            name: "github",
            content: config.author.contacts.github,
        },
    ],
}

function DefaultSEO() {
    return <DefaultSeo {...DEFAULT_SEO_PROPS} />
}

export { DefaultSEO }
