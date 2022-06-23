import styled, { css } from "styled-components"
import media from "@styles/utils/media"
import { iconStyle } from "@styles/utils/icon.style"

import { ColorProps, IsLight } from "@typing/theme"

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
    category: (color: string, _: boolean) => css`
        color: white;

        border-radius: ${(p) => p.theme.bxsm};
        border-left: none;

        background-color: ${color};

        cursor: pointer;
    `,
}

interface TagStyle extends ColorProps {
    tagType: keyof typeof TAG_STYLE
}

const PostTag = styled.div<TagStyle & IsLight>`
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
        background-color: ${({ theme, _color }) =>
            `${_color}${theme.opacity40}`};
    }

    ${media.widePhone} {
        font-size: ${(p) => p.theme.sm};
    }

    ${(p) => iconStyle.md({ color: p._color })}
    ${({ tagType, _color, isLight }) => TAG_STYLE[tagType](_color, isLight)};
`

export default PostTag
