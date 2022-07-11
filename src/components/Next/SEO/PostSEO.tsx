import { ArticleJsonLd, NextSeo } from "next-seo"

import { PostMetaType } from "@typing/post/meta"

import { config } from "blog.config"

function PostSEO({
    author,
    category,
    postUrl,
    update,
    preview,
    tags,
    title,
}: PostMetaType) {
    const publishedTime = new Date(update).toISOString()
    const fullPostUrl = `${config.url}${postUrl}`
    return (
        <>
            <NextSeo
                title={`${config.siteName} ${category}, ${title}`}
                description={preview}
                canonical={fullPostUrl}
                openGraph={{
                    type: "article",
                    title,
                    article: {
                        publishedTime,
                        authors: [config.author.name, author],
                        tags,
                    },
                    url: fullPostUrl,
                    description: preview,
                    site_name: config.siteName,
                    locale: config.language,
                    images: [
                        {
                            url: config.author.bannerImageUrl,
                            alt: `${config.author.name} info card`,
                        },
                        {
                            url: config.author.logoImageUrl,
                            alt: config.author.name,
                        },
                    ],
                }}
            />
            <ArticleJsonLd
                title={title}
                description={preview}
                authorName={config.author.name}
                publisherName={author}
                datePublished={publishedTime}
                images={[config.author.bannerImageUrl]}
                url={fullPostUrl}
                publisherLogo={config.author.logoImageUrl}
            />
        </>
    )
}

export { PostSEO }
