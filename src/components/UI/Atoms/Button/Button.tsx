import styled from "styled-components"
import media from "@styles/utils/media"
import { iconStyle } from "@styles/utils/icon.style"

import React from "react"

const ButtonStyled = styled.button`
    transition: all ease-out 0.1s;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 0.3rem 0.5rem;

    color: ${(p) => p.theme.fontColor};
    font-size: ${(p) => p.theme.sm};

    border-radius: ${(p) => p.theme.bxsm};

    border: 1px solid transparent;
    background-color: transparent;

    gap: 0.35rem;

    user-select: none;
    cursor: pointer;

    &:hover {
        background-color: ${({ theme }) =>
            `${theme.containerBackgroundColor}${theme.themeHexOpacity}`};
        border-color: ${(p) => p.theme.containerBorderColor};
    }

    ${media.widePhone} {
        padding: 0.3rem;
        gap: 0.2rem;

        background-color: transparent;
    }

    ${iconStyle.md()};
`

interface ButtonProps {
    onClick?: (...arg: any[]) => any
    children: React.ReactNode
    type?: "button" | "submit" | "reset"
    ariaLabel: string
}
const Button = React.forwardRef<React.RefObject<HTMLElement>, ButtonProps>(
    ({ onClick, children, ariaLabel, type = "button" }, ref) => {
        return (
            <ButtonStyled onClick={onClick} aria-label={ariaLabel} type={type}>
                {children}
            </ButtonStyled>
        )
    }
)

Button.displayName = "button"
export default Button
