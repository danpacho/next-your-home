import styled from "styled-components"
import media from "@styles/utils/media"

import { useMemo, useState } from "react"

import Link from "next/link"
import { PageType } from "@typing/page/type"
import { GetStaticProps } from "next"

import { CategoryInfoType } from "@typing/category/info"
import { IsLight } from "@typing/theme"

import { useThemeIsLight } from "@lib/atoms/theme/theme.state"

import { getAllCategoryInfo } from "@utils/function/blog-contents-loader/contents/getCategory"
import { shadeColor } from "@utils/function/color/shadeColor"

import { LeafIcon } from "@components/UI/Atoms/Icons"
import CategoryTitle from "@components/UI/Atoms/UnderscoreText/UnderscoreText"

import { config } from "blog.config"

const CategoryPageLayoutContainer = styled.div`
    width: 70%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    padding: 2rem 0;

    ${media.mediumTablet} {
        width: 85%;
    }

    ${media.widePhone} {
        gap: 1rem;

        width: 100%;
    }
`
const CategoryPageTitle = styled.div`
    color: ${(p) => p.theme.headerFontColor};
    font-size: 2.5rem;
    font-weight: 900;

    margin-left: 0.5rem;
    margin-bottom: 2.5rem;

    ${media.mediumTablet} {
        font-size: ${(p) => p.theme.title};
    }

    ${media.widePhone} {
        font-size: ${(p) => p.theme.xlg};
        font-weight: 800;

        margin-left: 0;
        margin-top: 1rem;
        margin-bottom: 1.25rem;

        padding: 0.35rem 0;
        padding-left: 0.5rem;

        border-left: 0.5rem solid ${(p) => p.theme.fontColor};
        border-radius: ${({ theme }) => `${theme.bxxsm} 0 0 ${theme.bxxsm}`};
    }
`
const CategoryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    ${media.widePhone} {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
`

interface CategoryProps {
    allCategory: CategoryInfoType[]
}
function Category({ allCategory }: CategoryProps) {
    return (
        <CategoryPageLayoutContainer>
            <CategoryPageTitle>All Category 🔎</CategoryPageTitle>
            <CategoryContainer>
                {allCategory.map((categoryInfo) => (
                    <CategoryLink
                        {...categoryInfo}
                        key={categoryInfo.category}
                    />
                ))}
            </CategoryContainer>
        </CategoryPageLayoutContainer>
    )
}
Category.displayName = "Category" as PageType

export default Category

const CategoryLinkContaier = styled.div<{ color: string }>`
    transition: background-color ease 0.15s;

    position: relative;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 1.5rem;

    padding: 1.25rem;

    cursor: pointer;

    border-radius: ${({ theme }) => theme.bxxsm};
    border-right: 0.25rem solid ${(p) => p.color};

    background-color: ${({ theme }) =>
        `${theme.containerBackgroundColor}${theme.opacity60}`};
    &:hover {
        background-color: ${({ theme }) => theme.containerBackgroundColor};
    }

    ${media.widePhone} {
        gap: 1.25rem;

        padding: 1rem;
        flex-direction: row-reverse;
        border-right: 0;
        border-left: 0.25rem solid ${(p) => p.color};
    }
`

interface EmojiStyle {
    color: string
    isHover: boolean
}
const CategoryEmojiContainer = styled.div<EmojiStyle & IsLight>`
    transition: box-shadow cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.4s;

    display: flex;
    align-items: center;
    justify-content: center;

    min-width: 2.5rem;
    min-height: 2.5rem;
    max-width: 2.5rem;
    max-height: 2.5rem;
    padding: 0.75rem;

    background-color: ${({ color }) => color};
    box-shadow: ${({ isHover, color, theme, isLight }) =>
        `0 0 0 ${isHover ? ".65rem" : "0.35rem"} ${color}${
            isLight ? theme.opacity20 : theme.opacity50
        }`};

    border-radius: ${(p) => p.theme.bxxlg};

    font-size: 2.5rem;

    ${media.widePhone} {
        width: 1.75rem;
        height: 1.75rem;
        padding: 0.5rem;

        box-shadow: ${({ color, theme, isLight }) =>
            `0 0 0 0.3rem ${color}${
                isLight ? theme.opacity20 : theme.opacity50
            }`};
        border-radius: ${(p) => p.theme.bxlg};

        font-size: 2.25rem;
    }
`
const CategoryInfoContainer = styled.div<{ color: string }>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    gap: 0.5rem;

    svg {
        fill: ${(p) => p.theme.fontColor};
    }

    &:hover {
        svg {
            fill: ${(p) => p.color};
        }
    }
`

const CategoryDescription = styled.div`
    color: ${(p) => p.theme.descriptionFontColor};
    font-size: ${(p) => p.theme.sm};
    font-weight: 400;
    line-height: 1.3rem;

    ${media.widePhone} {
        line-height: 1.2rem;
    }
`

const CategoryLink = ({
    category,
    categoryUrl,
    color,
    description,
    emoji,
}: CategoryInfoType) => {
    const [isHover, setIsHover] = useState<boolean>(false)
    const isLight = useThemeIsLight()
    const darkModeColor = useMemo(() => shadeColor(color, 50), [color])
    const categoryColor = isLight ? color : darkModeColor
    return (
        <Link passHref href={categoryUrl}>
            <CategoryLinkContaier
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                color={categoryColor}
            >
                <CategoryEmojiContainer
                    color={categoryColor}
                    isHover={isHover}
                    isLight={isLight}
                >
                    {emoji}
                </CategoryEmojiContainer>
                <CategoryInfoContainer color={categoryColor}>
                    <CategoryTitle
                        isHover={isHover}
                        fontSize="lg"
                        underscoreColor={categoryColor}
                        fontWeight={400}
                    >
                        {category} <LeafIcon width="1rem" height="1rem" />
                    </CategoryTitle>

                    <CategoryDescription>{description}</CategoryDescription>
                </CategoryInfoContainer>
            </CategoryLinkContaier>
        </Link>
    )
}

export const getStaticProps: GetStaticProps<CategoryProps> = async () => {
    const allCategoryInfo = await getAllCategoryInfo({
        useTXT: config.useTXT,
    })
    return {
        props: {
            allCategory: allCategoryInfo,
        },
    }
}
