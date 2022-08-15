import styled from "styled-components"

import { IsLight } from "@typing/theme"

import { useStore, $ } from "@atom/index"

const TrStyled = styled.tr<IsLight>`
    border-bottom: 1px solid ${({ theme }) => theme.containerBorderColor};
`
const TR = (props: any) => {
    const { IsLight } = useStore($("isLight"))
    return <TrStyled {...props} isLight={IsLight} />
}

export default TR
