import { getAllCategoryInfo } from "../category/getCategory"

//TODO: 포스트 메타 업데이트
export interface PostMeta {
    title: string
    preview: string
    author: string
    update: string
}

interface MainContent {
    categoryArray: {
        category: string
        description: string
        url: string
    }[]
    latestPostArray: {
        category: string
        postMeta: PostMeta
        //* url = /{category}/{postMeta.title}
    }[]
}

const getMainContents = async (): Promise<MainContent> => {
    const allCategoryInfo = await getAllCategoryInfo()
    return {
        categoryArray: allCategoryInfo,
        latestPostArray: [],
    }
}

export { getMainContents }
