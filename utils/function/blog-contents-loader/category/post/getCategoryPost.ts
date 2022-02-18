import {
    blogContentsDirectory,
    removeFileFormat,
} from "../../common/commonUtils"
import { getPureCategoryName } from "../getCategory"
import { MDXCompiledSource } from "@/utils/types/mdx/mdx"

import { readdirSync } from "fs"
import { readFile } from "fs/promises"
import matter from "gray-matter"
import { serialize } from "next-mdx-remote/serialize"

const POST_DIRECTORY_NAME = "posts"

interface PostInfo {
    category: string
    categoryPostArray: string[]
}

/**
 * @note 모든 카테고리의 포스트 정보를 가져오는 함수
 ---
 * @param 카테고리 이름 `string[]`을 받는다
 * @returns 카테고리속 post이름과 해당 카테고리를 받는다
 */
const getAllCategoryPostInfo = async (
    categoryNameArray: string[]
): Promise<PostInfo[]> => {
    const postInfoArray = await Promise.all(
        categoryNameArray.map(async (category) => {
            const categoryPostArray = await readdirSync(
                `${blogContentsDirectory}/${category}/${POST_DIRECTORY_NAME}`
            )
            return {
                category,
                categoryPostArray,
            }
        })
    )
    return postInfoArray
}

/**
 * @returns 포스트의 순수 파일 이름을 받아온다
 */
const getCategoryPostName = (postInfo: PostInfo[]): string[][] =>
    postInfo.map(({ categoryPostArray }) =>
        categoryPostArray.map((fileName) => removeFileFormat(fileName, "mdx"))
    )

const getAllCategoryPostContentInfo = async (
    postInfo: PostInfo[],
    compileToMDX: true | false = true
) => {
    const postContentInfoArray = await Promise.all(
        postInfo.map(async ({ category, categoryPostArray }) => {
            const postContentArray = await Promise.all(
                categoryPostArray.map(async (postFileName) => {
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
 * @param `compileToMDX` mdx 파일로 컴파일 하는 과정을 진행할 것인지 여부 입력
 * @returns 각 카테고리의 모든 포스팅 정보를 반환
 */
const returnAllPostInfo = async (compileToMDX: true | false = true) =>
    await await getAllCategoryPostContentInfo(
        await getAllCategoryPostInfo(await getPureCategoryName()),
        compileToMDX
    )

const getSepcificCategoryPostContent = async (categoryName: string) =>
    (await returnAllPostInfo()).filter(
        ({ category }) => category === categoryName
    )[0]

const DEFAULT_POST_NUMBER = 5
const getLatestPost = async (postSliceNumber: number = DEFAULT_POST_NUMBER) => {
    const sortedByUpdateDate = (await returnAllPostInfo(false))
        .flatMap(({ contentsInfo }) => contentsInfo)
        .map(({ postMeta, postUrl }) => ({
            ...postMeta,
            url: postUrl,
        }))
        .sort(
            //* 업데이트 날짜로 오름차순 정렬
            //* 2020/02/01 형식으로 저장
            ({ update: currUpdateDate }, { update: nextUpdateDate }) =>
                Number(nextUpdateDate.replaceAll("/", "")) -
                Number(currUpdateDate.replaceAll("/", ""))
        )
        .slice(0, postSliceNumber)

    return sortedByUpdateDate
}

const transformContentToMDXCompileSource = async (
    compileSource: string
): Promise<MDXCompiledSource> => await serialize(compileSource)

export {
    transformContentToMDXCompileSource,
    getAllCategoryPostInfo,
    getCategoryPostName,
    getAllCategoryPostContentInfo,
    getSepcificCategoryPostContent,
    returnAllPostInfo,
    getLatestPost,
}
