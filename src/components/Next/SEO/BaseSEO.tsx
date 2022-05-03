import { config } from "blog.config"

function BaseSEO() {
    return (
        <>
            {/* encoding meta */}
            <meta charSet="utf-8" />

            {/* favicon ICON meta */}
            <link href="/favicon.svg" type="image/svg" />

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
            <meta property="og:locale" content="ko_KR" />

            {/* crawling bot meta */}
            <meta name="googlebot" content="All" />
            <meta name="NaverBot" content="All" />
            <meta name="NaverBot" content="index,follow" />
        </>
    )
}

export { BaseSEO }
