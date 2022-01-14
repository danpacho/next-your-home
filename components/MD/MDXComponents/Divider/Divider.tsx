import styled from "styled-components"

const DividerStyled = styled.hr`
    width: 100%;
    height: 1.75px;
    background-color: ${(props) => props.theme.gray3};

    border: none;

    margin: 1.25rem 0;

    /* box-shadow: 0px 1.1px 2.5px ${(props) => props.theme.gray2}; */
`

function Divider() {
    return <DividerStyled />
}

export default Divider
