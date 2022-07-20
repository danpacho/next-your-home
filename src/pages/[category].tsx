import Link from "next/link"
import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"

import { PageType } from "@typing/page/type"
import { CategoryInfoType } from "@typing/category/info"
import { PostMetaType } from "@typing/post/meta"
import { SeriesInfoType } from "@typing/post/series"

import {
    getAllCategoryPath,
    getLatestCategoryTagArray,
    getSpecificCategoryInfo,
} from "@utils/function/blog-contents-loader/contents/getCategory"
import {
    getCategorySeriesInfo,
    getCategoryLatestPostMeta,
    getCategoryPostMeta,
} from "@utils/function/blog-contents-loader/contents/getCategoryPost"

import { useThemeMode } from "@hooks/index"

import { NextIcon, PrevIcon } from "@components/UI/Atoms/Icons"
import { Button } from "@components/UI/Atoms/Button"
import { CategoryCommonLayout } from "@components/Blog/Category"

import { config } from "blog.config"

interface ParamQuery extends ParsedUrlQuery {
    category: string
}

export const getStaticProps: GetStaticProps<CategoryProps> = async ({
    params,
}) => {
    const { category } = params as ParamQuery

    const categoryPostMeta = await getCategoryPostMeta(category)

    const specificCategoryInfo = await getSpecificCategoryInfo({
        category,
        useTXT: config.useTXT,
    })
    const latestCategoryPostArray = getCategoryLatestPostMeta(categoryPostMeta)
    const latestCategoryTagArray = getLatestCategoryTagArray(
        latestCategoryPostArray
    )
    const categorySeriesInfoArray = getCategorySeriesInfo(categoryPostMeta)

    return {
        props: {
            categoryPostArray: latestCategoryPostArray,
            categoryTagArray: latestCategoryTagArray,
            categorySeriesInfoArray,
            ...specificCategoryInfo,
        },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const categoryPaths = await getAllCategoryPath()
    return {
        paths: categoryPaths,
        fallback: false,
    }
}

interface CategoryProps extends CategoryInfoType {
    categoryPostArray: PostMetaType[]
    categoryTagArray: string[]
    categorySeriesInfoArray: SeriesInfoType[]
}

function Category(categoryProps: CategoryProps) {
    const { isLight } = useThemeMode()
    return (
        <CategoryCommonLayout
            {...categoryProps}
            prevPageComponent={
                <Link href={"/"} passHref>
                    <Button ariaLabel="back to home">
                        <PrevIcon width="1.15rem" height="1.15rem" />
                        <p>🏠 Back</p>
                    </Button>
                </Link>
            }
            nextPageComponent={
                <Link href={`${categoryProps.categoryUrl}/1`} passHref>
                    <Button
                        ariaLabel={`read all post about ${categoryProps.category}`}
                    >
                        <p>All post</p>
                        <NextIcon width="1.15rem" height="1.15rem" />
                    </Button>
                </Link>
            }
        />
    )
}
Category.displayName = "Category" as PageType
export default Category
