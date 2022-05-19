import styled from "styled-components"
import media from "@styles/utils/media"
import { FontSizeType } from "@styles/utils/font"

import useScrollToElement from "@hooks/useScrollToElement"

interface LineScrollBtnStyleProps {
    fontWeight: number
    fontSize: FontSizeType
}

const LineScrollBtn = styled.button<LineScrollBtnStyleProps>`
    font-size: ${({ fontSize, theme }) => theme[fontSize]};
    font-weight: ${({ fontWeight }) => fontWeight};
    background-color: transparent;
    color: ${(p) => p.theme.fontColor};

    ${media.widePhone} {
        display: none;
    }
`
interface LineScrollProps extends LineScrollBtnStyleProps {
    scrollRef: React.RefObject<HTMLElement>
    children: React.ReactNode
}

function LineScroll({
    fontSize,
    fontWeight,
    scrollRef,
    children: buttonText,
}: LineScrollProps) {
    const { scrollToElement } = useScrollToElement({
        scrollRef,
    })

    return (
        <LineScrollBtn
            fontSize={fontSize}
            fontWeight={fontWeight}
            onClick={scrollToElement}
        >
            {buttonText}
        </LineScrollBtn>
    )
}

export default LineScroll
