import { getPureCategoryNameArray } from "./getCategory"

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

import {
    blogContentsDirectory,
    getValidateColor,
    removeFileFormat,
} from "../util"

import {
    BlogErrorAdditionalInfo,
    BlogFileExtractionError,
    BlogPropertyError,
} from "@utils/function/blog-error-handler/blogError"

import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import config from "blog.config"

import memoize from "fast-memoize"

const getMdxOptions = (useKaTeX: boolean): SerializeOptions["mdxOptions"] => {
    if (useKaTeX) {
        return {
            format: "mdx",
            remarkPlugins: [remarkGfm, remarkMath],
            rehypePlugins: [rehypeKatex],
            development: process.env.NODE_ENV === "development",
        }
    }
    return {
        format: "mdx",
        remarkPlugins: [remarkGfm],
        development: process.env.NODE_ENV === "development",
    }
}

const transformContentToMDXCompileSource = async (
    compileSource: string
): Promise<MDXCompiledSourceType> => {
    try {
        const serializedSource = await serialize(compileSource, {
            mdxOptions: getMdxOptions(config.useKaTeX),
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

const POST_DIRECTORY_NAME = "posts"
interface DirPostInfo {
    category: string
    categoryPostFileArray: string[]
}
/**
 * @note 모든 카테고리의 포스트를 `dir: blog-contents`에서 추출하는 함수
 ---
 * @param 순수 카테고리 이름 `string[]`을 받는다
 * @returns 카테고리속 post이름과 해당 카테고리의 포스트 파일를 추출한다
 */
const extractCategoryPostFileArray = async (
    categoryNameArray: string[]
): Promise<DirPostInfo[]> => {
    const dirPostInfo: DirPostInfo[] = await Promise.all(
        categoryNameArray.map(async (categoryName) => {
            const categoryPostFilePath = `${blogContentsDirectory}/${categoryName}/${POST_DIRECTORY_NAME}`
            try {
                const categoryPostFileArray = await readdir(
                    categoryPostFilePath,
                    "utf-8"
                )
                return {
                    category: categoryName,
                    categoryPostFileArray,
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

/**
 * @returns 포스트의 순수 파일 이름을 받아온다, .mdx를 제거한 파일 이름 반환
 */
const getCategoryPostName = (postInfo: DirPostInfo[]): string[] =>
    postInfo.flatMap(({ categoryPostFileArray: categoryPostArray }) =>
        categoryPostArray.map((fileName) => removeFileFormat(fileName, "mdx"))
    )

const splitTextByComma = (text: string) =>
    text.split(",").map((text) => text.trim())

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
    else return splitTextByComma(tags)
}

/**
 * @param dirPostInfo `extractCategoryPostFileArray()`로 추출한 값을 입력 받아 가공하는 함수
 * @param compileToMDX `.mdx` 파일 형식으로 컴파일 할 것인지, 선택형 인자
 * @returns 모든 카테고리의 콘텐츠를 `PostContent`형식으로 변환 한 후, 날짜 내림차순 정렬 후 반환
 */
const transformCategoryPostFileArrayToPostContentArray = async (
    dirPostInfo: DirPostInfo[],
    compileToMDX: true | false = true
): Promise<CategoryPostContentType[]> => {
    const CategoryPostContentArray = await Promise.all(
        dirPostInfo.map(async ({ category, categoryPostFileArray }) => {
            const postContentArray: PostContentType[] = (
                await Promise.all(
                    categoryPostFileArray.map(async (postFileName) => {
                        const postContentPath = `${blogContentsDirectory}/${category}/${POST_DIRECTORY_NAME}/${postFileName}`

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
                                    readingFileLocation: postContentPath,
                                    readingFileName: postFileName,
                                })

                            const post = matter(fileContent)
                            const content = post.content
                            const meta = post.data as MDXPostMetaType

                            const postUrl = `/${category}/${removeFileFormat(
                                postFileName,
                                "mdx"
                            )}`

                            const postMeta = {
                                category,
                                postUrl,
                                title: meta.title,
                                author: meta.author,
                                preview: meta.preview,
                                update: meta.update,
                                tags: getTagArray(meta.tags),
                                postpone: meta?.postpone
                                    ? Boolean(meta.postpone)
                                    : false,
                                reference: meta?.reference
                                    ? splitTextByComma(meta.reference)
                                    : null,
                                color: getValidateColor(meta.color),
                            } as PostMetaType

                            const validationMeta = Object.entries(postMeta)
                                .filter(([_, value]) => !value)
                                .filter(([key, _]) => key === "postpone")
                                .filter(([key, _]) => key === "reference")
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
                                    propertyName: validationMeta[0].metaKey,
                                    propertyType: "string",
                                    errorPropertyValue:
                                        validationMeta[0].metaValue,
                                    customeErrorMessage:
                                        "[  ⬇️ post meta info ⬇️  ]",
                                })

                            const postSource = compileToMDX
                                ? await transformContentToMDXCompileSource(
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
                    })
                )
            ).sort(
                (
                    { postMeta: { update: currUpdateDate } },
                    { postMeta: { update: nextUpdateDate } }
                ) =>
                    Number(nextUpdateDate.replaceAll("/", "")) -
                    Number(currUpdateDate.replaceAll("/", ""))
            )

            return {
                category,
                postContentArray,
            }
        })
    )
    return CategoryPostContentArray
}

/**
 * @param compileToMDX `.mdx` 파일 형식으로 컴파일 할 것인지, 선택형 인자
 * @returns 각 카테고리의 모든 포스팅 정보를 반환
 */
const getCategoryPostContentArray = async (
    compileToMDX: true | false = true
): Promise<CategoryPostContentType[]> =>
    await transformCategoryPostFileArrayToPostContentArray(
        await extractCategoryPostFileArray(await getPureCategoryNameArray()),
        compileToMDX
    )

/**
 * @returns 모든 포스트의 url 배열 반환 `postUrl[]`
 */
const getCategoryPostContentPathArray = memoize(async () =>
    (await getCategoryPostContentArray(false)).flatMap(({ postContentArray }) =>
        postContentArray
            .filter(({ postMeta: { postpone } }) => !postpone)
            .map(({ postMeta: { postUrl } }) => postUrl)
    )
)

/**
 * @note 특정 포스트 정보를 가져오는 함수
 * @param categoryName 추출할 카테고리 이름
 * @param postTitle 추출할 포스트 이름
 * @return `postMeta` `postSource` `postController`반환
 */
const getSpecificPostContent = memoize(
    async (
        categoryName: string,
        postTitle: string
    ): Promise<SpecificPostContentType> => {
        const specificCategoryPostContent = (
            await getCategoryPostContentArray()
        )
            .filter(({ category }) => category === categoryName)[0]
            .postContentArray.filter(({ postMeta: { postpone } }) => !postpone)
            .reduce<SpecificPostContentType>((acc, currValue, idx, totPost) => {
                if (
                    currValue.postMeta.postUrl ===
                    `/${categoryName}/${postTitle}`
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
                return acc
            }, {} as SpecificPostContentType)
        return specificCategoryPostContent
    }
)

/**
 * @note 각 포스트로 이동할 `PostMeta` 데이터 추출 반환, 날짜별로 오름치순 정렬
 */
const extractPostMeta = async (): Promise<PostMetaType[]> =>
    (await await getCategoryPostContentArray(false))
        .flatMap(({ postContentArray }) => postContentArray)
        .map(({ postMeta }) => postMeta)
        .filter(({ postpone }) => !postpone)
        .sort(
            ({ update: currUpdateDate }, { update: nextUpdateDate }) =>
                Number(nextUpdateDate.replaceAll("/", "")) -
                Number(currUpdateDate.replaceAll("/", ""))
        )

const DEFAULT_POST_NUMBER = 5
const getLatestPostMeta = memoize(
    async (
        postSliceNumber: number = DEFAULT_POST_NUMBER
    ): Promise<PostMetaType[]> =>
        (await extractPostMeta()).slice(0, postSliceNumber)
)

const getCategoryPostMeta = memoize(
    async (categoryName: string): Promise<PostMetaType[]> =>
        (await extractPostMeta()).filter(
            ({ category }) => category === categoryName
        )
)

export {
    //* post content
    getSpecificPostContent,
    //* meta
    getLatestPostMeta,
    getCategoryPostMeta,
    //* post url path array
    getCategoryPostContentPathArray,
}
