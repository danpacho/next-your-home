import styled from "styled-components"
import media from "@styles/utils/media"

import { useMemo, useState } from "react"
import Link from "next/link"

import { CategoryInfoType } from "@typing/category/info"
import { ColorProps, IsLight } from "@typing/theme"

import { shadeColor } from "@utils/function/color/shadeColor"

import { usePointerInteraction, useThemeMode } from "@hooks/index"

import { SizedText } from "@components/UI/Atoms/SizedText"
import { EmojiContainer } from "@components/UI/Atoms/EmojiContainer"
import { UnderscoreText } from "@components/UI/Atoms/UnderscoreText"

import { useAtoms, _slector } from "@lib/jotai"

interface CategoryLinkContainerStyle extends ColorProps {
    isHover: boolean
}
const CategoryLinkContainer = styled.div<CategoryLinkContainerStyle & IsLight>`
    transition: box-shadow ease-out 0.25s;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;

    width: 100%;
    height: 9rem;

    padding: 2.25rem;

    border-right: 0.1rem solid
        ${({ _color, theme, isLight }) =>
            isLight ? `${_color}${theme.opacity20}` : _color};
    border-radius: ${({ theme }) => `7rem ${theme.bxxsm} ${theme.bxxsm} 7rem`};

    background: ${(p) =>
        `${p.theme.containerBackgroundColor}${p.theme.opacity80}`};

    box-shadow: ${(p) => p.theme.shadowSm};

    user-select: none;

    cursor: pointer;

    &:hover {
        box-shadow: 5px 3.5px 0 0
            ${({ _color, theme }) => `${_color}${theme.themeHexOpacity}`};
        background: ${(p) => p.theme.containerBackgroundColor};
    }

    ${media.widePhone} {
        gap: 1.25rem;

        padding: 2rem;
        height: 8rem;

        border-right-width: 0.125rem;

        &:hover {
            box-shadow: none;
        }
    }
`

const CategoryInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    max-width: 45%;
    min-width: 5rem;
    height: 6.75rem;

    ${media.widePhone} {
        flex: 1;
        height: fit-content;
        max-width: unset;
        min-width: unset;

        gap: 0.8rem;
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
interface CategoryLinkProps extends CategoryInfoType, ColorProps {}
function CategoryLink({
    color,
    category,
    description,
    categoryUrl,
    emoji,
}: CategoryLinkProps) {
    const [isHover, setIsHover] = useState(false)
    const { isLight } = useThemeMode()
    const darkModeColor = useMemo(() => shadeColor(color, 50), [color])

    return (
        <Link href={categoryUrl} passHref>
            <CategoryLinkContainer
                {...usePointerInteraction({
                    pointerStateSetter: setIsHover,
                })}
                _color={isLight ? color : darkModeColor}
                isHover={isHover}
                isLight={isLight}
            >
                <EmojiContainer
                    color={isLight ? color : darkModeColor}
                    isHover={isHover}
                    desk={{
                        padding: 0,
                        size: 5,
                        borderRadius: 2.5,
                        borderWidth: 0.45,
                        borderWidthOnHover: 1.1,
                        fontSize: 2.5,
                    }}
                    mobile={{
                        padding: 0,
                        size: 4,
                        borderRadius: 2,
                        borderWidth: 0.3,
                        fontSize: 2,
                    }}
                >
                    {emoji}
                </EmojiContainer>

                <CategoryInfoContainer>
                    <UnderscoreText
                        isHover={isHover}
                        fontWeight={400}
                        fontSize="lg"
                        underscoreColor={isLight ? color : darkModeColor}
                        transformOrigin="left"
                    >
                        <SizedText lineHeight={1.5} defaultLineNumber={1}>
                            {category}
                        </SizedText>
                    </UnderscoreText>
                    <CategoryDescription>
                        <SizedText
                            defaultLineNumber={4}
                            widePhone={3}
                            mediumPhone={3}
                            lineHeight={1.2}
                        >
                            {description}
                        </SizedText>
                    </CategoryDescription>
                </CategoryInfoContainer>
            </CategoryLinkContainer>
        </Link>
    )
}

export default CategoryLink
