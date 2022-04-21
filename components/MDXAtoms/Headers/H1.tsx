import { useCallback, useRef, useState } from "react"

import styled from "styled-components"
import media from "@/styles/utils/media"

import { useFocusTitle } from "@/lib/atoms/tableOfContent/tableOfContent.state"

import useElementObserver from "@/hooks/useElementObserver"

import LineScroll from "@components/UX/LineScroll/LineScroll"
import Tooltip from "@components/UX/Tooltip/Tooltip"

import { IsLight } from "@/types/theme"
import { useThemeIsLight } from "@/hooks"

const H1Container = styled.div`
    margin: 0 0 2rem 0;
`

const H1Styled = styled.h1<IsLight>`
    font-size: ${(props) => props.theme.xxlg};
    font-weight: 800;
    color: ${(p) => p.theme.headerFontColor};

    padding: 0.25rem 0 0.35rem 0;

    border-bottom: 0.25rem solid
        ${({ theme, isLight }) => (isLight ? theme.gray3 : theme.gray7)};

    width: fit-content;

    ${media.widePhone} {
        font-size: ${(p) => p.theme.lg};
        font-weight: 700;
        border-bottom: none;
        padding-left: 0.5rem;
        border-left: 0.25rem solid ${(props) => props.theme.gray4};
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
    const [_, setFocustitle] = useFocusTitle()
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
                    setFocustitle(props.children)
            })
        },
        [props.children, setFocustitle]
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

    return (
        <H1Container>
            <Tooltip
                active={active}
                setActive={setActive}
                tooltipElement={
                    <LineScroll
                        fontWeight={900}
                        fontSize="title"
                        scrollRef={ref}
                    />
                }
                right={-50}
                bottom={2.5}
                isUnvisibleElementClickAbled={true}
            >
                <H1Styled {...props} ref={ref} isLight={useThemeIsLight()} />
            </Tooltip>
        </H1Container>
    )
}

export default H1
