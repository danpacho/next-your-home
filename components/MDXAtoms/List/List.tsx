import animation from "@/styles/utils/animation"
import { RefObject, useRef } from "react"
import styled, { css } from "styled-components"

const OlStyled = styled.ol`
    list-style: li;
    margin-left: 1.1rem;
`

const UlStyled = styled.ul`
    list-style: circle;
    margin-left: 1rem;
`

function OL(props: any) {
    return <OlStyled {...props} />
}

function UL(props: any) {
    const ulRef = useRef<RefObject<HTMLUListElement>>(null)

    return <UlStyled {...props} ref={ulRef} />
}

const LIStyle = {
    UL: [() => css``, () => css``, () => css``],
    OL: () => css`
        list-style: li;
    `,
}

interface LIStyleType {
    parentType: "UL" | "OL"
}

const LIStyled = styled.li`
    margin: 0.5rem 0;
    font-size: ${(props) => props.theme.md};
    font-weight: 500;

    li:before {
        content: "🍞";
        display: inline-block;
        vertical-align: middle;
        margin-right: 0.25rem;
    }
`

function LI(props: any) {
    // const liRef = useRef<HTMLLIElement>(null)
    // const isAlone = liRef.current?.parentNode?.childNodes
    // const listChildNumber = liRef.current?.getElementsByTagName("li").length
    // const parentType =
    //     liRef.current?.parentNode?.nodeName === "UL" ? "UL" : "OL"

    return <LIStyled {...props} />
}

export { OL, UL, LI }
