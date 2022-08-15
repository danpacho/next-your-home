import styled from "styled-components"

import { IsLight } from "@typing/theme"

import { $, useStore } from "@atom/index"

const DividerStyled = styled.hr<IsLight>`
    width: 100%;
    height: 0.05rem;
    background-color: ${({ theme, isLight }) =>
        isLight ? theme.gray3 : theme.gray7};

    border: none;

    margin: 1.25rem 0;
`

function Divider() {
    const { IsLight } = useStore($("isLight"))
    return <DividerStyled isLight={IsLight} />
}

export default Divider
