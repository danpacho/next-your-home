import LineScroll from "@/components/UX/LineScroll/LineScroll"
import Tooltip from "@components/UX/Tooltip/Tooltip"

import { useRef, useState } from "react"
import styled from "styled-components"

const H1Styled = styled.h1`
    font-size: ${(props) => props.theme.title};
    font-weight: 900;

    padding-bottom: 3.5px;

    border-bottom: 4px solid ${(props) => props.theme.teal5};

    width: max-content;
    margin-bottom: 1rem;
`
const H2Styled = styled.h2`
    font-size: ${(props) => props.theme.xlg};
    font-weight: 700;
    margin-bottom: 1rem;
`

const H3Styled = styled.h3`
    font-size: ${(props) => props.theme.lg};
    font-weight: 700;
    margin-bottom: 1rem;
`

function H1(props: any) {
    const headerRef = useRef<HTMLHeadingElement>(null)
    // console.log(headerRef.current)
    const [active, setActive] = useState(false)

    return (
        <Tooltip
            active={active}
            setActive={setActive}
            tooltipElement={<LineScroll fontWeight={900} fontSize="title" />}
        >
            <H1Styled
                ref={(ref) => {
                    ref
                }}
                {...props}
                id={95634826}
            />
        </Tooltip>
    )
}

function H2(props: any) {
    return <H2Styled {...props} />
}

function H3(props: any) {
    const ref = useRef<any>(null)
    return (
        <H3Styled
            {...props}
            ref={ref}
            // onMouseMove={() => {
            //     const { offsetTop } = ref.current
            //     console.log(offsetTop)
            // }}
        />
    )
}

export { H1, H2, H3 }
