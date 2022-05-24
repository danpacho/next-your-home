import { useCallback, useRef, useState } from "react"

import styled from "styled-components"
import media from "@styles/utils/media"

import { useElementObserver, useScrollToElement } from "@hooks/index"

import LineScroll from "@components/UX/LineScroll/LineScroll"
import Tooltip from "@components/UX/Tooltip/Tooltip"

import { IsLight } from "@typing/theme"
import { useAtom, useSlector, _atom, _slector } from "@lib/recoil"

const H1Container = styled.div`
    margin: 2rem 0;
    cursor: pointer;
`

const H1Styled = styled.h1<IsLight>`
    font-size: ${(p) => p.theme.xxlg};
    font-weight: 800;
    color: ${(p) => p.theme.headerFontColor};

    padding: 0.25rem 0 0.35rem 0;

    width: fit-content;

    ${media.widePhone} {
        font-size: ${(p) => p.theme.lg};
        font-weight: 700;

        padding-left: 0.4rem;

        border-left: 0.2rem solid ${(props) => props.theme.gray4};
        border-radius: 1px;
    }
`

const HEADER_UPDATE_CONSTANTS = {
    top: 225,
    bottom: -225,
    rootMarginTop: "-35px",
    rootMarginBottom: "0px",
}
interface H1Props {
    children: string
}

const H1 = (props: H1Props) => {
    const { focusTitleSetState } = useAtom(_atom("focusTitle"))
    const [active, setActive] = useState(false)

    const ref = useRef<HTMLHeadingElement>(null)

    const updateFocusTitle: IntersectionObserverCallback = useCallback(
        (entries) => {
            entries.forEach((entry) => {
                const top = entry.boundingClientRect.top
                if (
                    top <= HEADER_UPDATE_CONSTANTS.top &&
                    top >= HEADER_UPDATE_CONSTANTS.bottom
                )
                    focusTitleSetState(props.children)
            })
        },
        [props.children, focusTitleSetState]
    )

    const {} = useElementObserver<HTMLHeadingElement>({
        ref,
        options: {
            root: null,
            rootMarginTop: HEADER_UPDATE_CONSTANTS.rootMarginTop,
            rootMarginBottom: HEADER_UPDATE_CONSTANTS.rootMarginBottom,
            rootMarginLeft: "0px",
            rootMarginRight: "0px",
            threshold: [0, 1],
        },
        customeCallback: updateFocusTitle,
    })

    const { isLightState } = useSlector(_slector("isLight"))
    const { scrollToElement } = useScrollToElement({
        scrollRef: ref,
    })
    return (
        <H1Container onClick={scrollToElement}>
            <Tooltip
                active={active}
                setActive={setActive}
                tooltipElement={
                    <LineScroll fontWeight={600} fontSize="xlg" scrollRef={ref}>
                        #
                    </LineScroll>
                }
                isUnvisibleElementClickAbled
                left={-30}
                bottom={1.5}
            >
                <H1Styled {...props} ref={ref} isLight={isLightState} />
            </Tooltip>
        </H1Container>
    )
}

export default H1
