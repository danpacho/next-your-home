import { readdir, readFile } from "fs/promises"

import { CategoryInfoType } from "@typing/category/info"
import { PostMetaType } from "@typing/post/meta"

import { MAC_OS_FILE_EXCEPTION } from "@constants/index"
import {
    addPathNotation,
    blogContentsDirectory,
    getValidateColor,
    memo,
} from "@utils/function/blog-contents-loader/util"

import {
    BlogErrorAdditionalInfo,
    BlogFileExtractionError,
    BlogPropertyError,
} from "@utils/function/blog-error-handler"

import { config } from "blog.config"

/**
 * @returns 카테고리의 이름(=`파일 이름`) 반환
 * @exception `MacOs` remove `.DS_Store`
 */
const getAllCategoryName = async () => {
    try {
        return (await readdir(blogContentsDirectory, "utf-8"))
            .filter((category) => category !== MAC_OS_FILE_EXCEPTION)
            .map((category) => category.trim())
    } catch (err) {
        throw new BlogErrorAdditionalInfo({
            passedError: err,
            errorNameDescription:
                "blog-contents directory name 📝 incorrection",
            message: `Check ${config.blogContentsDirectoryName} and "${config.blogContentsDirectoryName}/contens" file name 🔎`,
            customeErrorMessage: `directory structure should match with following path ⬇️\n\n      ${blogContentsDirectory}\n\n      🔒 Check Post Directory Structure:\n 
            📦"${config.blogContentsDirectoryName}"
            ┃
            ┗ 📂"content"                                      blog content
            ┃ ┃
            ┃ ┗ 📂[catgory-name]                               your category name
            ┃ ┃ ┃
            ┃ ┃ ┣ 📂"posts"                                   category's posts
            ┃ ┃ ┃ ┣ 📜[post-name].mdx                         format: "mdx"
            ┃ ┃ ┃ ┗ ... more posts
            ┃ ┃ ┃
            ┃ ┃ ┗ 📜"description.json"                        your category's description
            ┃ ┃
            ┃ ┗ 📂[catgory-name2]...
            `,
        })
    }
}

/**
 * @note 카테고리 이름에 url notation 추가
 * @returns `/{category}` 반환
 */
const getAllCategoryPath = memo(config.useMemo, async (): Promise<string[]> => {
    const categoryPathArray: string[] = await (
        await await getAllCategoryName()
    ).map((path) => addPathNotation(path))
    return categoryPathArray
})

const DESCRIPTION_FILE_NAME = "description"
const FILE_FORMAT = {
    TXT: ".txt",
    JSON: ".json",
}
/**
 * @returns 카테고리 `description.txt` 파일을 읽어 반환
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
 * @note **카테고리** `description.txt` 가공
 * ---
 * @note `desciprition`: `color: ...`, `emoji: ...` 를 제외한 텍스트
 * @note `color`: HEX or rgb or rgba
 * @note `emoji`: One Emoji
 * @param categoryTXTFile `description.txt`파일 추출 결과 대입
 * @returns `color`, `description`, `emoji`
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
        (accCategoryInfo, currValue) => {
            if (isColor(currValue))
                return {
                    ...accCategoryInfo,
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
                        ...accCategoryInfo,
                        emoji: emojiExec[0],
                    }
            }
            return {
                ...accCategoryInfo,
                description: currValue.replace(/\n/g, ""),
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
 * @note `.txt`파일, 전체 카테고리 설명 반환
 * ---
 * @return `category`: 해당 카테고리 이름
 * @return `description`: 해당 카테고리 설명
 * @return `categoryUrl`: 해당 카테고리 링크 URL
 * @return `color`: 해당 카테고리 색
 * @return `emoji`: 해당 카테고리 이모지
 */
const getAllCategoryInfoByTXT = async (): Promise<CategoryInfoType[]> => {
    const categoryArray = await getAllCategoryName()
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
 * @note `.json`파일, 전체 카테고리 설명 반환
 * @param allCategoryName 전체 카테고리 이름
 */
const readAllCategoryJSONFile = async (
    allCategoryName: string[]
): Promise<CategoryInfoType[]> => {
    const categoryInfoArray = await Promise.all(
        allCategoryName.map(async (category) => {
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
                    emoji,
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
 * @note `.json`파일, 전체 카테고리 설명 반환
 * ---
 * @return `category`: 해당 카테고리 이름
 * @return `description`: 해당 카테고리 설명
 * @return `categoryUrl`: 해당 카테고리 링크 URL
 * @return `color`: 해당 카테고리 색
 * @return `emoji`: 해당 카테고리 이모지
 */
const getAllCategoryInfoByJSON = async () =>
    await readAllCategoryJSONFile(await getAllCategoryName())

const LATEST_CATEGORY_NUMBER = 3
/**
 * @note 최신 카테고리 정보 추출
 * @param useTXT true  `description.txt`
 * @param useTXT false  `description.json`
 * @returns `LATEST_CATEGORY_NUMBER` 개 카테고리 반환
 */
const getLatestCategoryInfo = memo(
    config.useMemo,
    async ({ useTXT }: { useTXT: boolean }) =>
        await (useTXT
            ? await getAllCategoryInfoByTXT()
            : await getAllCategoryInfoByJSON()
        )
            .sort()
            .slice(0, LATEST_CATEGORY_NUMBER)
)

/**
 * @returns 최신 카테고리 속 포스트에 포함된 태그 추출
 */
const getLatestCategoryTagArray = memo(
    config.useMemo,
    (latestCategoryPostMetaArray: PostMetaType[]) => {
        const deduplicatedCategoryTagArray = [
            ...new Set(latestCategoryPostMetaArray.flatMap(({ tags }) => tags)),
        ].sort()

        return deduplicatedCategoryTagArray
    }
)
/**
 * @param useTXT true `description.txt` 추출
 * @returns 전체 카테고리 정보 반환
 */
const getAllCategoryInfo = async ({ useTXT }: { useTXT: boolean }) => {
    const allCategoryInfo = useTXT
        ? await getAllCategoryInfoByTXT()
        : await getAllCategoryInfoByJSON()
    return allCategoryInfo
}

/**
 * @note 특정 카테고리의 정보 반환
 * @return `category`: 해당 카테고리 이름
 * @return `description`: 해당 카테고리 설명
 * @return `categoryUrl`: 해당 카테고리 링크 URL
 * @return `color`: 해당 카테고리 색
 * @return `emoji`: 해당 카테고리 이모지
 */
const getSpecificCategoryInfo = memo(
    config.useMemo,
    async ({
        category,
        useTXT,
    }: {
        category: string
        useTXT: boolean
    }): Promise<CategoryInfoType> => {
        const allCategoryInfo = await getAllCategoryInfo({
            useTXT,
        })
        const specificCategoryInfo = allCategoryInfo.find(
            ({ category: categoryName }) => categoryName === category
        )!

        return {
            ...specificCategoryInfo,
        }
    }
)

export {
    //* category path & name
    getAllCategoryPath,
    getAllCategoryName,
    //* categoryInfo
    getAllCategoryInfo,
    //* specific category - info & tag
    getSpecificCategoryInfo,
    getLatestCategoryTagArray,
    //* categoryInfo - latest
    getLatestCategoryInfo,
}
