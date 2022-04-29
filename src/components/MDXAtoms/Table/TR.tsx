import styled from "styled-components"

import { IsLight } from "@typing/theme"
import { useThemeIsLight } from "@lib/atoms/theme/theme.state"

const TrStyled = styled.tr<IsLight>`
    border-bottom: 1.5px solid
        ${({ isLight, theme }) => (isLight ? theme.gray2 : theme.gray6)};
`
const TR = (props: any) => {
    const isLight = useThemeIsLight()
    return <TrStyled {...props} isLight={isLight} />
}

export default TR
