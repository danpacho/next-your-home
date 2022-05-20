import styled from "styled-components"
import animation from "@styles/utils/animation"
import media from "@styles/utils/media"
import shadow from "@styles/utils/shadow"

import { useMemo, useState } from "react"
import Link from "next/link"

import { CategoryInfoType } from "@typing/category/info"
import { IsLight } from "@typing/theme"

import { sliceTextByMaxLength } from "@utils/function/text"
import { shadeColor } from "@utils/function/color/shadeColor"

import { useThemeIsLight } from "@lib/atoms/theme/theme.state"

import CategoryTitle from "@components/UI/Atoms/UnderscoreText/UnderscoreText"
interface CategoryLinkContainerStyle {
    color: string
}

const ITEM_HEIGHT = {
    wideScreen: 5,
    widePhone: 4,
}

interface CategoryLinkContainerStyle {
    isHover: boolean
    color: string
}
const CategoryLinkContainer = styled.div<CategoryLinkContainerStyle & IsLight>`
    transition: box-shadow ease-out 0.25s;

    display: flex;
    align-items: center;
    justify-content: space-between;

    width: min(30rem, 80%);
    height: ${ITEM_HEIGHT.wideScreen}rem;

    padding: 2.15rem;

    border-right: 0.1rem solid
        ${({ color, theme, isLight }) =>
            isLight ? `${color}${theme.opacity20}` : color};
    border-radius: ${({ theme }) => `7rem ${theme.bxxsm} ${theme.bxxsm} 7rem`};

    background: ${(p) =>
        `${p.theme.containerBackgroundColor}${p.theme.opacity80}`};

    box-shadow: ${shadow.shadowSm};

    user-select: none;

    cursor: pointer;

    &:hover {
        box-shadow: 5px 3.5px 0 0
            ${({ color, theme }) => `${color}${theme.opacity50}`};
        background: ${(p) => p.theme.containerBackgroundColor};
    }

    ${media.widePhone} {
        width: min(35rem, 80%);

        height: ${ITEM_HEIGHT.widePhone}rem;

        padding: 1.75rem;

        border-right-width: 0.125rem;

        &:hover {
            box-shadow: none;
        }
    }
`
const CategoryEmojiContainer = styled.div<CategoryLinkContainerStyle & IsLight>`
    transition: box-shadow cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.4s;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${({ color }) => color};

    width: ${ITEM_HEIGHT.wideScreen}rem;
    height: ${ITEM_HEIGHT.wideScreen}rem;

    box-shadow: ${({ isHover, color, theme, isLight }) =>
        `0 0 0 ${isHover ? "1.1rem" : "0.45rem"} ${color}${
            isLight ? theme.opacity20 : theme.opacity50
        }`};

    border-radius: ${ITEM_HEIGHT.wideScreen / 2}rem;

    font-size: 2.65rem;

    animation: ${animation.fadeIn} 0.5s ease-in;

    ${media.widePhone} {
        font-size: 2.35rem;
        width: ${ITEM_HEIGHT.widePhone}rem;
        height: ${ITEM_HEIGHT.widePhone}rem;

        border-radius: ${ITEM_HEIGHT.widePhone / 2}rem;
        box-shadow: ${({ color, theme, isLight }) =>
            `0 0 0 0.35rem ${color}${
                isLight ? theme.opacity20 : theme.opacity50
            }`};
    }
`

const CategoryInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    max-width: 50%;
    height: 6.75rem;

    ${media.widePhone} {
        flex: 1;
        height: fit-content;
        max-width: unset;

        margin-left: 1.25rem;

        gap: 1rem;
    }
`

const CategoryDescription = styled.div`
    font-size: ${(p) => p.theme.sm};
    color: ${(p) => p.theme.descriptionFontColor};
    font-weight: 400;
    line-height: 1.15rem;

    ${media.widePhone} {
        line-height: 1rem;
    }
`
interface CategoryLinkProps extends CategoryInfoType {
    color: string
}
function CategoryLink({
    color,
    category,
    description,
    categoryUrl,
    emoji,
}: CategoryLinkProps) {
    const [isHover, setIsHover] = useState<boolean>(false)
    const isLight = useThemeIsLight()
    const darkModeColor = useMemo(() => shadeColor(color, 50), [color])
    return (
        <Link href={categoryUrl} passHref>
            <CategoryLinkContainer
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                isHover={isHover}
                color={isLight ? color : darkModeColor}
                isLight={isLight}
            >
                <CategoryEmojiContainer
                    isLight={isLight}
                    color={isLight ? color : darkModeColor}
                    isHover={isHover}
                >
                    {emoji}
                </CategoryEmojiContainer>

                <CategoryInfoContainer>
                    <CategoryTitle
                        isHover={isHover}
                        fontWeight={400}
                        fontSize="lg"
                        underscoreColor={isLight ? color : darkModeColor}
                        transformOrigin="left"
                    >
                        {category}
                    </CategoryTitle>
                    <CategoryDescription>
                        {sliceTextByMaxLength(description, 35)}
                    </CategoryDescription>
                </CategoryInfoContainer>
            </CategoryLinkContainer>
        </Link>
    )
}

export default CategoryLink
