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
const getCategoryDescription = async (pureCategoryArray: string[]) => {
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

/**
 * @note 전체 카테고리의 이름 - 설명 배열
 * @return 모든 카테
 */
const getAllCategoryInfo = async () => {
    const categories = await getPureCategoryName()
    const categoriesDescription = await getCategoryDescription(categories)

    const allCategoryInfo = new Array(categories.length)
        .fill(0)
        .map((_, idx) => ({
            category: categories[idx],
            description: categoriesDescription[idx],
            url: `/${categories[idx]}`,
        }))

    return allCategoryInfo
}

export { getCategoryPath, getPureCategoryName, getAllCategoryInfo }
