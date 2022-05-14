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

import { CategoryCommonLayout, CategoryTag } from "@components/Blog/Category"

import { config } from "blog.config"
import { useThemeIsLight } from "@lib/atoms/theme/theme.state"

import { PaginationButton } from "@components/Blog/Category/CategoryCommonLayout/CategoryCommonLayout"
import { NextIcon, PrevIcon } from "@components/UI/Atoms/Icons"
import Link from "next/link"

interface CategoryProps extends CategoryInfoType {
    categoryPostArray: PostMetaType[]
    categoryTagArray: string[]
}

function Category(categoryProps: CategoryProps) {
    const isLight = useThemeIsLight()
    //!TODO: pinned 된 포스트를 우선으로 가져오기, 시간 순으로 정렬
    return (
        <CategoryCommonLayout {...categoryProps}>
            <Link href={"/"} passHref>
                <PaginationButton type="button" isLight={isLight} isLeft>
                    <PrevIcon width="1.15rem" height="1.15rem" />
                    🏠 돌아가기
                </PaginationButton>
            </Link>
            <Link href={`${categoryProps.categoryUrl}/1`} passHref>
                <PaginationButton type="button" isLight={isLight}>
                    모든 글 보기
                    <NextIcon width="1.15rem" height="1.15rem" />
                </PaginationButton>
            </Link>
        </CategoryCommonLayout>
    )
}
Category.displayName = "Category" as PageType
export default Category

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
