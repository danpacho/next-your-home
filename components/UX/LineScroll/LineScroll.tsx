import { FontSizeType } from "@/styles/utils/font"
import React, { useRef } from "react"
import styled from "styled-components"

interface LineScrollBtnStyleProps {
    fontWeight: number
    fontSize: FontSizeType
}

const LineScrollBtn = styled.button<LineScrollBtnStyleProps>`
    font-size: ${({ fontSize, theme }) => theme[fontSize]};
    font-weight: ${({ fontWeight }) => fontWeight};
    background-color: transparent;
`
interface LineScrollProps extends LineScrollBtnStyleProps {}

function LineScroll({ fontSize, fontWeight }: LineScrollProps) {
    const ref = useRef<HTMLButtonElement>(null)
    const onClickMove = () =>
        ref.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "center",
        })

    return (
        <LineScrollBtn
            ref={ref}
            fontSize={fontSize}
            fontWeight={fontWeight}
            onClick={onClickMove}
        >
            🪝
        </LineScrollBtn>
    )
}

export default LineScroll
