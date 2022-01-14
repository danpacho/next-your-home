import styled from "styled-components"

const ItalicStyled = styled.em`
    font-style: italic;
`

function Italic(props: any) {
    return <ItalicStyled {...props} />
}

export default Italic
