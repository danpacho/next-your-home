import styled from "styled-components"
import media from "@styles/utils/media"
import { iconStyle } from "@styles/utils/icon.style"

import { useMemo, useState } from "react"

import Link from "next/link"
import { GetStaticProps } from "next"

import { ColorProps } from "@typing/theme"
import { PageType } from "@typing/page/type"
import { CategoryInfoType } from "@typing/category/info"

import { getAllCategoryInfo } from "@utils/function/blog-contents-loader/contents/getCategory"
import { shadeColor } from "@utils/function/color/shadeColor"

import { useMouseInteraction, useSetFocusingPageColor } from "@hooks/index"

import { EmojiContainer } from "@components/UI/Atoms/EmojiContainer"
import { UnderscoreText } from "@components/UI/Atoms/UnderscoreText"
import { LeafIcon } from "@components/UI/Atoms/Icons"

import { useAtoms, _slector } from "@lib/jotai"

import { config } from "blog.config"

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

const CategoryPageLayoutContainer = styled.div`
    width: 70%;
    min-height: 35rem;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    padding: 2rem 0;

    ${media.mediumTablet} {
        width: 85%;
    }

    ${media.widePhone} {
        gap: 1rem;

        align-items: center;

        width: 100%;
        min-height: unset;
    }
`
const CategoryPageTitle = styled.div`
    color: ${(p) => p.theme.headerFontColor};
    font-size: ${(p) => p.theme.xtitle};
    font-weight: 900;

    margin-bottom: 2.5rem;

    ${media.mediumTablet} {
        font-size: ${(p) => p.theme.title};
    }

    ${media.widePhone} {
        font-size: ${(p) => p.theme.xxlg};
        font-weight: 800;

        margin-left: 0;
        margin-top: 1rem;
        margin-bottom: 1.25rem;

        padding: 0.35rem 0;
    }
`
const CategoryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;

    ${media.widePhone} {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        gap: 1.25rem;
    }
`

interface CategoryProps {
    allCategory: CategoryInfoType[]
}
function Category({ allCategory }: CategoryProps) {
    useSetFocusingPageColor(config.userPallete.primary4)

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

const CategoryLinkContaier = styled.div<ColorProps>`
    transition: background-color ease 0.15s;

    position: relative;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 1.5rem;

    padding: 1.25rem;

    cursor: pointer;

    border-radius: ${({ theme }) => theme.bxsm};
    border-right: 0.25rem solid ${(p) => p._color};

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
        border-left: 0.25rem solid ${(p) => p._color};
    }
`

const CategoryInfoContainer = styled.div<ColorProps>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    gap: 0.5rem;

    ${(p) => iconStyle.md({ hoverColor: p._color })};
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

    const { isLightState: isLight } = useAtoms(_slector("isLight"))

    const darkModeColor = useMemo(() => shadeColor(color, 50), [color])
    const categoryColor = isLight ? color : darkModeColor
    return (
        <Link passHref href={categoryUrl}>
            <CategoryLinkContaier
                {...useMouseInteraction({
                    mouseStateSetter: setIsHover,
                })}
                _color={categoryColor}
            >
                <EmojiContainer
                    color={categoryColor}
                    isHover={isHover}
                    desk={{
                        padding: 1.75,
                        size: 2.5,
                        borderRadius: 1,
                        borderWidth: 0.25,
                        borderWidthOnHover: 0.65,
                    }}
                    mobile={{
                        padding: 1.5,
                        size: 1.5,
                        borderRadius: 0.75,
                        borderWidth: 0.2,
                        fontSize: 1.8,
                    }}
                >
                    {emoji}
                </EmojiContainer>
                <CategoryInfoContainer _color={categoryColor}>
                    <UnderscoreText
                        isHover={isHover}
                        fontSize="lg"
                        underscoreColor={categoryColor}
                        fontWeight={400}
                    >
                        {category} <LeafIcon width="1rem" height="1rem" />
                    </UnderscoreText>

                    <CategoryDescription>{description}</CategoryDescription>
                </CategoryInfoContainer>
            </CategoryLinkContaier>
        </Link>
    )
}
