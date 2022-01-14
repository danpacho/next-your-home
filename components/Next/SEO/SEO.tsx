function SEO() {
    return (
        <>
            {/*//* meta 링크 https://developer.mozilla.org/ko/docs/Web/HTML/Element/meta/name */}
            <meta charSet="utf-8" />

            {/*//* favicon ICON 설정 public folder */}
            <link rel="shortcut icon" href="/favicon.svg" type="image/svg" />

            {/*//* page 기본 정보 제공 */}
            <meta name="description" content="" />
            <meta name="keywords" content="" />
            <meta name="author" content="" />

            {/*//* opengraph sns 미리보기 og:... */}
            <meta property="og:type" content="blog" />
            <meta property="og:title" content="" />
            <meta property="og:image" content="" />
            <meta property="og:description" content="" />
            <meta property="og:url" content="//" />
            <meta property="og:site_name" content="Danpacho.Home" />
            <meta property="og:locale" content="ko" />

            {/*//* crawling bot */}
            <meta name="googlebot" content="" />
            <meta name="NaverBot" content="All" />
            <meta name="NaverBot" content="index,follow" />
        </>
    )
}

export default SEO
