import { config } from "blog.config"

function BaseSEO() {
    return (
        <>
            {/* encoding meta */}
            <meta charSet="utf-8" />

            {/* favicon ICON meta */}
            <link rel="icon" href={config.author.faviconUrl} />
            <link
                rel="mask-icon"
                href={config.author.faviconUrl}
                color="#000000"
            />

            {/* site basic info meta */}
            <meta
                name="description"
                content={`${config.siteName}-${config.subtitle}`}
            />
            <meta name="author" content={config.author.name} />

            {/* opengraph sns preview og:... meta */}
            <meta property="og:type" content="blog" />
            <meta property="og:title" content={config.siteName} />
            <meta property="og:image" content={config.author.bannerImageUrl} />
            <meta property="og:description" content={config.subtitle} />
            <meta property="og:site_name" content={config.siteName} />
            <meta property="og:url" content={config.url} />
            <meta property="og:locale" content={config.language} />

            {/* crawling bot meta */}
            <meta name="robots" content="all" />
            <meta name="googlebot" content="all" />
            <meta name="NaverBot" content="all" />

            {/* rss */}
            <link rel="alternate" type="application/rss+xml" href="/rss.xml" />
        </>
    )
}

export { BaseSEO }
