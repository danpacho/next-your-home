import { RefObject, useEffect, useRef } from "react"
import styled from "styled-components"

const LIStyled = styled.li`
    margin: 0.5rem 0;
    font-size: ${(props) => props.theme.md};
    font-weight: 500;
`

const OlStyled = styled.ol`
    list-style: li;
    margin-left: 1.1rem;
`

const UlStyled = styled.ul`
    list-style: disc;
    margin-left: 1rem;
`

function LI(props: any) {
    return <LIStyled {...props} />
}

function OL(props: any) {
    return <OlStyled {...props} />
}

function UL(props: any) {
    const ulRef = useRef<RefObject<HTMLUListElement>>(null)

    return <UlStyled {...props} ref={ulRef} />
}

export { LI, OL, UL }
