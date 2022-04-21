import styled, { css } from "styled-components"
import animation from "@/styles/utils/animation"
import media from "@/styles/utils/media"
import { IsLight } from "@/types/theme"

import { useThemeIsLight } from "@/hooks"

const SHADOW_STYLE = {
    mediumScreen: {
        x: "10px",
        y: "8px",
    },
    widePhone: {
        x: "5px",
        y: "5px",
    },

    blur: "0px",
}

const MEDIUM_TEXT_SHADOW = `${SHADOW_STYLE.mediumScreen.x} ${SHADOW_STYLE.mediumScreen.y} ${SHADOW_STYLE.blur}`
const SMALL_TEXT_SHADOW = `${SHADOW_STYLE.widePhone.x} ${SHADOW_STYLE.widePhone.y} ${SHADOW_STYLE.blur}`

interface OrderTextStyle extends OrderTextProp, IsLight {}
const OrderTextStyled = styled.p<OrderTextStyle>`
    transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;

    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: 800;
    font-size: 120px;
    ${({ isLight, theme, isHover, color }) =>
        isLight &&
        css`
            color: ${isHover ? color : theme.trueDeepDark};
            text-shadow: ${MEDIUM_TEXT_SHADOW} ${color}${isHover ? theme.opacity20 : theme.opacity70};
        `}

    ${({ isLight, theme, isHover, color }) =>
        !isLight &&
        css`
            color: ${isHover ? theme.white : theme.gray2};
            text-shadow: ${MEDIUM_TEXT_SHADOW}
                ${isHover ? color : `${color}${theme.opacity50}`};
        `}

    animation: ${animation.fadeIn} 0.5s ease-in;

    ${media.mediumTablet} {
        font-size: 100px;
    }

    ${media.widePhone} {
        font-size: 75px;
        text-shadow: none;
        font-weight: 900;
    }
`

interface OrderTextProp {
    order: number
    color: string
    isHover: boolean
}

const ORDER_TEXT = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
function PostOrderText({ order, color, isHover }: OrderTextProp) {
    return (
        <OrderTextStyled
            isLight={useThemeIsLight()}
            order={order}
            color={color}
            isHover={isHover}
        >
            {ORDER_TEXT[order]}
        </OrderTextStyled>
    )
}

export default PostOrderText
