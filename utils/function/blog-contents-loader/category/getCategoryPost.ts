import { blogContentsDirectory, removeFileFormat } from "../common/commonUtils"
import { getPureCategoryName } from "./getCategory"

import { readdirSync } from "fs"
import { readFile } from "fs/promises"
import matter from "gray-matter"
import { serialize } from "next-mdx-remote/serialize"

import { PostMetaType } from "@/utils/types/main/postMeta"
import {
    CategoryPostContent,
    PostContent,
    PostController,
    SpecificPostContent,
} from "@/utils/types/main/postContent"
import { MDXCompiledSource } from "@/utils/types/md/md"

const transformContentToMDXCompileSource = async (
    compileSource: string
): Promise<MDXCompiledSource> => await serialize(compileSource)

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
): Promise<DirPostInfo[]> =>
    await Promise.all(
        categoryNameArray.map(async (categoryName) => {
            const categoryPostFileArray = await readdirSync(
                `${blogContentsDirectory}/${categoryName}/${POST_DIRECTORY_NAME}`
            )
            return {
                category: categoryName,
                categoryPostFileArray,
            }
        })
    )

/**
 * @returns 포스트의 순수 파일 이름을 받아온다, .mdx를 제거한 파일 이름 반환
 */
const getCategoryPostName = (postInfo: DirPostInfo[]): string[] =>
    postInfo.flatMap(({ categoryPostFileArray: categoryPostArray }) =>
        categoryPostArray.map((fileName) => removeFileFormat(fileName, "mdx"))
    )
const getTagArray = (tag: string): string[] =>
    tag.split(",").map((tag) => tag.trim())

/**
 * @param dirPostInfo `extractCategoryPostFileArray()`로 추출한 값을 입력 받아 가공하는 함수
 * @param compileToMDX `.mdx` 파일 형식으로 컴파일 할 것인지, 선택형 인자
 * @returns 모든 카테고리의 콘텐츠를 `PostContent`형식으로 변환 한 후, 날짜 오름차순 정렬 후 반환
 */
const transformCategoryPostFileArrayToPostContentArray = async (
    dirPostInfo: DirPostInfo[],
    compileToMDX: true | false = true
): Promise<CategoryPostContent[]> => {
    const CategoryPostContentArray = await Promise.all(
        dirPostInfo.map(async ({ category, categoryPostFileArray }) => {
            const postContentArray: PostContent[] = await (
                await Promise.all(
                    categoryPostFileArray.map(async (postFileName) => {
                        const postContentPath = `${blogContentsDirectory}/${category}/${POST_DIRECTORY_NAME}/${postFileName}`
                        const fileContent = await readFile(
                            postContentPath,
                            "utf-8"
                        )
                        const { content, data } = matter(fileContent)

                        const postUrl = `/${category}/${removeFileFormat(
                            postFileName,
                            "mdx"
                        )}`
                        const postMeta = {
                            ...data,
                            tags: getTagArray(data?.tags),
                            category,
                            postUrl,
                        } as PostMetaType

                        const postSource = compileToMDX
                            ? await transformContentToMDXCompileSource(content)
                            : content

                        return {
                            postMeta,
                            postSource,
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
): Promise<CategoryPostContent[]> =>
    await await transformCategoryPostFileArrayToPostContentArray(
        await extractCategoryPostFileArray(await getPureCategoryName()),
        compileToMDX
    )

/**
 * @returns 모든 포스트의 url 배열 반환 `postUrl[]`
 */
const getCategoryPostContentPathArray = async () =>
    await (
        await getCategoryPostContentArray(false)
    ).flatMap(({ postContentArray }) =>
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
): Promise<SpecificPostContent> => {
    const specificCategoryPostContent = (await getCategoryPostContentArray())
        .filter(({ category }) => category === categoryName)[0]
        .postContentArray.reduce<SpecificPostContent>(
            (acc, currValue, idx, totPost) => {
                if (
                    currValue.postMeta.postUrl ===
                    `/${categoryName}/${postTitle}`
                ) {
                    const isFirst = idx === 0
                    const prevPost = isFirst
                        ? {
                              title: "홈으로 돌아가기",
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

                    const postController: PostController = {
                        prevPost,
                        nextPost,
                    }
                    const specificPostContent: SpecificPostContent = {
                        ...currValue,
                        postController,
                    }
                    return specificPostContent
                }
                return acc
            },
            {} as SpecificPostContent
        )
    return specificCategoryPostContent
}

/**
 * @note 각 포스트로 이동할 `PostMeta` 데이터 추출 반환, 날짜별로 정렬
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
