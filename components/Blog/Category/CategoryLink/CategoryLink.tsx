import { useState } from "react"
import Link from "next/link"
import styled from "styled-components"
import media from "@styles/utils/media"

import CategoryTitle from "@components/UI/Atoms/UnderscoreText/UnderscoreText"
import { CategoryInfoType } from "@/types/category/info"
import { sliceTextByMaxLength } from "@/utils/function/text"
import shadow from "@/styles/utils/shadow"
import animation from "@/styles/utils/animation"

interface CategoryLinkContainerStyle {
    color: string
}

const OPACITY = {
    border: 66,
    background: 19,
}

const ITEM_HEIGHT = {
    wideScreen: 5,
    widePhone: 4,
}

interface CategoryLinkContainerStyle {
    isHover: boolean
    color: string
}
const CategoryLinkContainer = styled.div<CategoryLinkContainerStyle>`
    transition: box-shadow ease-out 0.25s;

    display: flex;
    align-items: center;
    justify-content: space-between;

    width: min(30rem, 80%);
    height: ${ITEM_HEIGHT.wideScreen}rem;

    padding: 2.15rem;

    border-right: 0.2rem solid
        ${({ color, theme }) => `${color}${theme.opacity20}`};
    border-radius: ${({ theme }) => `7rem ${theme.bxxsm} ${theme.bxxsm} 7rem`};

    background: rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(15px);

    box-shadow: ${shadow.shadowSm};

    user-select: none;

    cursor: pointer;

    &:hover {
        box-shadow: 5px 3.5px 0 0
            ${({ color, theme }) => `${color}${theme.opacity50}`};

        backdrop-filter: none;
    }

    ${media.widePhone} {
        height: ${ITEM_HEIGHT.widePhone}rem;

        background-color: ${(p) => p.theme.white};
        backdrop-filter: none;

        padding: 1.5rem;

        border-right-width: 0.25rem;

        &:hover {
            box-shadow: none;
        }
    }
`
const CategoryEmojiContainer = styled.div<CategoryLinkContainerStyle>`
    transition: box-shadow cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.4s;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${({ color }) => color};

    width: ${ITEM_HEIGHT.wideScreen}rem;
    height: ${ITEM_HEIGHT.wideScreen}rem;

    box-shadow: ${({ isHover, color, theme }) =>
        `0 0 0 ${isHover ? "1.1rem" : "0.5rem"} ${color}${theme.opacity20}`};

    border-radius: ${ITEM_HEIGHT.wideScreen / 2}rem;

    font-size: 2.65rem;

    animation: ${animation.fadeIn} 0.5s ease-in;

    ${media.widePhone} {
        font-size: 2.35rem;
        width: ${ITEM_HEIGHT.widePhone}rem;
        height: ${ITEM_HEIGHT.widePhone}rem;

        border-radius: ${ITEM_HEIGHT.widePhone / 2}rem;
        box-shadow: ${({ color, theme }) =>
            `0 0 0 0.35rem ${color}${theme.opacity20}`};
    }
`

const CategoryInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    max-width: 50%;
    height: 6rem;

    ${media.widePhone} {
        width: 60%;
        height: 4.5rem;
    }
`

const CategoryDescription = styled.div`
    font-size: ${(p) => p.theme.sm};
    color: ${(p) => p.theme.gray5};
    font-weight: 200;
    line-height: 1.15rem;

    ${media.widePhone} {
        color: ${(p) => p.theme.gray6};

        font-weight: 300;
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
    return (
        <Link href={categoryUrl} passHref>
            <CategoryLinkContainer
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                isHover={isHover}
                color={color}
            >
                <CategoryEmojiContainer color={color} isHover={isHover}>
                    {emoji}
                </CategoryEmojiContainer>

                <CategoryInfoContainer>
                    <CategoryTitle
                        isHover={isHover}
                        fontColor="gray8"
                        fontWeight={200}
                        fontSize="lg"
                        underscoreColor={color}
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
