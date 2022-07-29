import styled from "styled-components"
import media from "@styles/utils/media"

import { useRef } from "react"

import { useScrollToElement } from "@hooks/index"

const H2Styled = styled.h2`
    font-size: ${(props) => props.theme.xxlg};
    font-weight: 700;
    color: ${(p) => p.theme.fontColor};

    padding: 0.35rem 0;
    margin: 1.25rem 0;

    ${media.widePhone} {
        font-size: ${(props) => props.theme.xlg};
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
