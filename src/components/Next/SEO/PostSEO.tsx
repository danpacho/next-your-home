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
                title={`${config.siteName}-${category}-${title}`}
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
                    locale: "ko_KR",
                    images: [
                        {
                            url: config.author.avatarImageUrl,
                            alt: config.author.name,
                        },
                    ],
                }}
            />
            <ArticleJsonLd
                authorName={config.author.name}
                datePublished={publishedTime}
                description={preview}
                images={[config.author.avatarImageUrl]}
                publisherName={author}
                title={title}
                url={fullPostUrl}
                publisherLogo={`${config.author.avatarImageUrl}/favicon/favicon-32x32.png`}
            />
        </>
    )
}

export { PostSEO }
