import styled from "styled-components"

const InlineCodeStyled = styled.code`
    transition: border-color 0.15s ease-out;

    padding: 0.05rem 0.25rem;
    margin: 0.3rem 0.2rem;

    background-color: ${(props) => props.theme.white};

    color: ${(props) => props.theme.gray8};
    font-weight: 800;

    border: 0.15rem solid ${(props) => props.theme.gray3};
    border-radius: ${(props) => props.theme.bsm};

    ::selection {
        background-color: ${(props) => props.theme.dark};
        color: ${(props) => props.theme.gray2};
    }

    &:hover {
        border-color: ${(props) => props.theme.gray8};
    }

    cursor: pointer;
`

function InlineCode(props: any) {
    return <InlineCodeStyled {...props} />
}

export default InlineCode
