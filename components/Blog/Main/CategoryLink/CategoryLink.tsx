import { useState } from "react"
import Link from "next/link"
import styled, { css } from "styled-components"
import media from "@styles/utils/media"

import { CategoryInfo } from "@utils/types/category/category"
import CategoryTitle from "@components/UI/Atoms/UnderscoreText/UnderscoreText"

interface CategoryLinkContainerStyle {
    color: string
}

const categoryLinkButtonStyle = {
    even: () => css``,
    odd: () => css``,
}

const OPACITY = {
    border: 66,
    background: 19,
}

const ITEM_HEIGHT = {
    wideScreen: 5,
    widePhone: 4,
}

const CategoryLinkContainer = styled.div<{ isHover: boolean; color: string }>`
    transition: all ease-out 0.25s;

    display: flex;
    align-items: center;
    justify-content: space-between;

    width: min(30rem, 80%);
    height: ${ITEM_HEIGHT.wideScreen}rem;

    padding: 2.05rem;

    border: 0.1rem solid transparent;
    border-right: 0.1rem solid ${({ color }) => `${color}${OPACITY.border}`};
    border-radius: 7rem 0.1rem 0.1rem 7rem;

    background-color: ${(p) => p.theme.white};

    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;

    &:hover {
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        border-color: ${({ color }) => `${color}${OPACITY.border}`};
    }

    user-select: none;

    ${media.widePhone} {
        height: ${ITEM_HEIGHT.widePhone}rem;
        padding: 1.5rem;
        border-right-width: 0.25rem;
    }
`
const CategoryTextContainer = styled.div<CategoryLinkContainerStyle>`
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${({ color }) => color};

    width: ${ITEM_HEIGHT.wideScreen}rem;
    height: ${ITEM_HEIGHT.wideScreen}rem;

    box-shadow: 0 0 0 0.25rem ${({ color }) => `${color}${OPACITY.border}`};
    border-radius: ${ITEM_HEIGHT.wideScreen / 2}rem;

    ${media.widePhone} {
        width: ${ITEM_HEIGHT.widePhone}rem;
        height: ${ITEM_HEIGHT.widePhone}rem;

        border-radius: ${ITEM_HEIGHT.widePhone / 2}rem;
    }
`
const CategoryText = styled.h1`
    color: ${(p) => p.theme.white};
    font-weight: 600;
    font-size: 2.65rem;
    margin-bottom: 0.5rem;

    ${media.widePhone} {
        font-size: 2.25rem;
        font-weight: 800;
        margin-bottom: 0.35rem;
    }
`
const CategoryInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    width: 50%;
    height: 6rem;

    cursor: pointer;

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
interface CategoryLinkProps extends CategoryLinkContainerStyle, CategoryInfo {}
function CategoryLink({
    color,
    category,
    description,
    categoryUrl,
}: CategoryLinkProps) {
    const [isHover, setIsHover] = useState<boolean>(false)
    return (
        <CategoryLinkContainer
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onTouchStart={() => setIsHover(true)}
            onTouchEnd={() => setIsHover(false)}
            isHover={isHover}
            color={color}
        >
            <CategoryTextContainer color={color}>
                <CategoryText>{category.slice(0, 2)}</CategoryText>
            </CategoryTextContainer>

            <Link href={categoryUrl} passHref>
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
                    <CategoryDescription>{description}</CategoryDescription>
                </CategoryInfoContainer>
            </Link>
        </CategoryLinkContainer>
    )
}

export default CategoryLink