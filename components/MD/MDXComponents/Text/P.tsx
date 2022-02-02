import styled from "styled-components"

const PStyled = styled.p`
    margin: 1.5rem 0;
    line-height: 1.9rem;
    font-size: ${(props) => props.theme.md};
    font-weight: 500;

    ::selection {
        background-color: ${(props) => props.theme.trueDeepDark};
        color: ${(props) => props.theme.gray2};
    }
`

function P(props: any) {
    return <PStyled {...props} id="mdx-p" />
}

export default P
