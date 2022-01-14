import styled from "styled-components"

const InlineCodeStyled = styled.code`
    padding: 0.15rem 0.25rem;
    margin: 0.15rem 0.25rem;

    background-color: ${(props) => props.theme.white};

    color: ${(props) => props.theme.dark};
    font-weight: 800;

    border: 2.5px solid ${(props) => props.theme.gray3};
    border-radius: ${(props) => props.theme.bsm};

    ::selection {
        background-color: ${(props) => props.theme.dark};
        color: ${(props) => props.theme.gray2};
    }
`

function InlineCode(props: any) {
    return <InlineCodeStyled {...props} />
}

export default InlineCode
