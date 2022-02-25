import CategoryTitle from "@/components/UI/Atoms/UnderscoreText/UnderscoreText"
import { CategoryInfo } from "@/utils/types/category/category"
import Link from "next/link"
import { useState } from "react"
import styled, { css } from "styled-components"
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

const ITEM_HEIGHT = "5rem"

const categoryContainerStyle = () => css`
    width: 20rem;
    height: ${ITEM_HEIGHT};
    padding: 2.05rem;
    border-radius: 7rem 0.1rem 0.1rem 7rem;
`

const CategoryLinkContainer = styled.div<{ isHover: boolean; color: string }>`
    transition: all ease-out 0.25s;

    display: flex;
    align-items: center;
    justify-content: space-between;

    ${categoryContainerStyle};
    background-color: ${(p) => p.theme.white};
    border: 0.1rem solid transparent;
    border-right: 0.1rem solid ${({ color }) => `${color}${OPACITY.border}`};

    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;

    &:hover {
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        border-color: ${({ color }) => `${color}${OPACITY.border}`};

        /* background-color: ${({ color }) =>
            `${color}${OPACITY.background}`}; */
    }

    user-select: none;
`
const CategoryTextContainer = styled.div<CategoryLinkContainerStyle>`
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${({ color }) => color};

    width: 3.5rem;
    height: 3.5rem;
    padding: 0.75rem;

    /* border: 0.1rem solid ${(p) => p.theme.gray2}; */
    box-shadow: 0 0 0 0.25rem ${({ color }) => `${color}${OPACITY.border}`};
    border-radius: 50%;
`
const CategoryText = styled.h1`
    color: ${(p) => p.theme.white};
    font-weight: 600;
    font-size: 2.65rem;
    margin-bottom: 0.5rem;
`
const CategoryInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    width: min(12.5rem, 80%);
    height: 6rem;

    cursor: pointer;
`

const CategoryDescription = styled.div`
    font-size: ${(p) => p.theme.sm};
    color: ${(p) => p.theme.gray5};
    font-weight: 200;
    line-height: 1.15rem;
`
interface CategoryLinkProps extends CategoryLinkContainerStyle, CategoryInfo {}
function CategoryLink({
    color,
    category,
    description,
    categoryUrl,
}: CategoryLinkProps) {
    const [isHover, setIsHover] = useState<boolean>(true)
    return (
        <CategoryLinkContainer
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
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
