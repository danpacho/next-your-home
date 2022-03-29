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
    transition: text-shadow, color cubic-bezier(0.19, 1, 0.22, 1) 0.5s;

    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: 700;
    font-size: 150px;
    color: ${(p) => p.theme.trueDeepDark};

    text-shadow: ${({ color: shadowColor }) =>
        `${MEDIUM_TEXT_SHADOW} ${shadowColor}`};

    ${({ isHover, color, theme }) =>
        isHover &&
        css`
            color: ${color};
            text-shadow: ${MEDIUM_TEXT_SHADOW} ${theme.trueDeepDark};
        `}

    ${media.mediumTablet} {
        font-size: 100px;

        text-shadow: ${({ color: shadowColor }) =>
            `${SMALL_TEXT_SHADOW} ${shadowColor}`};

        ${({ isHover, color, theme }) =>
            isHover &&
            css`
                color: ${color};
                text-shadow: ${SMALL_TEXT_SHADOW} ${theme.trueDeepDark};
            `}
    }

    ${media.widePhone} {
        font-size: 75px;

        text-shadow: ${({ color: shadowColor }) =>
            `${SMALL_TEXT_SHADOW} ${shadowColor}`};

        ${({ isHover, color, theme }) =>
            isHover &&
            css`
                color: ${color};
                text-shadow: ${SMALL_TEXT_SHADOW} ${theme.trueDeepDark};
            `}
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
