import animation from "@/styles/utils/animation"
import media from "@/styles/utils/media"
import React from "react"
import styled, { css } from "styled-components"

const SHADOW_STYLE = {
    mediumScreen: {
        x: "15px",
        y: "10px",
    },
    widePhone: {
        x: "5px",
        y: "5px",
    },

    blur: "0px",
}

const MEDIUM_TEXT_SHADOW = `${SHADOW_STYLE.mediumScreen.x} ${SHADOW_STYLE.mediumScreen.y} ${SHADOW_STYLE.blur}`
const SMALL_TEXT_SHADOW = `${SHADOW_STYLE.widePhone.x} ${SHADOW_STYLE.widePhone.y} ${SHADOW_STYLE.blur}`

const OrderTextStyled = styled.p<OrderTextProp>`
    transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;

    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: 800;
    font-size: 120px;
    color: ${({ theme, isHover, color }) =>
        isHover ? color : theme.trueDeepDark};

    text-shadow: ${({ color: shadowColor, theme, isHover }) =>
        `${MEDIUM_TEXT_SHADOW} ${shadowColor}${
            isHover ? theme.opacity20 : theme.opacity70
        }`};
    animation: ${animation.fadeIn} 0.5s ease-in;

    ${media.mediumTablet} {
        font-size: 100px;
        text-shadow: ${({ color: shadowColor, theme, isHover }) =>
            `${SMALL_TEXT_SHADOW} ${shadowColor}${
                isHover ? theme.opacity20 : theme.opacity70
            }`};
    }

    ${media.widePhone} {
        font-size: 75px;
        text-shadow: ${({ color: shadowColor, theme, isHover }) =>
            isHover
                ? "none"
                : `${SMALL_TEXT_SHADOW} ${shadowColor}${theme.opacity70}`};
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
        <OrderTextStyled order={order} color={color} isHover={isHover}>
            {ORDER_TEXT[order]}
        </OrderTextStyled>
    )
}

export default PostOrderText
