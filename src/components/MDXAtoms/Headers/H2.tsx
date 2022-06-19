import styled from "styled-components"
import media from "@styles/utils/media"

import { useRef } from "react"

import { useScrollToElement } from "@hooks/index"

const H2Styled = styled.h2`
    font-size: ${(props) => props.theme.xlg};
    font-weight: 600;
    color: ${(p) => p.theme.fontColor};

    padding: 0.35rem 0;

    ${media.widePhone} {
        font-size: 1.125rem;
    }

    cursor: pointer;
`
const H2 = (props: any) => {
    const h2Ref = useRef<HTMLHeadingElement>(null)
    const { scrollToElement } = useScrollToElement({
        scrollRef: h2Ref,
    })
    return <H2Styled ref={h2Ref} onClick={scrollToElement} {...props} />
}
export default H2
