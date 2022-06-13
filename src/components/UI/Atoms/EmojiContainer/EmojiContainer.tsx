import styled from "styled-components"
import media from "@styles/utils/media"

interface HoverInteractionStyle {
    isHover: boolean
    color: string
    desk: {
        size: number
        padding: number
        borderRadius: number
        borderWidth: number
        borderWidthOnHover: number
        fontSize?: number
    }
    mobile: {
        size: number
        padding: number
        borderRadius: number
        borderWidth: number
        fontSize?: number
    }
}
const HoverInteractionStyled = styled.div<HoverInteractionStyle>`
    transition: box-shadow cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.4s;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${({ color }) => color};

    width: ${(p) => p.desk.size}rem;
    height: ${(p) => p.desk.size}rem;

    padding: ${(p) => p.desk.padding}rem;

    box-shadow: ${({
        isHover,
        color,
        theme,
        desk: { borderWidth, borderWidthOnHover },
    }) =>
        `0 0 0 ${isHover ? borderWidthOnHover : borderWidth}rem ${color}${
            theme.themeHexOpacity
        }`};

    border-radius: ${(p) => p.desk.borderRadius}rem;

    font-size: ${(p) =>
        p.desk.fontSize ? `${p.desk.fontSize}rem` : p.theme.xtitle};

    ${media.widePhone} {
        width: ${(p) => p.mobile.size}rem;
        height: ${(p) => p.mobile.size}rem;
        padding: ${(p) => p.mobile.padding}rem;

        box-shadow: ${({ color, theme, mobile: { borderWidth } }) =>
            `0 0 0 ${borderWidth}rem ${color}${theme.themeHexOpacity}`};

        border-radius: ${(p) => p.mobile.borderRadius}rem;

        font-size: ${(p) =>
            p.mobile.fontSize ? `${p.mobile.fontSize}rem` : p.theme.title};
    }
`
interface HoverInteractionProps extends HoverInteractionStyle {
    children: React.ReactNode
}
function HoverInteraction({ children: Emoji, ...rest }: HoverInteractionProps) {
    return <HoverInteractionStyled {...rest}>{Emoji}</HoverInteractionStyled>
}

export default HoverInteraction
