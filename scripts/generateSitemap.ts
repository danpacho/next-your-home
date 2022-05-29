import { config } from "blog.config"
import { writeFile } from "fs/promises"
import { replaceSpaceToEncode, TempMetaType } from "./utils"

const URL_PRIORITY = {
    post: 0.8,
    category: 0.4,
    categoryPagination: 0.2,
}

async function generateSitemap(
    categoryNameArray: string[],
    allPostMeta: TempMetaType[]
) {
    const addSiteUrlNotation = (relativePath: string) =>
        `${config.url}${relativePath}`

    const generateUrlSet = (
        url: string,
        option: {
            changefreq?:
                | "always"
                | "hourly"
                | "daily"
                | "weekly"
                | "monthly"
                | "yearly"
                | "never"
            priority?: number
            lastmod?: string
        }
    ) =>
        `<url><loc>${url}</loc>${
            option?.priority && `<priority>${option.priority}</priority>`
        }${
            option?.changefreq &&
            `<changefreq>${option.changefreq}</changefreq>`
        }${
            typeof option?.lastmod === "string"
                ? `<lastmod>${option.lastmod}</lastmod>`
                : ""
        }</url>`

    const categoryPathArray = categoryNameArray
        .map(addSiteUrlNotation)
        .map(replaceSpaceToEncode)
    const categoryUrlSetArray = categoryPathArray.map((categoryPath) =>
        generateUrlSet(categoryPath, {
            changefreq: "monthly",
            priority: URL_PRIORITY.category,
        })
    )
    const categoryPaginationPathArray = allPostMeta
        .map(({ paginationUrl }) => paginationUrl)
        .map(addSiteUrlNotation)
    const categoryPaginationUrlSetArray = categoryPaginationPathArray.map(
        (postPath) =>
            generateUrlSet(postPath, {
                changefreq: "daily",
                priority: URL_PRIORITY.categoryPagination,
            })
    )
    const postUrlSetArray = allPostMeta.map(({ postUrl, update }) =>
        generateUrlSet(addSiteUrlNotation(postUrl), {
            changefreq: "daily",
            priority: URL_PRIORITY.post,
            lastmod: update,
        })
    )

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
xmlns:xhtml="http://www.w3.org/1999/xhtml"
xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">

<url><loc>${config.url}</loc></url>
<url><loc>${config.url}/category</loc></url>
<url><loc>${config.url}/profile</loc></url>

${categoryUrlSetArray.join("\n")}
${categoryPaginationUrlSetArray.join("\n")}
${postUrlSetArray.join("\n")}
</urlset>`

    await writeFile("public/sitemap.xml", sitemap, {
        encoding: "utf-8",
    })
}

export { generateSitemap }
