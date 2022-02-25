import {
    blogContentsDirectory,
    removeFileFormat,
} from "../../common/commonUtils"
import { getPureCategoryName } from "../getCategory"

import { readdirSync } from "fs"
import { readFile } from "fs/promises"
import matter from "gray-matter"
import { serialize } from "next-mdx-remote/serialize"

import { PostMeta } from "@utils/types/main/meta"
import { PostContent } from "@utils/types/main/post"
import { MDXCompiledSource } from "@utils/types/mdx/mdx"

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
const getCategoryPostName = (postInfo: DirPostInfo[]): string[][] =>
    postInfo.map(({ categoryPostFileArray: categoryPostArray }) =>
        categoryPostArray.map((fileName) => removeFileFormat(fileName, "mdx"))
    )

/**
 * @param dirPostInfo `extractCategoryPostFileArray()`로 추출한 값을 입력 받아 가공하는 함수
 * @param compileToMDX `.mdx` 파일 형식으로 컴파일 할 것인지, 선택형 인자
 * @returns 모든 카테고리의 콘텐츠를 `PostContent`형식으로 변환 한 후, 반환
 */
const transformCategoryPostFileArrayToPostContentArray = async (
    dirPostInfo: DirPostInfo[],
    compileToMDX: true | false = true
): Promise<PostContent[]> => {
    const postContentInfoArray = await Promise.all(
        dirPostInfo.map(async ({ category, categoryPostFileArray }) => {
            const postContentArray = await Promise.all(
                categoryPostFileArray.map(async (postFileName) => {
                    const postUrl = `/${category}/${removeFileFormat(
                        postFileName,
                        "mdx"
                    )}`
                    const postContentPath = `${blogContentsDirectory}/${category}/${POST_DIRECTORY_NAME}/${postFileName}`

                    const fileContent = await readFile(postContentPath, "utf-8")
                    const { content, data: meta } = matter(fileContent)
                    const postContent = compileToMDX
                        ? await transformContentToMDXCompileSource(content)
                        : content

                    return {
                        postMeta: {
                            //* 인수를 지정, 인자 추정 가능
                            title: meta?.title,
                            preview: meta?.preview,
                            update: meta?.update,
                            author: meta?.author,
                            color: meta?.color,
                            category,
                        },
                        postContent,
                        postUrl,
                    }
                })
            )
            return {
                category,
                contentsInfo: postContentArray,
            }
        })
    )
    return postContentInfoArray
}

/**
 * @param compileToMDX `.mdx` 파일 형식으로 컴파일 할 것인지, 선택형 인자
 * @returns 각 카테고리의 모든 포스팅 정보를 반환
 */
const getCategoryPostContentArray = async (
    compileToMDX: true | false = true
): Promise<PostContent[]> =>
    await await transformCategoryPostFileArrayToPostContentArray(
        await extractCategoryPostFileArray(await getPureCategoryName()),
        compileToMDX
    )

/**
 * @note 특정 카테고리의 `PostContent`만을 가져오는 함수
 * @param categoryName 추출할 카테고리 이름
 */
const getCategoryPostContent = async (
    categoryName: string
): Promise<PostContent> =>
    (await getCategoryPostContentArray()).filter(
        ({ category }) => category === categoryName
    )[0]

/**
 * @note 각 포스트로 이동할 `PostMeta` 데이터 추출 반환
 */
const extractPostMeta = async (): Promise<PostMeta[]> =>
    (await getCategoryPostContentArray(false))
        .flatMap(({ contentsInfo }) => contentsInfo)
        .map(({ postMeta, postUrl }) => ({
            ...postMeta,
            postUrl,
        }))

const DEFAULT_POST_NUMBER = 5
const getLatestPostMeta = async (
    postSliceNumber: number = DEFAULT_POST_NUMBER
): Promise<PostMeta[]> => {
    const sortedByUpdateDate = (await extractPostMeta())
        .sort(
            ({ update: currUpdateDate }, { update: nextUpdateDate }) =>
                Number(nextUpdateDate.replaceAll("/", "")) -
                Number(currUpdateDate.replaceAll("/", ""))
        )
        .slice(0, postSliceNumber)

    return sortedByUpdateDate
}

const getCategoryPostMeta = async (categoryName: string): Promise<PostMeta[]> =>
    (await extractPostMeta()).filter(
        ({ category }) => category === categoryName
    )

export {
    //* post info
    getCategoryPostContentArray,
    //* meta
    getLatestPostMeta,
    getCategoryPostMeta,
}
