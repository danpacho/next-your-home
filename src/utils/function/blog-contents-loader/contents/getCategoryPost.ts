import path from "path"
import { cwd } from "process"
import { readFile, readdir } from "fs/promises"

import {
    MDXPostMetaType,
    PostMetaType,
    PostSeriesMetaType,
} from "@typing/post/meta"

import {
    PostType,
    PostContentType,
    PostControllerType,
    SpecificPostContentType,
} from "@typing/post/content"

import { SeriesInfoType, SeriesInfoObjectType } from "@typing/post/series"

import { POST_DIRECTORY_NAME, MAC_OS_FILE_EXCEPTION } from "@constants/index"

import {
    addPathNotation,
    blogContentsDirectory,
    getValidateColor,
    removeFileFormat,
    memo,
} from "@utils/function/blog-contents-loader/util"

import { getAllCategoryName } from "@utils/function/blog-contents-loader/contents/getCategory"

import {
    BlogErrorAdditionalInfo,
    BlogFileExtractionError,
    BlogPropertyError,
} from "@utils/function/blog-error-handler"

import matter from "gray-matter"

import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import {
    getTableOfContents,
    remarkAutomaticImageSize,
    TableOfContents,
} from "@lib/unified/remark"

import rehypeKatex from "rehype-katex"
import rehypePrism from "rehype-prism-plus"
import { rehypeHeaderId } from "@lib/unified/rehype"

import { bundleMDX } from "mdx-bundler"

import { config } from "blog.config"

//* ----------------------------- 🔥 utils 🔥 -----------------------------
/**
 * @param currDate `YYYY/MM/DD`
 * @param nextDate `YYYY/MM/DD`
 * @returns sort ascending
 */
const sortByDate = (currDate: string, nextDate: string) => {
    const nextDateNumber = Number(nextDate.replace(/\//g, ""))
    const currDateNumber = Number(currDate.replace(/\//g, ""))

    if (currDateNumber < nextDateNumber) return 1
    if (currDateNumber > nextDateNumber) return -1
    return 0
}

const splitStringByComma = (text: string) =>
    text.split(",").map((text) => text.trim())

/**
 * @param tags extracted from `postFileName.mdx` at tags` meta
 * @returns transform `tags` to `string[]`
 */
const getTagArray = (tags: string, postFileName: string): string[] => {
    if (!tags)
        throw new BlogPropertyError({
            errorNameDescription: "Error Occured while extracting post meta",
            propertyName: "tags",
            propertyType: "string",
            errorDirectory: postFileName,
            propertyDescription:
                "tags: tag1, tag2, tag3, ... be sure to divide tag with , ",
        })

    return splitStringByComma(tags)
}

//* ----------------------------- 🔥 serializer 🔥 -----------------------------

const updatePostUrlForPagination = (postMeta: PostMetaType, order: number) => ({
    ...postMeta,
    postUrl: `/${postMeta.category}/${Math.floor(
        order / config.postPerCategoryPage + 1
    )}/${removeFileFormat(postMeta.postFileName, "mdx")}`,
})

const updatePostOrder = (
    postMeta: PostMetaType,
    order: number
): PostMetaType => ({ ...postMeta, postOrder: order })

/**
 * serialize by date
 * serialize by pagination
 * check `config.postPerCategoryPage` option for pagination
 * @param categoryPostFileNameArray `extractCategoryPostFileArray()`
 */
const serializeAllPost = async (
    categoryPostFileNameArray: CategoryPostFileNameType[]
): Promise<PostType[]> => {
    const serializeAllPost: PostType[] = await Promise.all(
        categoryPostFileNameArray.map(
            async ({ category, categoryPostFileNameArray }) => {
                const extractedAllPost = (
                    await categoryPostFileNameArray.reduce<
                        Promise<PostContentType[]>
                    >(async (acc, postFileName) => {
                        const postPath = `${blogContentsDirectory}/${category}/${POST_DIRECTORY_NAME}/${postFileName}`

                        try {
                            const { bundledSource, meta, toc } =
                                await getPostInfo({
                                    category,
                                    path: postPath,
                                    fileName: postFileName,
                                })
                            if (meta)
                                return [
                                    ...(await acc),
                                    {
                                        postMeta: meta,
                                        postSource: bundledSource,
                                        toc,
                                    },
                                ]

                            return await acc
                        } catch (err) {
                            throw new BlogErrorAdditionalInfo({
                                passedError: err,
                                errorNameDescription:
                                    "Might be post meta info 🔎 incorrections",
                                message:
                                    "Post Should include\n\n      🔒 All Value Common RULE: [ NOT empty string: '' ]\n\n      ✅ title   : Post's Title\n      ✅ preview : Post's Preview\n      ✅ author  : Post author name\n      ✅ update  : [ yyyy/mm/dd ]\n                 : [🚨WARNING: SHOULD FOLLOW FORMAT]\n      ✅ color   : Post main color, HEX | RGB | RGBA\n                 : [🚨WARNING: WRAP YOUR COLOR WITH colon or semi-colon]\n      ✅ tags    : tag1, tag2, tag3, ...\n                 : [🚨WARNING: DIVIDE TAG WITH comma ,]\n",
                                customeErrorMessage: `your post meta info at:\n\n   ${postPath}`,
                            })
                        }
                    }, Promise.resolve([] as PostContentType[]))
                )
                    .sort(
                        (
                            { postMeta: { update: currDate } },
                            { postMeta: { update: nextDate } }
                        ) => sortByDate(currDate, nextDate)
                    )
                    .map(({ postMeta, postSource, toc }, order) => ({
                        postMeta: updatePostUrlForPagination(postMeta, order), //* update property for pagination
                        postSource,
                        toc,
                    }))

                return {
                    category,
                    postContentArray: extractedAllPost,
                    postNumber: extractedAllPost.length,
                }
            }
        )
    )

    return serializeAllPost
}

//* ----------------------------- 🔥 extract file 🔥 -----------------------------

interface CategoryPostFileNameType {
    category: string
    categoryPostFileNameArray: string[]
}
/**
 * @param categoryNameArray all category name
 * @returns `category`: category name
 * @returns `categoryPostFileNameArray`: `postFileName` of category
 */
const extractAllCategoryPostFileName = async (
    categoryNameArray: string[]
): Promise<CategoryPostFileNameType[]> => {
    const dirPostInfo: CategoryPostFileNameType[] = await Promise.all(
        categoryNameArray.map(async (categoryName) => {
            const categoryPostFilePath = `${blogContentsDirectory}/${categoryName}/${POST_DIRECTORY_NAME}`
            try {
                const categoryPostFileNameArray = (
                    await readdir(categoryPostFilePath, "utf-8")
                ).filter(
                    (postFileName) => postFileName !== MAC_OS_FILE_EXCEPTION
                )
                return {
                    category: categoryName,
                    categoryPostFileNameArray,
                }
            } catch (err) {
                throw new BlogErrorAdditionalInfo({
                    passedError: err,
                    errorNameDescription:
                        "[category -> posts] directory name 📝 incorrection",
                    message: `Track file's directory: ${categoryPostFilePath}`,
                })
            }
        })
    )
    return dirPostInfo
}
//* ----------------------------- 🔥 bundler 🔥 -----------------------------
/**
 * remark & rehype plugins
 */
const definePlugins = ({
    rehypePlugins,
    remarkPlugins,
}: {
    rehypePlugins: any[]
    remarkPlugins: any[]
}) => ({
    rehypePlugins,
    remarkPlugins,
})
/**
 * bundling MDX source with mdx-bundler
 */
const bundlePost = async <MetaType>({ postSource }: { postSource: string }) => {
    //* plugin of blog
    const customPlugin = config.useKatex
        ? definePlugins({
              rehypePlugins: [rehypePrism, rehypeKatex, rehypeHeaderId],
              remarkPlugins: [remarkAutomaticImageSize, remarkGfm, remarkMath],
          })
        : definePlugins({
              rehypePlugins: [rehypePrism, rehypeHeaderId],
              remarkPlugins: [remarkAutomaticImageSize, remarkGfm],
          })

    //* ES Build env config: https://www.alaycock.co.uk/2021/03/mdx-bundler#esbuild-executable
    if (process.platform === "win32") {
        process.env.ESBUILD_BINARY_PATH = path.join(
            process.cwd(),
            "node_modules",
            "esbuild",
            "esbuild.exe"
        )
    } else {
        process.env.ESBUILD_BINARY_PATH = path.join(
            process.cwd(),
            "node_modules",
            "esbuild",
            "bin",
            "esbuild"
        )
    }

    const bundledResult = await bundleMDX<MetaType>({
        source: postSource,
        cwd: path.join(cwd(), "src/components"),
        mdxOptions(options, frontmatter) {
            options.remarkPlugins = [
                ...(options.remarkPlugins ?? []),
                ...customPlugin.remarkPlugins,
            ]
            options.rehypePlugins = [
                ...(options.rehypePlugins ?? []),
                ...customPlugin.rehypePlugins,
            ]
            return options
        },
    })

    if (!bundledResult)
        throw new BlogFileExtractionError({
            errorNameDescription: "MDX Bundle Error",
            readingFileFormat: ".mdx",
            readingFileLocation: "❓",
            readingFileName: "❓",
        })

    const toc = getTableOfContents(postSource) //* toc on server-side

    return {
        bundledResult,
        toc,
    }
}
//* ----------------------------- 🔥 post 🔥 -----------------------------

const getPostInfo = async ({
    category,
    fileName,
    path,
}: {
    category: string
    fileName: string
    path: string
}): Promise<{
    bundledSource: string
    meta: void | PostMetaType
    toc: TableOfContents[]
}> => {
    const postSource = await readFile(path, "utf-8")
    if (!postSource)
        throw new BlogFileExtractionError({
            errorNameDescription: "post file extraction error occured",
            readingFileFormat: ".mdx",
            readingFileLocation: path,
            readingFileName: fileName,
        })

    const {
        bundledResult: { code: bundledSource, frontmatter: extractedMeta },
        toc,
    } = await bundlePost<MDXPostMetaType>({
        postSource,
    })

    const meta = generatePostMeta({
        extractedMeta,
        category,
        postFileName: fileName,
    })

    return {
        bundledSource,
        meta,
        toc,
    }
}

/**
 * get specific post {@link SpecificPostContentType}
 */
const getSpecificCategoryPost = async ({
    categoryName,
    categoryPage,
    postTitle,
}: {
    categoryName: string
    categoryPage: number
    postTitle: string
}): Promise<SpecificPostContentType> => {
    const post = (await getAllCategoryPost())
        .find(({ category }) => category === categoryName)! //* It is definitely exsists, non-nullable
        .postContentArray.reduce<SpecificPostContentType>(
            (post, currPost, idx, totPost) => {
                if (
                    currPost.postMeta.postUrl ===
                    `/${categoryName}/${categoryPage}/${postTitle}`
                ) {
                    const isFirst = idx === 0
                    const isLast = idx === totPost.length - 1

                    const prevPost = isFirst
                        ? {
                              title: `Return to ${categoryName}`,
                              postUrl: `/${categoryName}`,
                          }
                        : {
                              title: totPost[idx - 1].postMeta.title,
                              postUrl: totPost[idx - 1].postMeta.postUrl,
                          }
                    const nextPost = isLast
                        ? {
                              title: `Last post of ${categoryName}!`,
                              postUrl: `/${categoryName}`,
                          }
                        : {
                              title: totPost[idx + 1].postMeta.title,
                              postUrl: totPost[idx + 1].postMeta.postUrl,
                          }

                    const postController: PostControllerType = {
                        prevPost,
                        nextPost,
                    }
                    const specificPostContent: SpecificPostContentType = {
                        ...currPost,
                        postController,
                    }
                    return specificPostContent
                }
                return post
            },
            {} as SpecificPostContentType
        )
    return post
}

const getAllCategoryPost = async (): Promise<PostType[]> =>
    await serializeAllPost(
        await extractAllCategoryPostFileName(await getAllCategoryName())
    )

//* ----------------------------- 🔥 path 🔥 -----------------------------

const getAllCategoryPostPath = memo(config.useMemo, async () =>
    (await getAllPostMeta()).map(({ postUrl }) => postUrl)
)

const getAllCategoryPaginationPath = memo(config.useMemo, async () =>
    (
        await Promise.all(
            (
                await getAllCategoryName()
            ).map(async (category) => {
                const specificCategoryPaginationPath = Array.from(
                    {
                        length: await getPageNumberOfCategory(category),
                    },
                    (_, i) => i + 1
                ).map((pageNumber) =>
                    addPathNotation(`${category}/${pageNumber}`)
                )
                return specificCategoryPaginationPath
            })
        )
    ).flat()
)

//* ----------------------------- 🔥 page number 🔥 -----------------------------

const getPageNumberOfCategory = memo(config.useMemo, async (category: string) =>
    Math.ceil(
        (await (
            await readdir(
                `${blogContentsDirectory}/${category}/${POST_DIRECTORY_NAME}`,
                "utf-8"
            )
        ).length) / config.postPerCategoryPage
    )
)
//* ----------------------------- 🔥 tag 🔥 -----------------------------

const getTagOfSpecificCategoryPage = memo(
    config.useMemo,
    (specificPageCategoryPostContent: PostMetaType[]) => {
        const deduplicatedSpecificCategoryPageTagArray = [
            ...new Set(
                specificPageCategoryPostContent.flatMap(({ tags }) => tags)
            ),
        ].sort()

        return deduplicatedSpecificCategoryPageTagArray
    }
)

//* ----------------------------- 🔥 series 🔥 -----------------------------
/**
 * @param pureSeriesString `{seriesTitle}-{order}`, should follow this format
 * @param postFileName file name of post
 * @returns `seriesTitle`
 * @returns `order`
 */
const getSeriesInfo = (
    pureSeriesString: string,
    postFileName: string
): PostSeriesMetaType => {
    const splitByHypen = pureSeriesString.split("-")

    if (splitByHypen.length !== 2)
        throw new BlogPropertyError({
            propertyName: "series",
            propertyType: "Object",
            errorDirectory: postFileName,
            errorNameDescription: "series meta type error",
            propertyDescription: `your input -> series: ${pureSeriesString}`,
            customeErrorMessage:
                "Should follow format: < series: [series_title: string]-[series_order: number] >",
        })
    const [seriesTitle, order] = splitByHypen

    if (isNaN(Number(order)))
        throw new BlogPropertyError({
            propertyName: "series",
            propertyType: "Object",
            errorDirectory: postFileName,
            errorNameDescription: "series meta type error",
            customeErrorMessage:
                "Should follow format: < series: [series_title: string]-[series_order: number] >",
            propertyDescription: `series: ${seriesTitle}-${order}`,
        })

    const postSeriesMeta: PostSeriesMetaType = {
        seriesTitle,
        order: Number(order),
    }
    return postSeriesMeta
}

const transformCategorySeriesInfo = (categoryPostMeta: PostMetaType[]) => {
    const seriesMetaArray = getAllCategorySeriesMeta(categoryPostMeta)

    const seriesInfo = seriesMetaArray
        .map((seriesMeta) =>
            seriesMeta.reduce<SeriesInfoObjectType[]>(
                (acc, curr, order, tot) => {
                    if (curr.series === null) return acc

                    const updatedCurr = {
                        ...curr.series,
                        postTitle: curr.title,
                        color: curr.color,
                        url: curr.postUrl,
                        prevUrl: tot[order - 1]?.postUrl ?? null,
                        nextUrl: tot[order + 1]?.postUrl ?? null,
                    }
                    return [...acc, updatedCurr]
                },
                []
            )
        )
        .map((seriesInfo) =>
            seriesInfo.reduce<SeriesInfoType>(
                (__, { seriesTitle }, _, seriesInfo) => ({
                    seriesTitle,
                    seriesInfo,
                }),
                {} as SeriesInfoType
            )
        )
        .filter(({ seriesInfo }) => seriesInfo.length !== 1) //* number of series is more than 2
        .sort(
            (
                { seriesTitle: firstSeriesTitle },
                { seriesTitle: secondSeriesTitle }
            ) => firstSeriesTitle.localeCompare(secondSeriesTitle, ["ko", "en"])
        )
    return seriesInfo
}

interface ExtractedSeriesData
    extends Pick<PostMetaType, "color" | "postUrl" | "title"> {
    series: PostSeriesMetaType
}
const getAllCategorySeriesMeta = (categoryPostMeta: PostMetaType[]) => {
    const filteredBySeriesExsistance = categoryPostMeta.reduce<
        ExtractedSeriesData[]
    >((acc, { series, color, title, postUrl }) => {
        if (series === null) return acc
        return [
            ...acc,
            {
                series,
                color,
                title,
                postUrl,
            },
        ]
    }, [])
    const seriesTitle = [
        ...new Set(
            filteredBySeriesExsistance.map(
                ({ series: { seriesTitle } }) => seriesTitle
            )
        ),
    ]
    const seriesMeta = seriesTitle.map((title) =>
        filteredBySeriesExsistance
            .filter(({ series: { seriesTitle } }) => seriesTitle === title)
            .sort((a, b) => a.series.order - b.series.order)
    )

    return seriesMeta
}

const getCategorySeriesInfo = (categoryPostMeta: PostMetaType[]) =>
    transformCategorySeriesInfo(categoryPostMeta)

const getSpecificCategorySeriesInfo = async (
    postSeriesTitle: string,
    categoryPostMeta: PostMetaType[]
) => {
    const seriesInfo = (await getCategorySeriesInfo(categoryPostMeta)).find(
        ({ seriesTitle }) => seriesTitle === postSeriesTitle
    )
    return seriesInfo ?? null
}

//* ----------------------------- 🔥 meta 🔥 -----------------------------
/**
 * extract pure meta from `{postFileName}.mdx`
 */
const extractPostMeta = async ({
    category,
    postFileName,
}: {
    category: string
    postFileName: string
}) => {
    const postUrl = `${blogContentsDirectory}/${category}/${POST_DIRECTORY_NAME}/${postFileName}`
    const postSource = await readFile(postUrl, "utf-8")
    if (!postSource)
        throw new BlogFileExtractionError({
            errorNameDescription: "post file",
            readingFileFormat: ".mdx",
            readingFileLocation: postUrl,
            readingFileName: postFileName,
        })

    const extractedMeta = matter(postSource).data as MDXPostMetaType
    const postMeta = generatePostMeta({
        extractedMeta,
        category,
        postFileName,
    })

    return postMeta
}

const generatePostMeta = ({
    extractedMeta,
    category,
    postFileName,
}: {
    extractedMeta: MDXPostMetaType
    category: string
    postFileName: string
}): PostMetaType | void => {
    if (Boolean(extractedMeta.postpone) === true) return //* don't have to generate meta when postpone === true

    const postMeta = {
        ...extractedMeta,
        category,
        postFileName,
        postUrl: "", //* temporary set empty string for pagination
        postOrder: 0, //* temporary set 0 for pagination
        tags: getTagArray(extractedMeta.tags, postFileName),
        postpone: false,
        reference: extractedMeta?.reference
            ? splitStringByComma(extractedMeta.reference)
            : null,
        color: getValidateColor(extractedMeta.color),
        series: extractedMeta?.series
            ? getSeriesInfo(extractedMeta.series, postFileName)
            : null,
    } as PostMetaType

    const validationMeta = Object.entries(postMeta)
        .filter(([_, value]) => !value)
        .filter(([key, _]) => key === "postpone")
        .filter(([key, _]) => key === "reference")
        .filter(([key, _]) => key === "postOrder")
        .map(([metaKey, metaValue]) => ({
            metaKey,
            metaValue,
        }))

    if (validationMeta.length !== 0)
        throw new BlogPropertyError({
            propertyName: validationMeta[0].metaKey,
            propertyType: "string",
            errorDirectory: postFileName,
            errorNameDescription: "extracting post meta",
            errorPropertyValue: validationMeta[0].metaValue,
            customeErrorMessage: "[  ⬇️ post meta info ⬇️  ]",
        })

    return postMeta
}
/**
 * @returns 모든 포스트 `meta` 데이터
 * @note `postpone` 포스트 제거
 */
const extractAllPostMeta = async (
    categoryPostFileNameArray: CategoryPostFileNameType[]
) => {
    const allPostMeta = (
        await Promise.all(
            categoryPostFileNameArray.map(
                ({ category, categoryPostFileNameArray }) =>
                    categoryPostFileNameArray.reduce<Promise<PostMetaType[]>>(
                        async (acc, postFileName) => {
                            const purePostMeta = await extractPostMeta({
                                category,
                                postFileName,
                            })
                            if (purePostMeta)
                                return [...(await acc), purePostMeta]

                            return await acc
                        },
                        Promise.resolve([] as PostMetaType[])
                    )
            )
        )
    )
        .map(
            (unUpdatedAllPostMeta) =>
                unUpdatedAllPostMeta
                    .sort((prev, curr) => sortByDate(prev.update, curr.update)) //* update: sort by date
                    .map(updatePostUrlForPagination) //* update: pagination
        )
        .flat()

    return allPostMeta
}

const getAllPostMeta = async () =>
    await extractAllPostMeta(
        await extractAllCategoryPostFileName(await getAllCategoryName())
    )

const getLatestPostMeta = memo(
    config.useMemo,
    async (): Promise<PostMetaType[]> =>
        (await getAllPostMeta())
            .sort((prev, current) => sortByDate(prev.update, current.update))
            .slice(0, config.numberOfLatestPost)
            .map(updatePostOrder)
)

const getCategoryLatestPostMeta = (
    categoryPostMeta: PostMetaType[]
): PostMetaType[] => categoryPostMeta.slice(0, config.numberOfLatestPost)

const getCategoryAllPostMeta = async (
    categoryName: string
): Promise<PostMetaType[]> =>
    (await getAllPostMeta())
        .filter(({ category }) => category === categoryName)
        .map(updatePostOrder)

/**
 * @param category meta extraction category
 * @param pageNumber meta extraction page-number
 */
const getSpecificPostMeta = memo(
    config.useMemo,
    async ({
        category,
        pageNumber,
    }: {
        category: string
        pageNumber: number
    }): Promise<PostMetaType[]> =>
        await (
            await getCategoryAllPostMeta(category)
        ).slice(
            (pageNumber - 1) * config.postPerCategoryPage,
            pageNumber * config.postPerCategoryPage
        )
)

//* ----------------------------- 🔥 export 🔥 -----------------------------
export {
    //* bundleMDX
    bundlePost,
    //* pagination
    getPageNumberOfCategory,
    //* post
    getSpecificCategoryPost,
    //* tag
    getTagOfSpecificCategoryPage,
    //* meta
    getLatestPostMeta,
    getCategoryLatestPostMeta,
    getCategoryAllPostMeta,
    getSpecificPostMeta,
    //* series
    getCategorySeriesInfo,
    getSpecificCategorySeriesInfo,
    //* getStaticPath
    getAllCategoryPaginationPath,
    getAllCategoryPostPath,
}
