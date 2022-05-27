import { readdir, readFile, writeFile } from "fs/promises"

import { POST_DIRECTORY_NAME } from "@constants/blog.contents.directory"
import { MAC_OS_FILE_EXCEPTION } from "@constants/blog.file.exception"

import { MDXPostMetaType } from "@typing/post/meta"

import {
    blogContentsDirectory,
    removeFileFormat,
} from "@utils/function/blog-contents-loader/util"

import matter from "gray-matter"

import { config } from "blog.config"

const sortByDate = (currDate: string, nextDate: string) => {
    const nextDateNumber = Number(nextDate.replace(/\//g, ""))
    const currDateNumber = Number(currDate.replace(/\//g, ""))

    if (currDateNumber < nextDateNumber) return 1
    if (currDateNumber > nextDateNumber) return -1
    return 0
}

const getAllCategoryPath = async () =>
    (await readdir(blogContentsDirectory, "utf-8"))
        .filter((category) => category !== MAC_OS_FILE_EXCEPTION)
        .map((category) => `/${category}`)

const getPostPaginationUrl = (category: string, order: number) =>
    `${category}/${Math.floor(order / config.postPerCategoryPage + 1)}`
const getPostUrl = (postPaginationUrl: string, postFileName: string) =>
    `${postPaginationUrl}/${removeFileFormat(postFileName, "mdx")}`

const extractAllCategoryPostFileName = async (categoryNameArray: string[]) => {
    const dirPostInfo = await Promise.all(
        categoryNameArray.map(async (categoryName) => {
            const categoryPostFilePath = `${blogContentsDirectory}/${categoryName}/${POST_DIRECTORY_NAME}`
            const categoryPostFileNameArray = (
                await readdir(categoryPostFilePath, "utf-8")
            ).filter((postFileName) => postFileName !== MAC_OS_FILE_EXCEPTION)
            return {
                category: categoryName,
                categoryPostFileNameArray,
            }
        })
    )
    return dirPostInfo
}

interface CategoryPostFileNameType {
    category: string
    categoryPostFileNameArray: string[]
}

const extractPostMeta = async ({
    category,
    postFileName,
}: {
    category: string
    postFileName: string
}) => {
    const postUrl = `${blogContentsDirectory}/${category}/${POST_DIRECTORY_NAME}/${postFileName}`
    const postSource = await readFile(postUrl, "utf-8")

    const extractedMeta = matter(postSource).data as MDXPostMetaType
    if (Boolean(extractedMeta.postpone)) return
    return {
        update: extractedMeta.update,
        category,
        postFileName,
    }
}
interface TempMetaType {
    category: string
    postFileName: string
    update: string
}
const getAllPostMeta = async (
    categoryPostFileNameArray: CategoryPostFileNameType[]
) =>
    (
        await Promise.all(
            categoryPostFileNameArray.map(
                ({ category, categoryPostFileNameArray }) =>
                    categoryPostFileNameArray.reduce<Promise<TempMetaType[]>>(
                        async (acc, postFileName) => {
                            const postMeta = await extractPostMeta({
                                category,
                                postFileName,
                            })

                            if (postMeta) return [...(await acc), postMeta]
                            return await acc
                        },
                        Promise.resolve([] as TempMetaType[])
                    )
            )
        )
    )
        .map((categoryMetaArray) =>
            categoryMetaArray
                .sort((prev, curr) => sortByDate(prev.update, curr.update))
                .map(({ category, postFileName, update }, order) => {
                    const paginationUrl = getPostPaginationUrl(category, order)
                    return {
                        paginationUrl,
                        postUrl: getPostUrl(paginationUrl, postFileName),
                        update: update.replace(/\//g, "-"),
                    }
                })
        )
        .flat()

const getAllPaginationPath = async (category: string[]) =>
    await getAllPostMeta(await extractAllCategoryPostFileName(category))

const URL_PRIORITY = {
    post: 0.8,
    category: 0.4,
    categoryPagination: 0.2,
}

async function generateSitemap() {
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

    const categoryNameArray = await getAllCategoryPath()
    const categoryPathArray = categoryNameArray.map(addSiteUrlNotation)
    const categoryUrlSetArray = categoryPathArray.map((categoryPath) =>
        generateUrlSet(categoryPath, {
            changefreq: "monthly",
            priority: URL_PRIORITY.category,
        })
    )
    const totalPaginationPath = await getAllPaginationPath(categoryNameArray)
    const categoryPaginationPathArray = totalPaginationPath
        .map(({ paginationUrl }) => paginationUrl)
        .map(addSiteUrlNotation)
    const categoryPaginationUrlSetArray = categoryPaginationPathArray.map(
        (postPath) =>
            generateUrlSet(postPath, {
                changefreq: "daily",
                priority: URL_PRIORITY.categoryPagination,
            })
    )
    const postUrlSetArray = totalPaginationPath.map(({ postUrl, update }) =>
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

generateSitemap()
