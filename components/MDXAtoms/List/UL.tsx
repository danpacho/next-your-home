import styled from "styled-components"

const UlStyled = styled.ul`
    list-style: circle;
    margin-left: 1rem;
`

function UL(props: any) {
    return <UlStyled {...props} />
}

export default UL
