import {
    blogContentsDirectory,
    getValidateColor,
    removeFileFormat,
} from "../util"
import { getPureCategoryNameArray } from "./getCategory"

import { readFile, readdir } from "fs/promises"
import matter from "gray-matter"
import { serialize } from "next-mdx-remote/serialize"
import remarkGfm from "remark-gfm"

import { PostMetaType } from "@/types/post/meta"
import {
    CategoryPostContentType,
    PostContentType,
    PostControllerType,
    SpecificPostContentType,
} from "@/types/post/content"
import { MDXCompiledSourceType } from "@/types/mdx"

import {
    BlogErrorAdditionalInfo,
    BlogFileExtractionError,
    BlogPropertyError,
} from "../../blog-error-handler/blogError"

const transformContentToMDXCompileSource = async (
    compileSource: string
): Promise<MDXCompiledSourceType> => {
    try {
        const serializedSource = await serialize(compileSource, {
            mdxOptions: {
                format: "mdx",
                remarkPlugins: [remarkGfm],
                development: process.env.NODE_ENV === "development",
            },
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
    else return tags.split(",").map((tag) => tag.trim())
}

/**
 * @param dirPostInfo `extractCategoryPostFileArray()`로 추출한 값을 입력 받아 가공하는 함수
 * @param compileToMDX `.mdx` 파일 형식으로 컴파일 할 것인지, 선택형 인자
 * @returns 모든 카테고리의 콘텐츠를 `PostContent`형식으로 변환 한 후, 날짜 오름차순 정렬 후 반환
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

                            const { content, data } = matter(fileContent)

                            const postUrl = `/${category}/${removeFileFormat(
                                postFileName,
                                "mdx"
                            )}`

                            const postMeta = {
                                category,
                                postUrl,
                                title: data.title,
                                author: data.author,
                                preview: data.preview,
                                update: data.update,
                                tags: getTagArray(data.tags),
                                color: getValidateColor(data.color),
                            } as PostMetaType

                            //TODO: regex 변수를 함수 스코프 외부에서 선언시 정확히 테스트가 안됨, 접근이 불가능한 경우가 생기는것 같음
                            const validationMeta = Object.entries(postMeta)
                                .filter(
                                    ([_, value]) =>
                                        value === undefined || value === ""
                                )
                                .map(([metaKey, metaValue]) => ({
                                    metaKey,
                                    metaValue,
                                }))

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
                                    "Post Should include\n\n      🔒 All Value Common RULE: [ NOT empty string: '' ]\n\n      ✅ title   : Post's Title\n      ✅ preview : Post's Preview\n      ✅ update  : [ yyyy/mm/dd ] 📅 shold follow that format\n      ✅ author  : Post author name\n      ✅ color   : Post main color -> should be hex, if you activate useTXT config option\n      ✅ tags    : tag1, tag2, tag3, ... \n",
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
const getCategoryPostContentPathArray = async () =>
    (await getCategoryPostContentArray(false)).flatMap(({ postContentArray }) =>
        postContentArray.map(({ postMeta: { postUrl } }) => postUrl)
    )

/**
 * @note 특정 포스트 정보를 가져오는 함수
 * @param categoryName 추출할 카테고리 이름
 * @param postTitle 추출할 포스트 이름
 * @return `postMeta` `postSource` `postController`반환
 */
const getSpecificPostContent = async (
    categoryName: string,
    postTitle: string
): Promise<SpecificPostContentType> => {
    const specificCategoryPostContent = (await getCategoryPostContentArray())
        .filter(({ category }) => category === categoryName)[0]
        .postContentArray.reduce<SpecificPostContentType>(
            (acc, currValue, idx, totPost) => {
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
            },
            {} as SpecificPostContentType
        )
    return specificCategoryPostContent
}

/**
 * @note 각 포스트로 이동할 `PostMeta` 데이터 추출 반환, 날짜별로 오름치순 정렬
 */
const extractPostMeta = async (): Promise<PostMetaType[]> =>
    (await getCategoryPostContentArray(false))
        .flatMap(({ postContentArray }) => postContentArray)
        .map(({ postMeta }) => postMeta)
        .sort(
            ({ update: currUpdateDate }, { update: nextUpdateDate }) =>
                Number(nextUpdateDate.replaceAll("/", "")) -
                Number(currUpdateDate.replaceAll("/", ""))
        )

const DEFAULT_POST_NUMBER = 5
const getLatestPostMeta = async (
    postSliceNumber: number = DEFAULT_POST_NUMBER
): Promise<PostMetaType[]> =>
    (await extractPostMeta()).slice(0, postSliceNumber)

const getCategoryPostMeta = async (
    categoryName: string
): Promise<PostMetaType[]> =>
    (await extractPostMeta()).filter(
        ({ category }) => category === categoryName
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
