import styled from "styled-components"

const TrStyled = styled.tr`
    border-bottom: 1.5px solid ${(p) => p.theme.gray2};
`
const TR = (props: any) => <TrStyled {...props}></TrStyled>

export default TR
