import styled from "styled-components"

const INLINE_COLOR = "#ff4da0"

const InlineCodeStyled = styled.code`
    transition: all 0.15s ease-out;

    padding: 0rem 0.25rem;
    margin: 0.15rem 0.2rem;

    font-weight: 900;

    border: 0.2rem solid ${(props) => props.theme.red2};
    border-radius: ${(props) => props.theme.bmd};

    background-color: ${(p) => p.theme.white};
    color: ${INLINE_COLOR};

    cursor: pointer;
`

function InlineCode(props: any) {
    return <InlineCodeStyled {...props} />
}

export default InlineCode
