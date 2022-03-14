import { FontSizeType } from "@/styles/utils/font"
import media from "@/styles/utils/media"
import React, { RefObject, useRef } from "react"
import styled from "styled-components"

interface LineScrollBtnStyleProps {
    fontWeight: number
    fontSize: FontSizeType
}

const LineScrollBtn = styled.button<LineScrollBtnStyleProps>`
    font-size: ${({ fontSize, theme }) => theme[fontSize]};
    font-weight: ${({ fontWeight }) => fontWeight};
    background-color: transparent;

    ${media.widePhone} {
        display: none;
    }
`
interface LineScrollProps extends LineScrollBtnStyleProps {
    scrollRef: RefObject<HTMLElement>
}

function LineScroll({ fontSize, fontWeight, scrollRef }: LineScrollProps) {
    const onClickMove = () =>
        scrollRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "center",
        })

    return (
        <LineScrollBtn
            fontSize={fontSize}
            fontWeight={fontWeight}
            onClick={onClickMove}
        >
            🪝
        </LineScrollBtn>
    )
}

export default LineScroll
