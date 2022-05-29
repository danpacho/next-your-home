import { generateRSS } from "./generateRSS"
import { generateSitemap } from "./generateSitemap"
import { getAllCategoryPath, getAllPostMeta } from "./utils"

async function seo() {
    const categoryNameArray = await getAllCategoryPath()
    const allPostMeta = await getAllPostMeta(categoryNameArray)

    await generateSitemap(categoryNameArray, allPostMeta)
    await generateRSS(allPostMeta)
}

seo()
