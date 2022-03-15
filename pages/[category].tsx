import PostLink from "@/components/Blog/Common/PostLink/PostLink"
import media from "@/styles/utils/media"
import {
    getCategoryInfoArray,
    getCategoryInfoArrayByJson,
    getCategoryPath,
} from "@/utils/function/blog-contents-loader/category/getCategory"
import { getCategoryPostMeta } from "@/utils/function/blog-contents-loader/category/getCategoryPost"
import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import React, { useEffect, useState } from "react"
import styled, { css } from "styled-components"
import SvgFlagFill from "@/components/UI/Atoms/Icons/FlagFill"
import SvgDelete from "@/components/UI/Atoms/Icons/Delete"
import { PostMetaType } from "@/utils/types/main/postMeta"
import { PageType } from "@/utils/types/pageType"

interface CategoryProps {
    categoryPostArray: PostMetaType[]
    category: string
    categoryColor: string
    categoryDescription: string
    categoryTagArray: string[]
}

//* Main
const Container = styled.div`
    width: 70%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;

    gap: 1rem;

    ${media.widePhone} {
        width: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        padding: 2rem 0;

        gap: 2rem;
    }
`
//* Post
const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    flex: 3;

    height: 32.5rem;

    gap: 1.75rem;
    padding-right: 0.5rem;

    overflow-y: scroll;

    ::-webkit-scrollbar {
        width: 0.125rem;
        padding: 0.25rem;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${(p) => p.theme.primary1};
        border-radius: 0.2rem;
    }

    ::-webkit-scrollbar-track {
        background: ${(p) => p.theme.primary1}36;
        border-radius: 0.2rem;
    }

    ${media.widePhone} {
        padding-right: 0;
        overflow-y: auto;
        gap: 1.5rem;
        justify-content: center;
    }
`
//* Left -> category | tags
const CategoryInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    flex: 2.5;

    height: fit-content;

    gap: 5rem;

    ${media.widePhone} {
        align-items: center;
        justify-content: center;
        gap: 1.5rem;
    }
`
const CategoryTitle = styled.div<{ categoryColor: string }>`
    font-size: 3.5rem;
    font-weight: 1000;
    text-shadow: 7px 5px 0 ${({ theme, categoryColor }) => theme.teal5};
    text-transform: capitalize;

    margin-left: 0.5rem;

    ${media.widePhone} {
        padding-bottom: -1.75rem;
        border-bottom: 0.35rem solid ${(p) => p.theme.teal5};
        margin-left: 0;
        font-size: ${(p) => p.theme.title};
        font-weight: 800;
        text-shadow: none;
        color: ${(p) => p.theme.gray10};
    }
`

function Category({
    categoryPostArray,
    category,
    categoryColor,
    categoryDescription,
    categoryTagArray,
}: CategoryProps) {
    const [filteredTagArray, setFilteredTagArray] = useState<string[]>([])
    const [filteredCategoryPostArray, setFilteredCategoryPostArray] = useState<
        PostMetaType[]
    >([])

    useEffect(() => {
        const updatedFilteredCategoryPostArray = categoryPostArray.filter(
            ({ tags }) =>
                tags.map((tag) => filteredTagArray.includes(tag)).includes(true)
        )
        setFilteredCategoryPostArray(updatedFilteredCategoryPostArray)
    }, [filteredTagArray, categoryPostArray])

    return (
        <Container>
            <CategoryInfoContainer>
                <CategoryTitle categoryColor={`${categoryColor}63`}>
                    {category}
                    {filteredCategoryPostArray.length !== 0 &&
                        ` ${filteredCategoryPostArray.length} 개`}
                </CategoryTitle>

                <CategoryTag
                    filteredTagArray={filteredTagArray}
                    setFilteredTagArray={setFilteredTagArray}
                    categoryTagArray={categoryTagArray}
                />
            </CategoryInfoContainer>

            <PostContainer>
                {filteredCategoryPostArray &&
                    filteredCategoryPostArray.length !== 0 &&
                    filteredCategoryPostArray.map((categoryPost, order) => (
                        <PostLink
                            {...categoryPost}
                            order={order}
                            isFirst={order === 0}
                            isLast={order === categoryPostArray?.length - 1}
                            key={categoryPost.title}
                            isCategoryPage={true}
                        />
                    ))}
                {filteredCategoryPostArray?.length === 0 &&
                    categoryPostArray.map((categoryPost, order) => (
                        <PostLink
                            {...categoryPost}
                            order={order}
                            isFirst={order === 0}
                            isLast={order === categoryPostArray?.length - 1}
                            key={categoryPost.title}
                            isCategoryPage={true}
                        />
                    ))}
            </PostContainer>
        </Container>
    )
}

Category.displayName = "Category" as PageType
export default Category

const borderStyle = {
    topLeftBottomRight: css`
        border-radius: ${(p) =>
            `${p.theme.bxxxlg} ${p.theme.blg} ${p.theme.bxxxlg} ${p.theme.blg}`};
    `,
    topRightBottomLeft: css`
        border-radius: ${(p) =>
            `${p.theme.blg} ${p.theme.bxxxlg} ${p.theme.blg} ${p.theme.bxxxlg}`};
    `,
}

const backgroundStyle = {
    brightTeal: css`
        background-color: ${(p) => p.theme.white}59;
        backdrop-filter: blur(15px);
        color: ${(p) => p.theme.teal8};

        svg {
            fill: ${(p) => p.theme.teal8};
            width: 0.725rem;
        }

        &:hover {
            box-shadow: 4px 4px 0px ${(p) => p.theme.teal2};
        }
    `,
    darkTeal: css`
        background-color: ${(p) => p.theme.teal8};
        color: ${(p) => p.theme.gray1};

        svg {
            fill: ${(p) => p.theme.teal1};
            width: 0.725rem;
        }
        &:hover {
            box-shadow: 4px 4px 0px ${(p) => p.theme.teal10};
        }
    `,
}

const tagStyle = [
    css`
        ${borderStyle.topLeftBottomRight}
        ${backgroundStyle.darkTeal}
    `,
    css`
        ${borderStyle.topRightBottomLeft}
        ${backgroundStyle.darkTeal}
    `,
    css`
        ${borderStyle.topRightBottomLeft}
        ${backgroundStyle.brightTeal}
    `,
    css`
        ${borderStyle.topLeftBottomRight}
        ${backgroundStyle.brightTeal}
    `,
    css`
        ${borderStyle.topLeftBottomRight}
        ${backgroundStyle.brightTeal}
    `,
    css`
        ${borderStyle.topRightBottomLeft}
        ${backgroundStyle.brightTeal}
    `,
    css`
        ${borderStyle.topRightBottomLeft}
        ${backgroundStyle.darkTeal}
    `,
    css`
        ${borderStyle.topLeftBottomRight}
        ${backgroundStyle.darkTeal}
    `,
]

interface TagBoxStyle {
    order: number
    isFiltered: boolean
}

const Tag = styled.li<TagBoxStyle>`
    transition: all ease-out 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 0.15rem;

    width: 5rem;
    height: fit-content;
    padding: 0.85rem 1.5rem;
    margin: 0.5rem;

    border: 2px solid
        ${({ isFiltered, theme }) => (isFiltered ? theme.teal4 : theme.teal3)};

    font-size: ${(p) => p.theme.sm};
    font-weight: ${({ isFiltered }) => (isFiltered ? 900 : 600)};
    letter-spacing: 0.05rem;

    opacity: ${({ isFiltered }) => (isFiltered ? 1 : 0.65)};

    &:hover {
        opacity: 1;
    }
    cursor: pointer;
    user-select: none;

    ${({ order }) => tagStyle[order]}

    ${media.widePhone} {
        width: 6.5rem;
        width: fit-content;
        height: fit-content;
        padding: 0.5rem 1rem;
        margin: 0.25rem;
        font-weight: 700;
    }
`
const TagContainer = styled.ul`
    display: flex;
    flex-wrap: wrap;

    gap: 0.25rem;

    width: inherit;
    height: fit-content;

    ${media.widePhone} {
        align-items: center;
        justify-content: center;
    }
`

interface CategoryTagProps {
    categoryTagArray: string[]
    filteredTagArray: string[]
    setFilteredTagArray: React.Dispatch<React.SetStateAction<string[]>>
}
const CategoryTag = ({
    categoryTagArray,
    filteredTagArray,
    setFilteredTagArray,
}: CategoryTagProps) => {
    const updateFilteredTagArray = (slectedTag: string) => {
        setFilteredTagArray((filteredTagArray) => {
            const isTagIncluded = filteredTagArray.includes(slectedTag)

            if (isTagIncluded)
                return filteredTagArray.filter((tag) => tag !== slectedTag)
            else return [...filteredTagArray, slectedTag]
        })
    }

    const resetFilteredTagArray = () => setFilteredTagArray([])

    return (
        <TagContainer>
            {categoryTagArray?.map((categoryTag, order) => {
                const isFiltered = filteredTagArray.includes(categoryTag)
                return (
                    <Tag
                        onClick={() => updateFilteredTagArray(categoryTag)}
                        order={order % 8}
                        isFiltered={isFiltered}
                        key={categoryTag}
                    >
                        {isFiltered ? <SvgFlagFill /> : <p>#</p>}
                        {categoryTag}
                    </Tag>
                )
            })}
            {filteredTagArray.length !== 0 && (
                <Tag
                    order={categoryTagArray.length % 8}
                    isFiltered={true}
                    onClick={resetFilteredTagArray}
                >
                    <SvgDelete />
                    reset
                </Tag>
            )}
        </TagContainer>
    )
}

interface ParamQuery extends ParsedUrlQuery {
    category: string
}

export const getStaticProps: GetStaticProps<CategoryProps> = async ({
    params,
}) => {
    const { category } = params as ParamQuery

    const categoryInfoArray = await getCategoryInfoArrayByJson()
    const categoryPostArray = await getCategoryPostMeta(category)

    const { color: categoryColor, description: categoryDescription } =
        categoryInfoArray.filter(
            ({ category: categoryName }) => categoryName === category
        )[0]

    const deduplicatedCategoryTagStringArray = [
        ...new Set(categoryPostArray.flatMap(({ tags }) => tags)),
    ].sort()

    return {
        props: {
            categoryPostArray,
            category,
            categoryColor,
            categoryDescription,
            categoryTagArray: deduplicatedCategoryTagStringArray,
        },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const categoryPaths = await getCategoryPath()
    return {
        paths: categoryPaths,
        fallback: false,
    }
}
