import { useAtoms, _slector } from "@lib/jotai"
import { IsLight } from "@typing/theme"
import styled from "styled-components"

const DividerStyled = styled.hr<IsLight>`
    width: 100%;
    height: 0.05rem;
    background-color: ${({ theme, isLight }) =>
        isLight ? theme.gray3 : theme.gray7};

    border: none;

    margin: 1.25rem 0;
`

function Divider() {
    const { isLightState: isLight } = useAtoms(_slector("isLight"))

    return <DividerStyled isLight={isLight} />
}

export default Divider
