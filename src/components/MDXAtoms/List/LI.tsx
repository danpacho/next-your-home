import styled from "styled-components"

const LIStyled = styled.li`
    margin: 0.5rem 0;
    font-size: ${(p) => p.theme.md};
    font-weight: 500;
    color: ${(p) => p.theme.fontColor};

    li:before {
        content: "🍞";
        display: inline-block;
        vertical-align: middle;
        margin-right: 0.25rem;
    }
`

function LI(props: any) {
    return <LIStyled {...props} />
}

export default LI
