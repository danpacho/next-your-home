import { CategoryInfo } from "@/utils/types/category/category"
import { readdirSync } from "fs"
import { readFile } from "fs/promises"
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
const DESCRIPTION_FILE_NAME = "description.txt"
/**
 * @returns 카테고리의 설명을 반환
 */
const readCategoryTXTFileArray = async (pureCategoryArray: string[]) => {
    const descriptionArray = Promise.all(
        pureCategoryArray.map(async (category) => {
            const description = await readFile(
                `${blogContentsDirectory}/${category}/${DESCRIPTION_FILE_NAME}`,
                "utf-8"
            )
            return description.trim()
        })
    )
    return descriptionArray
}

const EXTRACT_COLOR_REGEX = /color:/
/**
 * @note `.txt`파일 -> 줄바꿈 후, color = {내가 원하는 색}
 * @returns `카테고리.txt` 파일에서 색상 | 설명 정보 추출
 */
const extractCategoryDescriptionAndColor = (
    categoryTXTFile: string
): {
    description: string
    color: string
} => {
    const [description, color] = categoryTXTFile.split(EXTRACT_COLOR_REGEX)
    return {
        description: description.replace(/\n/g, ""),
        color,
    }
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
            const { description, color } = extractCategoryDescriptionAndColor(
                categoryTXTFileArray[idx]
            )

            return {
                category: categoryArray[idx],
                description,
                url: `/${categoryArray[idx]}`,
                color,
            }
        })

    return allCategoryInfo
}

export { getCategoryPath, getPureCategoryName, getCategoryInfoArray }
