import { BorderRadiusType } from "@/styles/utils/borderRadius"
import { containerStyle } from "@/styles/utils/ContainerTheme"
import { PalleteType } from "@/styles/utils/pallete"
import { ShadowType } from "@/styles/utils/shadow"
import { ReactElement } from "react"
import styled from "styled-components"

interface BoxStyledStyle {
    borderRadius?: BorderRadiusType
    backgroundColor?: PalleteType
    borderColor?: PalleteType
    shadow?: ShadowType
    borderWidth?: number
}

const BoxStyled = styled.div<BoxStyledStyle>`
    transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.25s;

    display: flex;
    align-items: center;
    justify-content: center;

    width: fit-content;
    height: fit-content;

    padding: 0.5rem;

    ${containerStyle.default};

    border-style: solid;
    border-width: ${({ borderWidth }) =>
        borderWidth ? `${borderWidth}rem` : "0.015rem"};
    border-color: ${({ theme, borderColor }) =>
        borderColor ? theme[borderColor] : ""};
    border-radius: ${({ theme, borderRadius }) =>
        borderRadius ? theme[borderRadius] : theme.bmd};

    background-color: ${({ theme, backgroundColor }) =>
        backgroundColor ? theme[backgroundColor] : ""};

    box-shadow: ${({ theme, shadow }) => (shadow ? theme[shadow] : "none")};
`

interface BoxProps extends BoxStyledStyle {
    innerContent: ReactElement | string
}
function Box({
    innerContent,
    backgroundColor,
    borderColor,
    borderRadius,
}: BoxProps) {
    return (
        <BoxStyled
            backgroundColor={backgroundColor}
            borderColor={borderColor}
            borderRadius={borderRadius}
        >
            {innerContent}
        </BoxStyled>
    )
}

export default Box
