import styled, { css } from "styled-components"
import media from "@styles/utils/media"
import { iconStyle } from "@styles/utils/icon.style"

import { IsLight } from "@typing/theme"

import { useAtoms, _slector } from "@lib/jotai"

const TAG_STYLE = {
    info: (color: string, isLight: boolean) => css`
        background-color: ${color}${(p) => (isLight ? p.theme.opacity10 : p.theme.opacity30)};

        border-left-color: ${color};
        border-radius: ${(p) =>
            `${p.theme.bxxsm} ${p.theme.bxsm} ${p.theme.bxsm} ${p.theme.bxxsm}`};

        cursor: pointer;
    `,
    tag: (color: string, isLight: boolean) => css`
        background-color: ${color}${(p) => (isLight ? p.theme.opacity10 : p.theme.opacity30)};

        border-left-color: ${color};
        border-radius: ${(p) =>
            `${p.theme.bxxsm} ${p.theme.bxsm} ${p.theme.bxsm} ${p.theme.bxxsm}`};

        padding-right: 0.75rem;

        font-style: italic;

        ${media.widePhone} {
            padding: 0.25rem;
            padding-right: 0.65rem;
        }
    `,
    category: (color: string) => css`
        color: white;

        border-radius: ${(p) => p.theme.bxsm};
        border-left: none;

        background-color: ${color};

        cursor: pointer;
    `,
}

interface TagStyle {
    color: string
    tagType: keyof typeof TAG_STYLE
}

const PostTagStyled = styled.div<TagStyle & IsLight>`
    transition: background-color ease-out 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 0.25rem;

    height: 1.5rem;
    padding: 0.25rem 0.5rem;

    border-left-width: 0.2rem;
    border-left-style: solid;

    color: ${(p) => p.theme.fontColor};
    font-weight: 400;

    user-select: none;

    &:hover {
        background-color: ${({ theme, color }) => `${color}${theme.opacity40}`};
    }

    ${media.widePhone} {
        font-size: ${(p) => p.theme.sm};
    }

    ${(p) => iconStyle.md({ color: p.color })}
    ${({ tagType, color, isLight }) => TAG_STYLE[tagType](color, isLight)};
`

interface PostTagProps extends TagStyle {
    children: React.ReactNode
}
function PostTag({ children, color, tagType }: PostTagProps) {
    const { isLightState: isLight } = useAtoms(_slector("isLight"))
    return (
        <PostTagStyled isLight={isLight} color={color} tagType={tagType}>
            {children}
        </PostTagStyled>
    )
}

export default PostTag
