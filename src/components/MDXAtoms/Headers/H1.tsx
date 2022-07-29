import styled from "styled-components"
import media from "@styles/utils/media"

import { useCallback, useRef, useState } from "react"

import { IsLight } from "@typing/theme"

import { useElementObserver, useScrollToElement } from "@hooks/index"

import { LineScroll } from "@components/UX/LineScroll"
import { Tooltip } from "@components/UX/Tooltip"

import { useAtoms, _atom, _slector } from "@lib/jotai"

const H1Styled = styled.h1<IsLight>`
    font-size: ${(p) => p.theme.title};
    font-weight: 800;
    color: ${(p) => p.theme.headerFontColor};

    width: fit-content;

    padding: 2rem 0;

    cursor: pointer;

    ${media.widePhone} {
        font-size: ${(p) => p.theme.xxlg};
        font-weight: 700;

        ::before {
            content: "#";
            margin-right: 0.25rem;
        }
    }
`

const HEADER_UPDATE_CONSTANTS = {
    top: 120,
    bottom: -120,
    rootMarginTop: "-20px",
    rootMarginBottom: "0px",
}
interface H1Props {
    children: string
}

const H1 = (props: H1Props) => {
    const { isLightState } = useAtoms(_slector("isLight"))
    const { focusTitleSetState } = useAtoms(_atom("focusTitle"))
    const [active, setActive] = useState(false)

    const headerRef = useRef<HTMLHeadingElement>(null)

    const updateFocusTitle: IntersectionObserverCallback = useCallback(
        (entries) => {
            entries.forEach((entry) => {
                const top = entry.boundingClientRect.top
                if (
                    top <= HEADER_UPDATE_CONSTANTS.top &&
                    top >= HEADER_UPDATE_CONSTANTS.bottom
                ) {
                    focusTitleSetState(headerRef.current?.textContent!)
                }
            })
        },
        [focusTitleSetState]
    )

    useElementObserver<HTMLHeadingElement>({
        ref: headerRef,
        customeCallback: updateFocusTitle,
        options: {
            root: null,
            rootMarginTop: HEADER_UPDATE_CONSTANTS.rootMarginTop,
            rootMarginBottom: HEADER_UPDATE_CONSTANTS.rootMarginBottom,
            rootMarginLeft: "0px",
            rootMarginRight: "0px",
            threshold: [0, 1],
        },
    })

    const { scrollToElement } = useScrollToElement({
        scrollRef: headerRef,
    })

    return (
        <Tooltip
            active={active}
            setActive={setActive}
            tooltipElement={
                <LineScroll
                    fontWeight={600}
                    fontSize="xxlg"
                    scrollRef={headerRef}
                >
                    #
                </LineScroll>
            }
            isUnvisibleElementClickAbled
            left={-28}
            bottom={30}
        >
            <H1Styled
                {...props}
                ref={headerRef}
                isLight={isLightState}
                onClick={scrollToElement}
            />
        </Tooltip>
    )
}

export default H1
