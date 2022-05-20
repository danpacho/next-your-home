import styled, { css } from "styled-components"
import animation from "@styles/utils/animation"
import media from "@styles/utils/media"

import { IsLight } from "@typing/theme"

import { useThemeIsLight } from "@lib/atoms/theme/theme.state"

const SHADOW_PROPERTY = {
    default: {
        x: "10px",
        y: "6px",
    },
    hover: {
        x: "3px",
        y: "3px",
    },

    blur: "0px",
}

const DEFAULT_SHADOW = `${SHADOW_PROPERTY.default.x} ${SHADOW_PROPERTY.default.y} ${SHADOW_PROPERTY.blur}`
const HOVER_SHADOW = `${SHADOW_PROPERTY.hover.x} ${SHADOW_PROPERTY.hover.y} ${SHADOW_PROPERTY.blur}`

interface OrderTextStyle extends OrderTextProp, IsLight {}
const OrderTextStyled = styled.p<OrderTextStyle>`
    transition: text-shadow cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;

    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: 800;
    font-size: 100px;
    ${({ isLight, theme, isHover, color }) =>
        isLight &&
        css`
            color: ${isHover ? color : theme.trueDeepDark};
            text-shadow: ${isHover
                ? `${HOVER_SHADOW} ${color}${theme.opacity20}`
                : `${DEFAULT_SHADOW} ${color}${theme.opacity60}`};
        `}

    ${({ isLight, theme, isHover, color }) =>
        !isLight &&
        css`
            color: ${isHover ? theme.white : theme.gray2};
            text-shadow: ${isHover
                ? `${HOVER_SHADOW} ${color}${theme.opacity60}`
                : `${DEFAULT_SHADOW} ${color}`};
        `}

    animation: ${animation.fadeIn} 0.5s ease-in;

    ${media.mediumTablet} {
        font-size: 90px;
    }

    ${media.widePhone} {
        position: absolute;
        bottom: 1.25rem;
        right: 1.25rem;

        display: flex;
        align-items: center;
        justify-content: center;

        font-size: ${(p) => p.theme.sm};
        text-shadow: none;
        font-weight: 900;

        width: 1rem;
        height: 1rem;
        padding: 0.1rem;

        border-radius: ${(p) => p.theme.bmd};

        color: ${({ isLight, theme }) =>
            isLight ? theme.white : theme.headerFontColor};

        background-color: ${({ theme, color, isLight }) =>
            isLight ? color : `${color}${theme.opacity40}`};
        box-shadow: 0 0 0 0.1rem
            ${({ color, isLight, theme }) =>
                isLight ? `${color}${theme.opacity40}` : color};
    }
`

interface OrderTextProp {
    order: number
    color: string
    isHover: boolean
}

const ORDER_TEXT = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
function PostOrderText({ order, color, isHover }: OrderTextProp) {
    const isLight = useThemeIsLight()
    return (
        <OrderTextStyled
            isLight={isLight}
            order={order}
            color={color}
            isHover={isHover}
        >
            {ORDER_TEXT[order]}
        </OrderTextStyled>
    )
}

export default PostOrderText
