import { readdir, readFile } from "fs/promises"

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

const replaceSpaceToEncode = (text: string) => text.replace(/ /g, "%20")

const getAllCategoryPath = async () =>
    (await readdir(blogContentsDirectory, "utf-8"))
        .filter((category) => category !== MAC_OS_FILE_EXCEPTION)
        .map((category) => `/${category}`)

const getPostPaginationUrl = (category: string, order: number) =>
    `${replaceSpaceToEncode(category)}/${Math.floor(
        order / config.postPerCategoryPage + 1
    )}`
const getPostUrl = (postPaginationUrl: string, postFileName: string) =>
    `${postPaginationUrl}/${removeFileFormat(
        replaceSpaceToEncode(postFileName),
        "mdx"
    )}`

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

export interface TempMetaType {
    category: string
    postFileName: string
    update: string
    title: string
    author: string
    tags: string[]
    preview: string
    paginationUrl: string
    postUrl: string
}
const extractPostMeta = async ({
    category,
    postFileName,
}: {
    category: string
    postFileName: string
}): Promise<TempMetaType | undefined> => {
    const postUrl = `${blogContentsDirectory}/${category}/${POST_DIRECTORY_NAME}/${postFileName}`
    const postSource = await readFile(postUrl, "utf-8")

    const extractedMeta = matter(postSource).data as MDXPostMetaType
    if (Boolean(extractedMeta.postpone)) return
    return {
        update: extractedMeta.update,
        category,
        postFileName,
        author: extractedMeta.author,
        preview: extractedMeta.preview,
        tags: extractedMeta.tags.split(","),
        title: extractedMeta.title,
        paginationUrl: "",
        postUrl: "",
    }
}

const extractAllPostMeta = async (
    categoryPostFileNameArray: CategoryPostFileNameType[]
): Promise<TempMetaType[]> =>
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
                .map((tempMeta, order) => {
                    const { category, postFileName, update } = tempMeta
                    const paginationUrl = getPostPaginationUrl(category, order)
                    return {
                        ...tempMeta,
                        paginationUrl,
                        postUrl: getPostUrl(paginationUrl, postFileName),
                        update: update.replace(/\//g, "-"),
                    }
                })
        )
        .flat()

const getAllPostMeta = async (category: string[]) =>
    await extractAllPostMeta(await extractAllCategoryPostFileName(category))

export { getAllPostMeta, getAllCategoryPath, replaceSpaceToEncode }
