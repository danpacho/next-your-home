import { useTheme } from "@/lib/atoms/theme/theme.state"
import { IsLight } from "@/types/theme"
import styled from "styled-components"

const TrStyled = styled.tr<IsLight>`
    border-bottom: 1.5px solid
        ${({ isLight, theme }) => (isLight ? theme.gray2 : theme.gray6)};
`
const TR = (props: any) => (
    <TrStyled {...props} isLight={useTheme() === "light"} />
)

export default TR
