import styled, { css } from "styled-components"
import media from "@styles/utils/media"
import animation from "@styles/utils/animation"

import React, { useEffect, useMemo, useState } from "react"

import { GetStaticPaths, GetStaticProps } from "next"

import { ParsedUrlQuery } from "querystring"

import { PageType } from "@typing/page/type"
import { PostMetaType } from "@typing/post/meta"
import { CategoryInfoType } from "@typing/category/info"
import { IsLight } from "@typing/theme"

import {
    getCategoryPath,
    getDeduplicatedCategoryTagArray,
    getSpecificCategoryInfo,
} from "@utils/function/blog-contents-loader/contents/getCategory"
import { getCategoryPostMeta } from "@utils/function/blog-contents-loader/contents/getCategoryPost"
import { shadeColor } from "@utils/function/color/shadeColor"

import { useStateFocusingPageColor } from "@lib/atoms/pageColor/pageColor.state"
import { useThemeIsLight } from "@lib/atoms/theme/theme.state"

import { DeleteIcon, FlagFillIcon } from "@components/UI/Atoms/Icons"
import { PostLink } from "@components/Blog/Post"

import { config } from "blog.config"
import { CategorySEO } from "@components/Next/SEO"
import { replaceUnderscoreToSpacing } from "@utils/function/text"

//* Main
const Container = styled.div`
    width: 70%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;

    gap: 1rem;

    ${media.mediumTablet} {
        width: 85%;
    }

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

    height: 31.5rem;

    gap: 1.75rem;
    padding-right: 0.5rem;
    padding-bottom: 1rem;

    overflow-y: scroll;

    ::-webkit-scrollbar {
        width: 0.1rem;
        padding: 0.25rem;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${(p) => p.theme.themePrimaryColor};
        border-radius: 0.2rem;
    }

    ::-webkit-scrollbar-track {
        background: ${({ theme }) =>
            `${theme.themePrimaryColor}${theme.opacity50}`};
        border-radius: 0.2rem;
    }

    ${media.widePhone} {
        width: 100%;
        padding-right: 0;
        overflow-y: auto;
        gap: 1.5rem;
        height: fit-content;
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
const CategoryTitleContainer = styled.div<{ categoryColor: string }>`
    gap: 0.5rem;

    color: ${(p) => p.theme.headerFontColor};
    font-size: 2.5rem;
    font-weight: 900;
    text-shadow: 3.75px 3.75px 0
        ${({ categoryColor, theme }) => `${categoryColor}${theme.themeOpacity}`};
    text-transform: capitalize;

    margin-left: 0.5rem;

    ::after {
        content: "";

        display: block;

        background-color: ${({ categoryColor }) => categoryColor};
        margin-top: -0.5rem;
        height: 1rem;
        opacity: ${(p) => p.theme.themeOpacity};
    }

    ${media.mediumTablet} {
        font-size: 2.25rem;
    }

    ${media.widePhone} {
        padding-bottom: 0rem;
        margin: 1rem 0;
        font-size: ${(p) => p.theme.title};
        font-weight: 800;
        text-shadow: none;
    }
`

interface CategoryProps extends CategoryInfoType {
    categoryPostArray: PostMetaType[]
    categoryTagArray: string[]
}
function Category({
    categoryPostArray,
    category,
    color: categoryColor,
    description: categoryDescription,
    emoji: categoryEmoji,
    categoryTagArray,
    categoryUrl,
}: CategoryProps) {
    const fixedCategory = replaceUnderscoreToSpacing(category)

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

    const [_, setFocusingPageColor] = useStateFocusingPageColor()
    useEffect(
        () => setFocusingPageColor(categoryColor),
        [setFocusingPageColor, categoryColor]
    )
    const isfilterExists = filteredCategoryPostArray?.length !== 0

    const isLight = useThemeIsLight()
    const darkModeColor = useMemo(
        () => shadeColor(categoryColor, 35),
        [categoryColor]
    )
    return (
        <Container>
            <CategorySEO
                category={fixedCategory}
                categoryUrl={categoryUrl}
                description={categoryDescription}
                emoji={categoryEmoji}
            />
            <CategoryInfoContainer>
                <CategoryTitleContainer
                    categoryColor={isLight ? categoryColor : darkModeColor}
                >
                    {fixedCategory}{" "}
                    {filteredCategoryPostArray.length === 0
                        ? categoryEmoji
                        : `${filteredCategoryPostArray.length} 개`}
                </CategoryTitleContainer>

                <CategoryTag
                    filteredTagArray={filteredTagArray}
                    setFilteredTagArray={setFilteredTagArray}
                    categoryTagArray={categoryTagArray}
                    categoryColor={isLight ? categoryColor : darkModeColor}
                />
            </CategoryInfoContainer>

            <PostContainer>
                {isfilterExists &&
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
                {!isfilterExists &&
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
    noneFiltered: (color: string, isLight: boolean) => css`
        background-color: ${(p) =>
            `${p.theme.containerBackgroundColor}${p.theme.opacity50}`};
        backdrop-filter: blur(15px);
        color: ${(p) => (isLight ? color : p.theme.gray2)};

        svg {
            fill: ${color};
            width: 0.725rem;
        }

        &:hover {
            box-shadow: 4px 4px 0px ${color}${(p) => p.theme.opacity70};
        }
    `,
    filtered: (color: string) => css`
        background-color: ${color};
        color: ${(p) => p.theme.white};

        box-shadow: 0 0 0 2.5px ${color}${(p) => p.theme.opacity40};

        svg {
            fill: ${(p) => p.theme.white};
            width: 0.725rem;
        }
        &:hover {
            box-shadow: -4px 4px 0px ${color}${(p) => p.theme.opacity30};
        }
    `,
}

const tagStyle = [
    css`
        ${borderStyle.topLeftBottomRight}
    `,
    css`
        ${borderStyle.topRightBottomLeft}
    `,
    css`
        ${borderStyle.topRightBottomLeft}
    `,
    css`
        ${borderStyle.topLeftBottomRight}
    `,
]

interface TagBoxStyle {
    order: number
    isFiltered: boolean
    color: string
}

const Tag = styled.li<TagBoxStyle & IsLight>`
    transition: box-shadow ease-out 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 0.15rem;

    width: 5rem;
    height: fit-content;
    padding: 0.85rem 1.5rem;
    margin: 0.5rem;

    border: 1.75px solid
        ${({ isFiltered, color, theme }) =>
            isFiltered ? "transparent" : `${color}${theme.opacity20}`};

    font-size: ${(p) => p.theme.sm};
    font-weight: 800;
    letter-spacing: 0.035rem;

    cursor: pointer;
    user-select: none;

    ${({ order }) => tagStyle[order]}
    ${({ color, isFiltered, isLight }) =>
        isFiltered
            ? backgroundStyle.filtered(color)
            : backgroundStyle.noneFiltered(color, isLight)}

    ${media.mediumTablet} {
        width: fit-content;
        min-width: 4rem;

        letter-spacing: 0.02rem;
        padding: 0.75rem 1.1rem;
        font-weight: 700;
    }

    ${media.widePhone} {
        min-width: 2.5rem;
        width: fit-content;
        height: fit-content;

        padding: 0.65rem 0.8rem;
        margin: 0.25rem;
        font-weight: 600;

        border-width: 1.5px;
    }

    animation: ${animation.zoomIn} cubic-bezier(0.075, 0.82, 0.165, 1) 0.25s;
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
        margin-bottom: 0.75rem;
    }
`

interface CategoryTagProps {
    categoryColor: string
    categoryTagArray: string[]
    filteredTagArray: string[]
    setFilteredTagArray: React.Dispatch<React.SetStateAction<string[]>>
}
const getUpdatedFileterdTagArray = (
    slectedTag: string,
    filteredTagArray: string[]
) => {
    const isTagIncluded = filteredTagArray.includes(slectedTag)

    if (isTagIncluded)
        return filteredTagArray.filter((tag) => tag !== slectedTag)
    else return [...filteredTagArray, slectedTag]
}
const CategoryTag = ({
    categoryColor,
    categoryTagArray,
    filteredTagArray,
    setFilteredTagArray,
}: CategoryTagProps) => {
    const resetFilteredTagArray = () => setFilteredTagArray([])

    const isLight = useThemeIsLight()

    return (
        <TagContainer>
            {categoryTagArray?.map((categoryTag, order) => {
                const isFiltered = filteredTagArray.includes(categoryTag)
                return (
                    <Tag
                        onClick={() => {
                            const updatedFilteredTagArray =
                                getUpdatedFileterdTagArray(
                                    categoryTag,
                                    filteredTagArray
                                )
                            setFilteredTagArray(updatedFilteredTagArray)
                        }}
                        color={categoryColor}
                        isFiltered={isFiltered}
                        order={order % 4}
                        isLight={isLight}
                        key={categoryTag}
                    >
                        {isFiltered ? <FlagFillIcon /> : <p>#</p>}
                        {categoryTag}
                    </Tag>
                )
            })}
            {filteredTagArray.length !== 0 && (
                <Tag
                    order={categoryTagArray.length % 4}
                    isFiltered={true}
                    onClick={resetFilteredTagArray}
                    color={categoryColor}
                    isLight={isLight}
                >
                    <DeleteIcon />
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

    const categoryPostArray = await getCategoryPostMeta(category)
    const specificCategoryInfo = await getSpecificCategoryInfo({
        category,
        useTXT: config.useTXT,
    })
    const categoryTagArray = await getDeduplicatedCategoryTagArray(category)

    return {
        props: {
            categoryPostArray,
            categoryTagArray,
            ...specificCategoryInfo,
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
