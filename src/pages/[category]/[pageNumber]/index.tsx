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

import { useThemeMode } from "@hooks/index"

import { NextIcon, PrevIcon } from "@components/UI/Atoms/Icons"
import { Button } from "@components/UI/Atoms/Button"
import { CategoryCommonLayout } from "@components/Blog/Category"

import { config } from "blog.config"

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

    const { isLight } = useThemeMode()
    return (
        <CategoryCommonLayout
            {...props}
            pageNumber={pageNumber}
            prevPageComponent={
                <Link
                    passHref
                    href={
                        isFirst
                            ? categoryUrl
                            : `${categoryUrl}/${pageNumber - 1}`
                    }
                >
                    <Button
                        ariaLabel={`to the previous page: ${pageNumber - 1}`}
                    >
                        <PrevIcon />
                        {isFirst && <>{category}</>}
                        {!isFirst && `Page ${pageNumber - 1}`}
                    </Button>
                </Link>
            }
            nextPageComponent={
                <Link
                    href={
                        isLast
                            ? categoryUrl
                            : `${categoryUrl}/${pageNumber + 1}`
                    }
                    passHref
                >
                    <Button ariaLabel={`to the next page: ${pageNumber + 1}`}>
                        {isLast && isFirst && `Oops It's Empty💨`}
                        {isLast && !isFirst && "Thank you! Last page 🎉"}
                        {!isLast && `Page ${pageNumber + 1}`}
                        <NextIcon />
                    </Button>
                </Link>
            }
        />
    )
}
CategoryPostPerPage.displayName = "Category" as PageType

export default CategoryPostPerPage
