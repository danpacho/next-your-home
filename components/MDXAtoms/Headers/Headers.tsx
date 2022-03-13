import { useFocusTitle } from "@/atoms/atoms"
import useElementObserver from "@/hooks/useElementObserver"
import media from "@/styles/utils/media"
import LineScroll from "@components/UX/LineScroll/LineScroll"
import Tooltip from "@components/UX/Tooltip/Tooltip"

import { useCallback, useRef, useState } from "react"
import styled from "styled-components"

const H1Container = styled.div`
    margin: 0 0 2rem 0;
`

const H1Styled = styled.h1`
    font-size: ${(props) => props.theme.xxlg};
    font-weight: 800;

    padding: 0.25rem 0 0.35rem 0;

    border-bottom: 0.25rem solid ${(props) => props.theme.teal4};

    width: fit-content;

    ${media.widePhone} {
        font-size: ${(p) => p.theme.lg};
        font-weight: 700;
        border-bottom: none;
        padding-left: 0.5rem;
        border-left: 0.25rem solid ${(props) => props.theme.teal5};
    }
`

const H2Styled = styled.h2`
    font-size: ${(props) => props.theme.xlg};
    font-weight: 600;
    padding: 0.35rem 0;

    ${media.widePhone} {
        font-size: ${(p) => p.theme.md};
    }
`

const H3Styled = styled.h3`
    font-size: ${(props) => props.theme.lg};
    font-weight: 600;
    margin-bottom: 1rem;

    ${media.widePhone} {
        font-size: ${(p) => p.theme.md};
    }
`

const HEADER_UPDATE_CONSTANTS = {
    top: 225,
    bottom: -225,
    rootMarginTop: "-42.5px",
    rootMarginBottom: "0px",
}
interface H1Props {
    children: string
}
function H1(props: H1Props) {
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
                <H1Styled {...props} ref={ref} />
            </Tooltip>
        </H1Container>
    )
}

function H2(props: any) {
    return <H2Styled {...props} />
}

function H3(props: any) {
    return <H3Styled {...props} />
}

export { H1, H2, H3 }
