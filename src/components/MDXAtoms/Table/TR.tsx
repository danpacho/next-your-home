import styled from "styled-components"

import { IsLight } from "@typing/theme"

import useThemeMode from "@hooks/useThemeMode"

const TrStyled = styled.tr<IsLight>`
    border-bottom: 1px solid ${({ theme }) => theme.containerBorderColor};
`
const TR = (props: any) => {
    const { isLight } = useThemeMode()
    return <TrStyled {...props} isLight={isLight} />
}

export default TR
