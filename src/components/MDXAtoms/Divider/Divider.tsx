import styled from "styled-components"

const DividerStyled = styled.hr`
    width: 100%;
    height: 1.75px;
    background-color: ${({ theme }) => theme.descriptionFontColor};

    border: none;

    margin: 1.25rem 0;
`

function Divider() {
    return <DividerStyled />
}

export default Divider
