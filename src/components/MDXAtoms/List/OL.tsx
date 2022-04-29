import styled from "styled-components"

const OlStyled = styled.ol`
    list-style: li;
    margin-left: 1.1rem;
`
function OL(props: any) {
    return <OlStyled {...props} />
}

export default OL
