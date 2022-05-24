import Link from "next/link"
import { GetStaticPaths, GetStaticProps } from "next"

import { ParsedUrlQuery } from "querystring"

import { PageType } from "@typing/page/type"
import { PostMetaType } from "@typing/post/meta"
import { CategoryInfoType } from "@typing/category/info"

import {
    getCategoryTotalPaginationNumber,
    getSpecificCategoryPagePostMeta,
    getAllCategoryPaginationPath,
    getCategoryPaginationTag,
} from "@utils/function/blog-contents-loader/contents/getCategoryPost"
import { getSpecificCategoryInfo } from "@utils/function/blog-contents-loader/contents/getCategory"

import { NextIcon, PrevIcon } from "@components/UI/Atoms/Icons"
import { CategoryCommonLayout } from "@components/Blog/Category"
import { PaginationButton } from "@components/Blog/Category/CategoryCommonLayout/CategoryCommonLayout"

import { config } from "blog.config"
import { useSlector, _slector } from "@lib/recoil"

interface CategoryPostPerPageProps extends CategoryInfoType {
    categoryPostArray: PostMetaType[]
    categoryTagArray: string[]
    pageNumber: string
    category: string
    isLast: boolean
}
function CategoryPostPerPage(props: CategoryPostPerPageProps) {
    const pageNumber = Number(props.pageNumber)

    const { isLast, categoryUrl, category } = props
    const isFirst = pageNumber === 1

    const { isLightState: isLight } = useSlector(_slector("isLight"))

    return (
        <CategoryCommonLayout {...props} pageNumber={pageNumber}>
            <Link
                passHref
                href={
                    isFirst ? categoryUrl : `${categoryUrl}/${pageNumber - 1}`
                }
            >
                <PaginationButton type="button" isLight={isLight} isLeft>
                    <PrevIcon width="1.15rem" height="1.15rem" />
                    {isFirst && `${category}`}
                    {!isFirst && `${pageNumber - 1} 페이지로`}
                </PaginationButton>
            </Link>
            <Link
                href={isLast ? categoryUrl : `${categoryUrl}/${pageNumber + 1}`}
                passHref
            >
                <PaginationButton type="button" isLight={isLight}>
                    {isLast && isFirst && `텅💨 비었군요`}
                    {isLast && !isFirst && "마지막이에요! 축하드립니다🎉"}
                    {!isLast && `${pageNumber + 1} 페이지로`}
                    <NextIcon width="1.15rem" height="1.15rem" />
                </PaginationButton>
            </Link>
        </CategoryCommonLayout>
    )
}
CategoryPostPerPage.displayName = "Category" as PageType

interface ParamQuery extends ParsedUrlQuery {
    category: string
    pageNumber: string
}

export const getStaticProps: GetStaticProps<CategoryPostPerPageProps> = async ({
    params,
}) => {
    const { category, pageNumber } = params as ParamQuery

    const specificCategoryInfo = await getSpecificCategoryInfo({
        category,
        useTXT: config.useTXT,
    })

    const specificPageCategoryPostMeta = await getSpecificCategoryPagePostMeta({
        category,
        pageNumber: Number(pageNumber),
    })

    const spcificPageCategoryPostTagArray = getCategoryPaginationTag(
        specificPageCategoryPostMeta
    )

    const endPageNumber = await getCategoryTotalPaginationNumber(category)

    return {
        props: {
            categoryPostArray: specificPageCategoryPostMeta,
            categoryTagArray: spcificPageCategoryPostTagArray,
            isLast: Number(pageNumber) === endPageNumber,
            pageNumber,
            ...specificCategoryInfo,
        },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const specificPagePostContentPath = await getAllCategoryPaginationPath()

    return {
        paths: specificPagePostContentPath,
        fallback: false,
    }
}

export default CategoryPostPerPage
