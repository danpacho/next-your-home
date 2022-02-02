import { BorderRadiusType } from "@/styles/utils/borderRadius"
import {
    containerStyle,
    ContainerStyleType,
} from "@/styles/utils/ContainerTheme"
import { ShadowType } from "@/styles/utils/shadow"
import { ReactElement } from "react"
import styled from "styled-components"

interface ButtonContainerStyledStyle {
    buttonStyleType: ContainerStyleType
    borderRadius?: BorderRadiusType
    shadow?: ShadowType
    borderWidth?: number
}

const ButtonContainerStyled = styled.button<ButtonContainerStyledStyle>`
    transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.25s;

    display: flex;
    align-items: center;
    justify-content: center;

    width: fit-content;
    height: fit-content;

    padding: 0.5rem;

    border-style: solid;
    border-width: ${({ borderWidth }) =>
        borderWidth ? `${borderWidth}rem` : "0.015rem"};
    border-radius: ${({ theme, borderRadius }) =>
        borderRadius ? theme[borderRadius] : theme.bmd};

    box-shadow: ${({ theme, shadow }) => (shadow ? theme[shadow] : "none")};

    ${({ buttonStyleType }) => containerStyle[buttonStyleType]};
`

type ButtonType = "button" | "submit" | "reset"

interface ButtonProps extends ButtonContainerStyledStyle {
    innerContent: ReactElement | string
    type?: ButtonType
    onClick?: () => void
}

function Button({
    type = "button",
    innerContent,
    buttonStyleType,
    onClick,
}: ButtonProps) {
    return (
        <ButtonContainerStyled
            onClick={onClick}
            type={type}
            buttonStyleType={buttonStyleType}
        >
            {innerContent}
        </ButtonContainerStyled>
    )
}

export default Button
