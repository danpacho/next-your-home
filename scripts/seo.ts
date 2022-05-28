import { generateRSS } from "./generateRSS"
import { generateSitemap } from "./generateSitemap"
import { getAllCategoryPath, getAllPostMeta } from "./utils"

async function seo() {
    const categoryNameArray = await getAllCategoryPath()
    const totalPostMeta = await getAllPostMeta(categoryNameArray)

    await generateSitemap(categoryNameArray, totalPostMeta)
    await generateRSS(totalPostMeta)
}

seo()
