import styled from "styled-components"

import { IsLight } from "@typing/theme"
import { useAtoms, _slector } from "@lib/jotai"

const TrStyled = styled.tr<IsLight>`
    border-bottom: 1.5px solid
        ${({ isLight, theme }) => (isLight ? theme.gray2 : theme.gray6)};
`
const TR = (props: any) => {
    const { isLightState: isLight } = useAtoms(_slector("isLight"))

    return <TrStyled {...props} isLight={isLight} />
}

export default TR
