import styled from "styled-components"

import { IsLight } from "@/types/theme"
import { useThemeIsLight } from "@/hooks"

const TrStyled = styled.tr<IsLight>`
    border-bottom: 1.5px solid
        ${({ isLight, theme }) => (isLight ? theme.gray2 : theme.gray6)};
`
const TR = (props: any) => <TrStyled {...props} isLight={useThemeIsLight()} />

export default TR
