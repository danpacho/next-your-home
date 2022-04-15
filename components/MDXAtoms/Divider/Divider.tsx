import { useTheme } from "@/lib/atoms/theme/theme.state"
import { IsLight } from "@/types/theme"
import styled from "styled-components"

const DividerStyled = styled.hr<IsLight>`
    width: 100%;
    height: 1.75px;
    background-color: ${({ theme, isLight }) =>
        isLight ? theme.gray3 : theme.gray7};

    border: none;

    margin: 1.25rem 0;
`

function Divider() {
    return <DividerStyled isLight={useTheme() === "light"} />
}

export default Divider
