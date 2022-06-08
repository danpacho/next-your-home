import styled from "styled-components"
import media from "@styles/utils/media"
import { scrollBar } from "@styles/utils/scrollBar"

import { useMemo, useState } from "react"

import { IsLight } from "@typing/theme"
import { PostMetaType } from "@typing/post/meta"
import { CategoryInfoType } from "@typing/category/info"
import { SeriesInfoType } from "@typing/post/series"

import { useSetFocusingPageColor } from "@hooks/index"
import useFilteredPost from "./useFilteredPost"

import { shadeColor } from "@utils/function/color/shadeColor"

import { PostLink } from "@components/Blog/Post"
import { CategorySEO } from "@components/Next/SEO"

import { CategoryTag } from "../CategoryTag"
import { CategorySeriesViewer } from "../CategorySeries"

import { useAtoms, _atom, _slector } from "@lib/jotai"

//* Layout
const LayoutContainer = styled.div`
    width: 70%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    gap: 2rem;

    ${media.mediumTablet} {
        width: 85%;
    }

    ${media.widePhone} {
        width: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        padding: 2.5rem 0;

        gap: 2rem;
    }
`

const CategoryLeftInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    flex: 2;

    height: 35rem;

    gap: 4rem;

    ${media.widePhone} {
        align-items: center;
        justify-content: center;
        gap: 2rem;

        width: 100%;
    }
`
const CategoryTitle = styled.div<{ categoryColor: string }>`
    gap: 0.5rem;

    color: ${(p) => p.theme.headerFontColor};
    font-size: ${(p) => p.theme.xtitle};
    font-weight: 900;
    text-shadow: 3.75px 3.75px 0
        ${({ categoryColor, theme }) => `${categoryColor}${theme.themeOpacity}`};
    text-transform: capitalize;

    ::after {
        content: "";

        display: block;

        background-color: ${({ categoryColor }) => categoryColor};
        margin-top: -0.5rem;
        height: 1rem;
        opacity: ${(p) => p.theme.themeOpacity};

        ${media.widePhone} {
            height: 0.5rem;
            margin-top: -0.25rem;
        }
    }

    ${media.mediumTablet} {
        font-size: ${(p) => p.theme.title};
    }

    ${media.widePhone} {
        padding-bottom: 0rem;
        margin: 1rem 0;
        font-size: ${(p) => p.theme.xxlg};
        font-weight: 800;
        text-shadow: none;
    }
`

const CategoryPostSideContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;

    flex: 3;

    gap: 1rem;

    ${media.widePhone} {
        width: 100%;

        align-items: center;

        padding-bottom: 2rem;
    }
`
//* Right -> Post
const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    width: 100%;
    height: 31.5rem;

    gap: 1.75rem;
    padding-bottom: 0.75rem;
    padding-right: 0.75rem;

    overflow-y: scroll;

    ${(p) => scrollBar.basic(p.theme.themePrimaryColor)};

    ${media.widePhone} {
        width: 100%;
        padding-right: 0;
        overflow-y: auto;
        gap: 1.5rem;
        height: fit-content;
        justify-content: center;
        align-items: center;
    }
`
const PaginationContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
`

interface CategoryProps extends CategoryInfoType {
    categorySeriesInfoArray?: SeriesInfoType[]
    categoryPostArray: PostMetaType[]
    categoryTagArray: string[]
    pageNumber?: number
    nextPageComponent: React.ReactNode
    prevPageComponent: React.ReactNode
}
function CategoryCommonLayout({
    categoryPostArray,
    categorySeriesInfoArray,
    category,
    color: categoryColor,
    description: categoryDescription,
    emoji: categoryEmoji,
    categoryTagArray,
    categoryUrl,
    pageNumber,
    nextPageComponent,
    prevPageComponent,
}: CategoryProps) {
    useSetFocusingPageColor(categoryColor)

    const [filteredTagArray, setFilteredTagArray] = useState<string[]>([])

    const filteredCategoryPostArray = useFilteredPost({
        filteredTagArray,
        originalCategoryPostArray: categoryPostArray,
    })

    const darkModeColor = useMemo(
        () => shadeColor(categoryColor, 35),
        [categoryColor]
    )
    const { isLightState: isLight } = useAtoms(_slector("isLight"))

    const postNumber = categoryPostArray?.length

    const filteredPostNumber = filteredCategoryPostArray?.length
    const isfilterExists = filteredPostNumber !== 0

    const isSeriesExists =
        categorySeriesInfoArray && categorySeriesInfoArray.length !== 0

    return (
        <LayoutContainer>
            <CategorySEO
                category={category}
                categoryUrl={categoryUrl}
                description={categoryDescription}
                emoji={categoryEmoji}
            />
            <CategoryLeftInfoContainer>
                <CategoryTitle
                    categoryColor={isLight ? categoryColor : darkModeColor}
                >
                    {pageNumber &&
                        (filteredPostNumber === 0
                            ? `${pageNumber} 페이지 ${categoryEmoji}`
                            : `${pageNumber} 페이지, ${filteredPostNumber} 개`)}
                    {!pageNumber &&
                        (filteredPostNumber === 0
                            ? `${category} ${categoryEmoji}`
                            : `${category} ${filteredPostNumber} 개`)}
                </CategoryTitle>

                {isSeriesExists && (
                    <CategorySeriesViewer
                        categorySeriesInfoArray={categorySeriesInfoArray}
                    />
                )}
                {!isSeriesExists && (
                    <CategoryTag
                        categoryTagArray={categoryTagArray}
                        filteredTagArray={filteredTagArray}
                        setFilteredTagArray={setFilteredTagArray}
                        categoryColor={isLight ? categoryColor : darkModeColor}
                    />
                )}
            </CategoryLeftInfoContainer>

            <CategoryPostSideContainer>
                <PostContainer>
                    {isfilterExists &&
                        filteredCategoryPostArray.map((categoryPost, order) => (
                            <PostLink
                                {...categoryPost}
                                order={categoryPost.postOrder}
                                isFirst={
                                    order === 0
                                        ? filteredPostNumber === 1
                                            ? false
                                            : true
                                        : false
                                }
                                isLast={order === filteredPostNumber - 1}
                                key={categoryPost.title}
                                isCategoryPage={true}
                            />
                        ))}
                    {!isfilterExists &&
                        categoryPostArray.map((categoryPost, order) => (
                            <PostLink
                                {...categoryPost}
                                order={categoryPost.postOrder}
                                isFirst={
                                    order === 0
                                        ? postNumber === 1
                                            ? false
                                            : true
                                        : false
                                }
                                isLast={order === postNumber - 1}
                                key={categoryPost.title}
                                isCategoryPage={true}
                            />
                        ))}
                </PostContainer>

                <PaginationContainer>
                    {prevPageComponent}
                    {nextPageComponent}
                </PaginationContainer>
            </CategoryPostSideContainer>
        </LayoutContainer>
    )
}

export default CategoryCommonLayout

export const PaginationButton = styled.button<{ isLeft?: boolean } & IsLight>`
    transition: all ease-out 0.1s;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 0.25rem;
    width: max-content;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    color: ${(p) => p.theme.fontColor};
    font-weight: 400;
    font-size: ${(p) => p.theme.sm};

    border-radius: ${(p) => p.theme.bxsm};
    border-color: transparent;
    border-style: solid;
    border-width: 0.075rem;

    background-color: ${({ theme, isLight }) =>
        isLight
            ? `${theme.gray1}${theme.opacity50}`
            : `${theme.trueDeepDark}${theme.opacity40}`};

    border-color: transparent;

    gap: 0.5rem;

    &:hover {
        border-color: ${({ theme, isLight }) =>
            isLight ? theme.gray6 : theme.gray4};
    }

    svg {
        fill: ${(p) => p.theme.fontColor};
    }

    ${media.widePhone} {
        padding: 0.3rem;

        gap: 0.2rem;

        font-size: ${(p) => p.theme.xsm};
        font-weight: 700;

        border-radius: ${(p) => p.theme.bxsm};
    }

    user-select: none;
    cursor: pointer;
`
