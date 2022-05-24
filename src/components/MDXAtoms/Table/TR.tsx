import styled from "styled-components"

import { IsLight } from "@typing/theme"
import { useSlector, _slector } from "@lib/recoil"

const TrStyled = styled.tr<IsLight>`
    border-bottom: 1.5px solid
        ${({ isLight, theme }) => (isLight ? theme.gray2 : theme.gray6)};
`
const TR = (props: any) => {
    const { isLightState: isLight } = useSlector(_slector("isLight"))

    return <TrStyled {...props} isLight={isLight} />
}

export default TR
