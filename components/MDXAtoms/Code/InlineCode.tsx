import styled from "styled-components"

const InlineCodeStyled = styled.code`
    padding: 0.1rem 0.15rem;
    margin: 0 0.25rem;

    color: ${(p) => p.theme.red5};
    font-family: "Fira Code", Consolas, Monaco, "Andale Mono", "Ubuntu Mono",
        monospace;
    font-weight: 600;
    font-size: ${(p) => p.theme.sm};

    border-radius: ${(props) => props.theme.bxsm};
    border: 1.25px solid ${(p) => p.theme.gray3};

    background-color: ${(p) => p.theme.gray1};
`

function InlineCode(props: any) {
    return <InlineCodeStyled {...props} />
}

export default InlineCode
