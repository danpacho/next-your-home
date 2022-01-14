import styled from "styled-components"

const BoldStyled = styled.strong`
    font-weight: 800;
`

function Bold(props: any) {
    return <BoldStyled {...props} />
}

export default Bold
