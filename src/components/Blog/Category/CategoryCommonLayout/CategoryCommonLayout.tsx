import styled, { css } from "styled-components"
import media from "@styles/utils/media"

import { useMemo, useState } from "react"

import { PostMetaType } from "@typing/post/meta"
import { CategoryInfoType } from "@typing/category/info"

import useSetFocusingPageColor from "@hooks/useSetFocusingPageColor"
import useFilteredPost from "./useFilteredPost"

import { shadeColor } from "@utils/function/color/shadeColor"

import { PostLink } from "@components/Blog/Post"
import { CategorySEO } from "@components/Next/SEO"

import CategoryTag from "../CategoryTag/CategoryTag"
import { IsLight } from "@typing/theme"
import { useAtoms, _atom, _slector } from "@lib/jotai"

//* Layout
const LayoutContainer = styled.div`
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

const CategoryLeftInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    flex: 2;

    height: fit-content;

    gap: 4rem;

    ${media.widePhone} {
        align-items: center;
        justify-content: center;
        gap: 1.5rem;
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
            height: 0.75rem;
            margin-top: -0.25rem;
        }
    }

    ${media.mediumTablet} {
        font-size: ${(p) => p.theme.title};
    }

    ${media.widePhone} {
        padding-bottom: 0rem;
        margin: 1rem 0 0.5rem 0;
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

        flex-direction: column-reverse;
        align-items: center;
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
        align-items: center;
    }
`
const PaginationContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;

    ${media.widePhone} {
        width: min(35rem, 85%);
    }
`

interface CategoryProps extends CategoryInfoType {
    categoryPostArray: PostMetaType[]
    categoryTagArray: string[]
    children: React.ReactNode
    pageNumber?: number
}
function CategoryCommonLayout({
    categoryPostArray,
    category,
    color: categoryColor,
    description: categoryDescription,
    emoji: categoryEmoji,
    categoryTagArray,
    categoryUrl,
    children: PaginationLinkComponent,
    pageNumber,
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

                <CategoryTag
                    categoryTagArray={categoryTagArray}
                    filteredTagArray={filteredTagArray}
                    setFilteredTagArray={setFilteredTagArray}
                    categoryColor={isLight ? categoryColor : darkModeColor}
                />
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
                    {PaginationLinkComponent}
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

    border-radius: ${(p) => p.theme.bsm};
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
        padding: 0.3rem 0.2rem;

        gap: 0.25rem;

        font-size: ${(p) => p.theme.xsm};
        font-weight: 700;

        border-radius: ${(p) => p.theme.bxsm};
        ${(p) =>
            p.isLeft
                ? css`
                      padding-right: 0.5rem;
                      margin-left: -1rem;
                  `
                : css`
                      padding-left: 0.5rem;
                      margin-right: -1rem;
                  `};
    }

    user-select: none;
    cursor: pointer;
`
