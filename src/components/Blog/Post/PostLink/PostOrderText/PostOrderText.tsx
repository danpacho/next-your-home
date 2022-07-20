import styled, { css } from "styled-components"
import media from "@styles/utils/media"

import { IsLight } from "@typing/theme"

import { useThemeMode } from "@hooks/index"

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
                : `${DEFAULT_SHADOW} ${color}${theme.opacity40}`};
        `}

    ${({ isLight, theme, isHover, color }) =>
        !isLight &&
        css`
            color: ${isHover ? theme.white : theme.gray2};
            text-shadow: ${isHover
                ? `${HOVER_SHADOW} ${color}${theme.opacity40}`
                : `${DEFAULT_SHADOW} ${color}`};
        `}


    ${media.mediumTablet} {
        font-size: 90px;
    }

    ${media.widePhone} {
        font-size: 75px;
        margin-right: 0.5rem;
        text-shadow: ${({ theme, color, isLight }) =>
            isLight
                ? `${HOVER_SHADOW} ${color}${theme.opacity40}`
                : `${HOVER_SHADOW} ${color}`};
    }

    ${media.custom(500)} {
        display: none;
    }
`

interface OrderTextProp {
    order: number
    color: string
    isHover: boolean
}

const ORDER_TEXT = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
function PostOrderText({ order, color, isHover }: OrderTextProp) {
    const { isLight } = useThemeMode()
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
