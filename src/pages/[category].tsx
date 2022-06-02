import Link from "next/link"
import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"

import { PageType } from "@typing/page/type"
import { PostMetaType } from "@typing/post/meta"
import { CategoryInfoType } from "@typing/category/info"

import {
    getAllCategoryPath,
    getLatestCategoryTagArray,
    getSpecificCategoryInfo,
} from "@utils/function/blog-contents-loader/contents/getCategory"
import { getSpecificCategoryLatestPostMeta } from "@utils/function/blog-contents-loader/contents/getCategoryPost"

import { CategoryCommonLayout } from "@components/Blog/Category"
import { PaginationButton } from "@components/Blog/Category/CategoryCommonLayout/CategoryCommonLayout"
import { NextIcon, PrevIcon } from "@components/UI/Atoms/Icons"

import { useAtoms, _slector } from "@lib/jotai"

import { config } from "blog.config"

interface ParamQuery extends ParsedUrlQuery {
    category: string
}

export const getStaticProps: GetStaticProps<CategoryProps> = async ({
    params,
}) => {
    const { category } = params as ParamQuery

    const latestCategoryPostArray = await getSpecificCategoryLatestPostMeta(
        category
    )
    const specificCategoryInfo = await getSpecificCategoryInfo({
        category,
        useTXT: config.useTXT,
    })
    const latestCategoryTagArray = await getLatestCategoryTagArray(category)

    return {
        props: {
            categoryPostArray: latestCategoryPostArray,
            categoryTagArray: latestCategoryTagArray,
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
}

function Category(categoryProps: CategoryProps) {
    const { isLightState: isLight } = useAtoms(_slector("isLight"))

    return (
        <CategoryCommonLayout {...categoryProps}>
            <Link href={"/"} passHref>
                <PaginationButton type="button" isLight={isLight} isLeft>
                    <PrevIcon width="1.15rem" height="1.15rem" />
                    <p>🏠 돌아가기</p>
                </PaginationButton>
            </Link>
            <Link href={`${categoryProps.categoryUrl}/1`} passHref>
                <PaginationButton type="button" isLight={isLight}>
                    <p>모든 글 보기</p>
                    <NextIcon width="1.15rem" height="1.15rem" />
                </PaginationButton>
            </Link>
        </CategoryCommonLayout>
    )
}
Category.displayName = "Category" as PageType
export default Category
