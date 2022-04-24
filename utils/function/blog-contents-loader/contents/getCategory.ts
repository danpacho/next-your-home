import { readdir, readFile } from "fs/promises"

import { CategoryInfoType } from "@/types/category/info"

import {
    BlogErrorAdditionalInfo,
    BlogFileExtractionError,
    BlogPropertyError,
} from "../../blog-error-handler/blogError"
import {
    addPathNotation,
    blogContentsDirectory,
    getValidateColor,
} from "../util"
import { getCategoryPostMeta } from "./getCategoryPost"

/**
 * @returns 카테고리의 이름(파일 이름) 반환
 */
const getPureCategoryNameArray = async () => {
    try {
        return await readdir(blogContentsDirectory, "utf-8")
    } catch (err) {
        throw new BlogErrorAdditionalInfo({
            passedError: err,
            errorNameDescription:
                "blog-contents directory name 📝 incorrection",
            message:
                'Check "blog-contents" and "blog-contents/contens" file name 🔎',
            customeErrorMessage: `directory structure should match with following path ⬇️\n\n      ${blogContentsDirectory}\n\n      🔒 Check Post Directory Structure:\n 
            📦"blog-contents"
            ┃
            ┗ 📂"content"                                     | blog content
            ┃ ┃
            ┃ ┗ 📂[catgory-name]                             | your category name
            ┃ ┃ ┃
            ┃ ┃ ┣ 📂"posts"                                 | inside of category's posts
            ┃ ┃ ┃ ┣ 📜[post-name].mdx                      | mdx format, post
            ┃ ┃ ┃ ┗ ... more posts
            ┃ ┃ ┃
            ┃ ┃ ┗ 📜"description.json"                      | your category's description
            ┃ ┃
            ┃ ┗ 📂[catgory-name2]...
            `,
        })
    }
}

/**
 * @returns 카테고리 이름에 url string 추가 반환
 */
const getCategoryPath = async (): Promise<string[]> => {
    const categoryPathArray: string[] = await (
        await getPureCategoryNameArray()
    ).map((path) => addPathNotation(path))
    return categoryPathArray
}

const DESCRIPTION_FILE_NAME = "description"
const FILE_FORMAT = {
    TXT: ".txt",
    JSON: ".json",
}
/**
 * @returns 카테고리의 정보가 담긴 .txt파일의 내용을 반환
 */
const readCategoryTXTFileArray = async (pureCategoryArray: string[]) => {
    const descriptionArray = await Promise.all(
        pureCategoryArray.map(async (category) => {
            const descriptionFilePath = `${blogContentsDirectory}/${category}/${DESCRIPTION_FILE_NAME}${FILE_FORMAT.TXT}`
            try {
                const description = await readFile(descriptionFilePath, "utf-8")
                if (!description)
                    throw new BlogFileExtractionError({
                        errorNameDescription:
                            "contents -> description file extraction error",
                        readingFileFormat: ".txt",
                        readingFileLocation: descriptionFilePath,
                        readingFileName: DESCRIPTION_FILE_NAME,
                    })
                return description.trim()
            } catch (err) {
                throw new BlogErrorAdditionalInfo({
                    passedError: err,
                    errorNameDescription:
                        "[contents] category description file name 📝 incorrection",

                    message: `"description.txt" in ${category} File at\n\n${descriptionFilePath}`,
                })
            }
        })
    )

    return descriptionArray
}

const SPLIT_COLOR_REGEX = /color:/
const SPLIT_EMOJI_REGEX = /emoji:/
const EMOJI_REGEX = /\p{Emoji}/u

interface ExtractCategoryInfo {
    description: string
    color: string
    emoji: string
}
const NOT_FOUND = "NOT_FOUND"
/**
 * @note `.txt`파일 -> color: {내가 원하는 색} emoji: {내가 원하는 이모지 1개}
 * @returns `카테고리.txt` 파일에서 `색상 | 이모지 | 설명` 정보 추출
 */
const extractCategoryDescriptionAndColorAndEmoji = (
    categoryTXTFile: string
): ExtractCategoryInfo => {
    const HEX_REGEX = /^#[a-z|A-Z|0-9]{5}[a-z|A-Z|0-9]{1}$/g
    const isColor = (color: string) => HEX_REGEX.test(color)
    const isEmoji = (text: string) => EMOJI_REGEX.test(text)

    const [splitFirst, splitSecond] = categoryTXTFile.split(SPLIT_COLOR_REGEX)
    const firstSplit = splitFirst
        .split(SPLIT_EMOJI_REGEX)
        .map((txt) => txt.trim())
    const secondSplit = splitSecond
        .split(SPLIT_EMOJI_REGEX)
        .map((txt) => txt.trim())

    const extractedStringArray = firstSplit.concat(secondSplit)

    const categoryInfo = extractedStringArray.reduce<ExtractCategoryInfo>(
        (acc, currValue) => {
            if (isColor(currValue))
                return {
                    ...acc,
                    color: currValue,
                }
            if (isEmoji(currValue)) {
                const emojiExec = EMOJI_REGEX.exec(currValue)
                const isEmojiNotExists = emojiExec === null

                if (isEmojiNotExists)
                    throw new BlogPropertyError({
                        errorNameDescription:
                            "Error Occured while extracting category description [emoji]",
                        propertyName: "emoji",
                        propertyType: "string",
                        customeErrorMessage: `Track file's description🔎: \n      ${categoryInfo.description}`,
                    })
                else
                    return {
                        ...acc,
                        emoji: emojiExec[0],
                    }
            }
            return {
                ...acc,
                description: currValue.replaceAll("\n", ""),
            }
        },
        {
            color: NOT_FOUND,
            description: NOT_FOUND,
            emoji: NOT_FOUND,
        }
    )

    const isColorError =
        categoryInfo.color === NOT_FOUND || !isColor(categoryInfo.color)
    const isEmojiError = categoryInfo.emoji === NOT_FOUND
    const isDescriptionError =
        categoryInfo.description === NOT_FOUND ||
        categoryInfo.description === ""

    if (isColorError)
        throw new BlogPropertyError({
            errorNameDescription:
                "Error Occured while extracting category description [color]",
            propertyName: "color",
            propertyDescription:
                "should be HEX: #⚪️⚪️⚪️⚪️⚪️⚪️, if you activate useTXT config option",
            propertyType: "string",
            errorPropertyValue: categoryInfo.color,
            customeErrorMessage: `Track file's description🔎: \n      ${categoryInfo.description}`,
        })

    if (isEmojiError)
        throw new BlogPropertyError({
            errorNameDescription:
                "Error Occured while extracting category description [emoji]",
            propertyName: "emoji",
            propertyType: "string",
            customeErrorMessage: `Track file's description🔎: \n      ${categoryInfo.description}`,
        })

    if (isDescriptionError)
        throw new BlogPropertyError({
            errorNameDescription:
                "Error Occured while extracting category description [description]",
            propertyName: "description",
            propertyDescription: categoryInfo.description,
            propertyType: "string",
            customeErrorMessage: `Track file's color🔎: ${categoryInfo.color}\n      file's emoji🔎: ${categoryInfo.emoji}`,
        })

    return categoryInfo
}

/**
 * @note 전체 카테고리의 이름 - 설명 배열
 * @return 모든 카테
 */
const getCategoryInfoArray = async (): Promise<CategoryInfoType[]> => {
    const categoryArray = await getPureCategoryNameArray()
    const categoryTXTFileArray = await readCategoryTXTFileArray(categoryArray)
    const allCategoryInfo = new Array(categoryArray.length)
        .fill(0)
        .map((_, idx) => {
            const { description, color, emoji } =
                extractCategoryDescriptionAndColorAndEmoji(
                    categoryTXTFileArray[idx]
                )

            return {
                category: categoryArray[idx],
                description,
                categoryUrl: `/${categoryArray[idx]}`,
                color,
                emoji,
            }
        })

    return allCategoryInfo
}

/**
 * @note `description.json` 파일을 추출
 * @param pureCategoryArray **카테고리 이름이 담긴 `string[]`**
 * @returns **카테고리 정보 배열을 반환**
 */
const readCategoryJSONFileArray = async (
    pureCategoryArray: string[]
): Promise<CategoryInfoType[]> => {
    const categoryInfoArray = await Promise.all(
        pureCategoryArray.map(async (category) => {
            const descriptionFilePath = `${blogContentsDirectory}/${category}/${DESCRIPTION_FILE_NAME}${FILE_FORMAT.JSON}`
            try {
                const { description, color, emoji } = JSON.parse(
                    await readFile(descriptionFilePath, "utf-8")
                ) as ExtractCategoryInfo

                const isDescriptionError =
                    description === undefined || description === ""
                const emojiExec = EMOJI_REGEX.exec(emoji)
                const isEmojiNotExists = emojiExec === null

                if (isDescriptionError)
                    throw new BlogPropertyError({
                        errorNameDescription:
                            "Error Occured while extracting category description [description]",
                        propertyName: "description",
                        propertyType: "string",
                        propertyDescription: description,
                        customeErrorMessage: `Track file's description🔎: \n      ${descriptionFilePath}`,
                    })

                if (isEmojiNotExists)
                    throw new BlogPropertyError({
                        errorNameDescription:
                            "Error Occured while extracting category description [emoji]",
                        propertyName: "emoji",
                        propertyType: "string",
                        customeErrorMessage: `Track file's description🔎: \n      ${descriptionFilePath}`,
                    })

                const categoryInfo = {
                    description,
                    color: getValidateColor(color),
                    emoji: emojiExec[0],
                    category,
                    categoryUrl: `/${category}`,
                }
                return categoryInfo
            } catch (err) {
                throw new BlogErrorAdditionalInfo({
                    passedError: err,
                    errorNameDescription: "description.json file problem",
                    message:
                        "1. description file name incorrection \n      2. [.json] file syntax error\n",
                    customeErrorMessage: `"description.json" in your [${category}] File at\n\n      ${descriptionFilePath}\n\n      🔒 Check description.json format example:\n
                    {
                        "description": "my category description!",
                        "emoji": "🏠",
                        "color": "#1F2937"
                    }\n`,
                })
            }
        })
    )

    return categoryInfoArray
}

/**
 * @returns **`categoryInfo` 배열을 반환**
 */
const getCategoryInfoArrayByJson = async () =>
    await readCategoryJSONFileArray(await getPureCategoryNameArray())

/**
 * @returns
 */
const getLatestCategoryInfoArrayByJson = async () =>
    await (await getCategoryInfoArrayByJson()).sort().slice(0, 3)

const getDeduplicatedCategoryTagArray = async (category: string) => {
    const categoryPostArray = await getCategoryPostMeta(category)
    const deduplicatedCategoryTagArray = [
        ...new Set(categoryPostArray.flatMap(({ tags }) => tags)),
    ].sort()

    return deduplicatedCategoryTagArray
}

const getSpecificCategoryInfo = async (
    category: string
): Promise<CategoryInfoType> => {
    const categoryInfoArray = await getCategoryInfoArrayByJson()

    const specificCategoryInfo = categoryInfoArray.filter(
        ({ category: categoryName }) => categoryName === category
    )[0]

    return {
        ...specificCategoryInfo,
    }
}

export {
    //*path
    getCategoryPath,
    getPureCategoryNameArray,
    //* categoryInfo
    getCategoryInfoArray,
    getSpecificCategoryInfo,
    getCategoryInfoArrayByJson,
    //* lateset
    getLatestCategoryInfoArrayByJson,
    //* specific tag
    getDeduplicatedCategoryTagArray,
}
