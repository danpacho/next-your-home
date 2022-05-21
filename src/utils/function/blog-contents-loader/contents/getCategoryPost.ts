import { readFile, readdir } from "fs/promises"
import { serialize } from "next-mdx-remote/serialize"

import matter from "gray-matter"

import { MDXPostMetaType, PostMetaType } from "@typing/post/meta"
import { MDXCompiledSourceType } from "@typing/mdx"

import {
    CategoryPostContentType,
    PostContentType,
    PostControllerType,
    SpecificPostContentType,
} from "@typing/post/content"

import { SerializeOptions } from "next-mdx-remote/dist/types"

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
} from "@utils/function/blog-error-handler/blogError"

import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"

import rehypeKatex from "rehype-katex"
import rehypePrism from "rehype-prism-plus"

import { config } from "blog.config"

const splitStringByComma = (text: string) =>
    text.split(",").map((text) => text.trim())

/**
 * @param tags `[post-file-name].mdx`에서 추출된 `tags` meta
 * @returns transform `tags` to `string[]`
 */
const getTagArray = (tags: string): string[] => {
    if (!tags)
        throw new BlogPropertyError({
            errorNameDescription: "Error Occured while extracting post meta",
            propertyName: "tags",
            propertyType: "string",
            propertyDescription:
                "tags: tag1, tag2, tag3, ... be sure to divide tag with , ",
            customeErrorMessage: "[  ⬇️ post meta info ⬇️  ]",
        })

    return splitStringByComma(tags)
}

/**
 * @param useKatex `config` **useKatex** 옵션 참조,
 * @note `useKatex` 활성화시 수학 수식 katex 플러그인 작동
 */
const getMDXParserOptions = (
    useKatex: boolean
): SerializeOptions["mdxOptions"] => {
    const development = process.env.NODE_ENV === "development"
    if (useKatex) {
        return {
            format: "mdx",
            remarkPlugins: [remarkGfm, remarkMath],
            rehypePlugins: [rehypePrism, rehypeKatex],
            development,
        }
    }
    return {
        format: "mdx",
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypePrism],
        development,
    }
}

/**
 * @param compileSource 순수 `.mdx` 파일 내용
 * @note `config` **useKatex** 참조
 */
const transformPureContentToMDXCompileSource = async (
    compileSource: string
): Promise<MDXCompiledSourceType> => {
    try {
        const serializedSource = await serialize(compileSource, {
            mdxOptions: getMDXParserOptions(config.useKatex),
        })

        return serializedSource
    } catch (err) {
        throw new BlogErrorAdditionalInfo({
            passedError: err,
            errorNameDescription: ".mdx post file compile problem occured",
            message: "while compile .mdx file\n",
            customeErrorMessage:
                "[ Troubleshooting MDX, at mdx document ]\n\n https://mdxjs.com/docs/troubleshooting-mdx/",
        })
    }
}

interface CategoryPostFileNameType {
    category: string
    categoryPostFileNameArray: string[]
}
/**
 * @param categoryNameArray 전체 카테고리 이름
 * @returns `category` 카테고리 이름
 * @returns `categoryPostFileNameArray` 해당 카테고리 속 포스트 파일 이름
 * @exception `MacOs` remove `.DS_Store`
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

const sortByDate = (currDate: string, nextDate: string) => {
    const nextDateNumber = Number(nextDate.replace(/\//g, ""))
    const currDateNumber = Number(currDate.replace(/\//g, ""))

    if (currDateNumber < nextDateNumber) return 1
    if (currDateNumber > nextDateNumber) return -1
    return 0
}

/**
 * @param categoryPostFileNameArray `extractCategoryPostFileArray()`
 * @param compileToMDX `.mdx` 컴파일 선택 옵션
 * @returns 각 카테고리 포스트, `PostContent`형식으로 변환
 * @returns 전체 포스트, 최신 날짜 순 정렬 후 반환
 * @note `config` **postPerCategoryPage** 참조
 */
const extractAndTransformAllCategoryPostContent = async (
    categoryPostFileNameArray: CategoryPostFileNameType[],
    compileToMDX: true | false = true
): Promise<CategoryPostContentType[]> => {
    const CategoryPostContentArray = await Promise.all(
        categoryPostFileNameArray.map(
            async ({ category, categoryPostFileNameArray }) => {
                const postContentArray: PostContentType[] = (
                    await Promise.all(
                        categoryPostFileNameArray.map(
                            async (categoryPostFileName) => {
                                const postContentPath = `${blogContentsDirectory}/${category}/${POST_DIRECTORY_NAME}/${categoryPostFileName}`

                                try {
                                    const fileContent = await readFile(
                                        postContentPath,
                                        "utf-8"
                                    )
                                    if (!fileContent)
                                        throw new BlogFileExtractionError({
                                            errorNameDescription:
                                                "post file extraction error occured",
                                            readingFileFormat: ".mdx",
                                            readingFileLocation:
                                                postContentPath,
                                            readingFileName:
                                                categoryPostFileName,
                                        })

                                    const post = matter(fileContent)
                                    const content = post.content
                                    const meta = post.data as MDXPostMetaType

                                    const postMeta = {
                                        category,
                                        postUrl: categoryPostFileName,
                                        title: meta.title,
                                        author: meta.author,
                                        preview: meta.preview,
                                        update: meta.update,
                                        tags: getTagArray(meta.tags),
                                        postpone: meta?.postpone
                                            ? Boolean(meta.postpone)
                                            : false,
                                        reference: meta?.reference
                                            ? splitStringByComma(meta.reference)
                                            : null,
                                        color: getValidateColor(meta.color),
                                        postOrder: 1,
                                    } as PostMetaType

                                    const validationMeta = Object.entries(
                                        postMeta
                                    )
                                        .filter(([_, value]) => !value)
                                        .filter(
                                            ([key, _]) => key === "postpone"
                                        )
                                        .filter(
                                            ([key, _]) => key === "reference"
                                        )
                                        .filter(
                                            ([key, _]) => key === "postOrder"
                                        )
                                        .map(([metaKey, metaValue]) => {
                                            return {
                                                metaKey,
                                                metaValue,
                                            }
                                        })

                                    if (validationMeta.length !== 0)
                                        throw new BlogPropertyError({
                                            errorNameDescription:
                                                "extracting post meta",
                                            propertyName:
                                                validationMeta[0].metaKey,
                                            propertyType: "string",
                                            errorPropertyValue:
                                                validationMeta[0].metaValue,
                                            customeErrorMessage:
                                                "[  ⬇️ post meta info ⬇️  ]",
                                        })

                                    const postSource = compileToMDX
                                        ? await transformPureContentToMDXCompileSource(
                                              content
                                          )
                                        : content

                                    return {
                                        postMeta,
                                        postSource,
                                    }
                                } catch (err) {
                                    throw new BlogErrorAdditionalInfo({
                                        passedError: err,
                                        errorNameDescription:
                                            "post meta info 🔎 incorrections",
                                        message:
                                            "Post Should include\n\n      🔒 All Value Common RULE: [ NOT empty string: '' ]\n\n      ✅ title   : Post's Title\n      ✅ preview : Post's Preview\n      ✅ author  : Post author name\n      ✅ update  : [ yyyy/mm/dd ]\n                 : [🚨WARNING: SHOULD FOLLOW FORMAT]\n      ✅ color   : Post main color, HEX | RGB | RGBA\n                 : [🚨WARNING: WRAP YOUR COLOR WITH colon or semi-colon]\n      ✅ tags    : tag1, tag2, tag3, ...\n                 : [🚨WARNING: DIVIDE TAG WITH comma ,]\n",
                                        customeErrorMessage: `your post meta info at:\n\n   ${postContentPath}`,
                                    })
                                }
                            }
                        )
                    )
                )
                    .filter(({ postMeta: { postpone } }) => !postpone)
                    .sort(
                        (
                            { postMeta: { update: currDate } },
                            { postMeta: { update: nextDate } }
                        ) => sortByDate(currDate, nextDate)
                    )
                    .map((postContent, order) => {
                        const updatedPostContent: PostContentType = postContent
                        const postContentPath = postContent.postMeta.postUrl //*전에 임시로 저장한 postContentPath꺼내기

                        updatedPostContent.postMeta.postUrl = `/${category}/${Math.floor(
                            order / config.postPerCategoryPage + 1
                        )}/${removeFileFormat(postContentPath, "mdx")}`
                        updatedPostContent.postMeta.postOrder = order

                        return updatedPostContent
                    })

                return {
                    category,
                    postContentArray,
                    postNumber: postContentArray.length,
                }
            }
        )
    )
    return CategoryPostContentArray
}

/**
 * @returns 각 카테고리의 모든 포스팅 정보를 가공 한 후, 반환
 */
const getAllCategoryPostContent = async (
    compileToMDX: true | false = true
): Promise<CategoryPostContentType[]> =>
    await extractAndTransformAllCategoryPostContent(
        await extractAllCategoryPostFileName(await getAllCategoryName()),
        compileToMDX
    )

/**
 * @returns 전체 포스트 링크 url 반환
 */
const getAllCategoryPostContentPath = memo(config.useMemo, async () =>
    (await getAllCategoryPostContent(false)).flatMap(({ postContentArray }) =>
        postContentArray.map(({ postMeta: { postUrl } }) => postUrl)
    )
)

/**
 * @note **`pagination`** function
 * ---
 * @param category 포스트 meta 추출 카테고리
 * @param pageNumber 포스트 meta 추출 page
 * @return `page` param에 따라 반환하는 포스트
 * @note `config` **postPerCategoryPage** 참조
 */
const getSpecificCategoryPagePostMeta = memo(
    config.useMemo,
    async ({
        category,
        pageNumber,
    }: {
        category: string
        pageNumber: number
    }): Promise<PostMetaType[]> =>
        await (
            await getCategoryPostMeta(category)
        ).slice(
            (pageNumber - 1) * config.postPerCategoryPage,
            pageNumber * config.postPerCategoryPage
        )
)

/**
 * @note **`pagination`** function
 * ---
 * @returns 특정 카테고리 포스팅 `page` 갯수
 * @note `config` **postPerCategoryPage** 참조
 */
const getCategoryTotalPaginationNumber = memo(
    config.useMemo,
    async (category: string) =>
        Math.ceil(
            (await (
                await readdir(
                    `${blogContentsDirectory}/${category}/${POST_DIRECTORY_NAME}`,
                    "utf-8"
                )
            ).length) / config.postPerCategoryPage
        )
)

/**
 * @note **`pagination`** function
 * ---
 * @returns 모든 카테고리 pagination 링크 url
 */
const getAllCategoryPaginationPath = memo(config.useMemo, async () =>
    (
        await Promise.all(
            (
                await getAllCategoryName()
            ).map(async (category) => {
                const specificCategoryPaginationPath = Array.from(
                    {
                        length: await getCategoryTotalPaginationNumber(
                            category
                        ),
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

/**
 * @note **`pagination`** function
 * ---
 * @param specificPageCategoryPostContent 특정 `page`의 포스트
 * @returns 특정 `page`의 포스트 태그
 */
const getCategoryPaginationTag = memo(
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

/**
 * @note 특정 포스트 정보를 가져오는 함수
 *
 * @param categoryName 추출할 카테고리 이름
 * @param postTitle 추출할 포스트 이름
 * @param categoryPage 해당 포스트가 속한 카테고리의 page
 *
 * @return `postMeta` 포스트 meta 데이터
 * @return `postSource` 포스트 컴파일 소스
 * @return `postController` 이전포스트 - 현재 - 다음 포스트
 */

const getSpecificCategoryPostContent = memo(
    config.useMemo,
    async ({
        categoryName,
        categoryPage,
        postTitle,
    }: {
        categoryName: string
        postTitle: string
        categoryPage: number
    }): Promise<SpecificPostContentType> => {
        const specificCategoryPostContent = (await getAllCategoryPostContent())
            .find(({ category }) => category === categoryName)!
            .postContentArray.reduce<SpecificPostContentType>(
                (accPostContent, currValue, idx, totPost) => {
                    if (
                        currValue.postMeta.postUrl ===
                        `/${categoryName}/${categoryPage}/${postTitle}`
                    ) {
                        const isFirst = idx === 0
                        const prevPost = isFirst
                            ? {
                                  title: `${categoryName} 글 목록으로 돌아가기`,
                                  postUrl: `/${categoryName}`,
                              }
                            : {
                                  title: totPost[idx - 1].postMeta.title,
                                  postUrl: totPost[idx - 1].postMeta.postUrl,
                              }

                        const isLast = idx === totPost.length - 1
                        const nextPost = isLast
                            ? {
                                  title: `${categoryName}의 마지막 글이에요!`,
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
                            ...currValue,
                            postController,
                        }
                        return specificPostContent
                    }
                    return accPostContent
                },
                {} as SpecificPostContentType
            )
        return specificCategoryPostContent
    }
)

/**
 * @returns 모든 포스트 `meta` 데이터
 * @note `postpone` 포스트 제거
 */
const extractAllPostMeta = async (): Promise<PostMetaType[]> =>
    (await getAllCategoryPostContent(false))
        .flatMap(({ postContentArray }) => postContentArray)
        .map(({ postMeta }) => postMeta)

/**
 * @param categoryName 특정 카테고리
 * @returns 특정 카테고리의 포스트 `meta`
 */
const getCategoryPostMeta = async (
    categoryName: string
): Promise<PostMetaType[]> =>
    (await extractAllPostMeta()).filter(
        ({ category }) => category === categoryName
    )

/**
 * @returns 모든 포스트 중, 최신 포스트의 `meta` 데이터
 * @note `config` **numberOfLatestPost** 참조
 */
const getLatestPostMeta = memo(
    config.useMemo,
    async (): Promise<PostMetaType[]> =>
        (
            await (await extractAllPostMeta())
                .flat()
                .sort(({ update: currDate }, { update: nextDate }) =>
                    sortByDate(currDate, nextDate)
                )
        ).slice(0, config.numberOfLatestPost)
)

/**
 * @param categoryName 특정 카테고리
 * @returns 특정 카테고리 최신 포스트 `meta` 데이터
 * @note `config` **numberOfLatestPost** 참조
 */
const getSpecificCategoryLatestPostMeta = memo(
    config.useMemo,
    async (categoryName: string): Promise<PostMetaType[]> =>
        (await getCategoryPostMeta(categoryName)).slice(
            0,
            config.numberOfLatestPost
        )
)

export {
    //* /category
    getSpecificCategoryPagePostMeta,
    //* /category/[page]
    getCategoryTotalPaginationNumber,
    getAllCategoryPaginationPath,
    getCategoryPaginationTag,
    //* /category/[page]/[postTitle]
    getSpecificCategoryPostContent,
    //* meta - total | category | category of latest
    getLatestPostMeta,
    getCategoryPostMeta,
    getSpecificCategoryLatestPostMeta,
    //* post link url
    getAllCategoryPostContentPath,
    //* MDX compiler
    transformPureContentToMDXCompileSource,
}
