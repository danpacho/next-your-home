import { FontSizeType } from "@/styles/utils/font"
import { PalleteType } from "@/styles/utils/pallete"
import styled, { css } from "styled-components"
interface UnderscoreTextStyle {
    isHover: boolean

    underscoreColor: any | string
    underscoreHeight?: number
    underscoreMargin?: number
    underscoreOpacity?: number

    fontSize: FontSizeType
    fontColor: PalleteType
    fontWeight: number

    transformOrigin?: "center" | "right" | "left"
}

const UnderscoreTextStyled = styled.div<UnderscoreTextStyle>`
    font-size: ${({ theme, fontSize }) => theme[fontSize]};
    color: ${({ theme, fontColor }) => theme[fontColor]};
    font-weight: ${({ fontWeight }) => fontWeight};

    ::after {
        transition: transform 0.25s ease-in-out;

        content: "";
        display: block;

        background-color: ${({ underscoreColor }) => underscoreColor};
        opacity: ${({ underscoreOpacity }) =>
            underscoreOpacity ? underscoreOpacity : 0.35};

        margin-top: -0.35rem;
        height: 0.5rem;

        transform-origin: ${({ transformOrigin }) =>
            transformOrigin ? transformOrigin : "center"};
        transform: scaleX(0);
    }

    ${({ isHover }) =>
        isHover &&
        css`
            ::after {
                transform: scaleX(1);
            }
        `}
`

interface UnderscoreTextProps extends UnderscoreTextStyle {
    children: string
}
function UnderscoreText(props: UnderscoreTextProps) {
    return (
        <UnderscoreTextStyled {...props}>{props.children}</UnderscoreTextStyled>
    )
}

export default UnderscoreText
