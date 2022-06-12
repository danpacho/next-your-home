import styled from "styled-components"
import media from "@styles/utils/media"
import { iconStyle } from "@styles/utils/icon.style"

import { IsLight } from "@typing/theme"

const CategoryPaginationButton = styled.button<{ isLeft?: boolean } & IsLight>`
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

    border-radius: ${(p) => p.theme.bxsm};
    border-color: transparent;
    border-style: solid;
    border-width: 0.075rem;

    background-color: ${({ theme, isLight }) =>
        isLight
            ? `${theme.gray1}${theme.opacity50}`
            : `${theme.trueDeepDark}${theme.opacity40}`};

    border-color: transparent;

    gap: 0.5rem;

    ${iconStyle.md()};

    &:hover {
        border-color: ${({ theme, isLight }) =>
            isLight ? theme.gray6 : theme.gray4};
    }

    ${media.widePhone} {
        padding: 0.3rem;

        gap: 0.2rem;

        font-size: ${(p) => p.theme.xsm};
        font-weight: 700;

        border-radius: ${(p) => p.theme.bxsm};
    }

    user-select: none;
    cursor: pointer;
`

export default CategoryPaginationButton
