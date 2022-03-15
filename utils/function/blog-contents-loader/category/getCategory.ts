import { CategoryInfo } from "@/utils/types/category/categoryInfo"
import { readdirSync, readFileSync } from "fs"
import { addPathNotation, blogContentsDirectory } from "../common/commonUtils"

/**
 * @returns 카테고리의 이름(파일 이름) 반환
 */
const getPureCategoryName = async () => await readdirSync(blogContentsDirectory)

/**
 * @returns 카테고리 이름에 url을 추가하여 반환
 */
const getCategoryPath = async (): Promise<string[]> => {
    const categoryPathArray: string[] = await (
        await getPureCategoryName()
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
    const descriptionArray = pureCategoryArray.map((category) => {
        const description = readFileSync(
            `${blogContentsDirectory}/${category}/${DESCRIPTION_FILE_NAME}${FILE_FORMAT.TXT}`,
            "utf-8"
        )
        return description.trim()
    })

    return descriptionArray
}
const readCategoryJSONFileArray = (
    pureCategoryArray: string[]
): CategoryInfo[] => {
    const categoryInfoArray = pureCategoryArray.map((category) => {
        const { description, color, emoji } = JSON.parse(
            readFileSync(
                `${blogContentsDirectory}/${category}/${DESCRIPTION_FILE_NAME}${FILE_FORMAT.JSON}`,
                "utf-8"
            )
        ) as ExtractCategoryInfo

        const categoryInfo = {
            description,
            color,
            emoji,
            category,
            categoryUrl: `/${category}`,
        }
        return categoryInfo
    })

    return categoryInfoArray
}
const getCategoryInfoArrayByJson = async () =>
    await readCategoryJSONFileArray(await getPureCategoryName())

const EXTRACT_COLOR_REGEX = /color:/
const EXTRACT_EMOJI_REGEX = /emoji:/
const EMOJI_REGEX = /\p{Emoji}/u

interface ExtractCategoryInfo {
    description: string
    color: string
    emoji: string
}
/**
 * @note `.txt`파일 -> color: {내가 원하는 색} emoji: {내가 원하는 이모지 1개}
 * @returns `카테고리.txt` 파일에서 `색상 | 이모지 | 설명` 정보 추출
 */
const extractCategoryDescriptionAndColorAndEmoji = (
    categoryTXTFile: string
): ExtractCategoryInfo => {
    const isColor = (text: string) => text.includes("#")
    const isEmoji = (text: string) => EMOJI_REGEX.test(text)

    const [splitFirst, splitSecond] = categoryTXTFile.split(EXTRACT_COLOR_REGEX)
    const firstSplit = splitFirst
        .split(EXTRACT_EMOJI_REGEX)
        .map((txt) => txt.trim())
    const secondSplit = splitSecond
        .split(EXTRACT_EMOJI_REGEX)
        .map((txt) => txt.trim())

    const extractedStringArray = firstSplit.concat(secondSplit)
    const categoryInfo = extractedStringArray.reduce<ExtractCategoryInfo>(
        (acc, currValue) => {
            if (isColor(currValue))
                return {
                    ...acc,
                    color: currValue,
                }
            if (isEmoji(currValue))
                return {
                    ...acc,
                    emoji: currValue,
                }
            return {
                ...acc,
                description: currValue,
            }
        },
        {
            color: "",
            description: "",
            emoji: "",
        }
    )

    return categoryInfo
}

/**
 * @note 전체 카테고리의 이름 - 설명 배열
 * @return 모든 카테
 */
const getCategoryInfoArray = async (): Promise<CategoryInfo[]> => {
    const categoryArray = await getPureCategoryName()
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

export {
    getCategoryPath,
    getPureCategoryName,
    getCategoryInfoArray,
    getCategoryInfoArrayByJson,
}
