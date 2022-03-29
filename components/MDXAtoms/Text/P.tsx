import media from "@/styles/utils/media"
import styled from "styled-components"

const PStyled = styled.p`
    line-height: 1.75rem;
    font-size: ${(props) => props.theme.md};
    margin: 1.25rem 0;
    color: ${(p) => p.theme.gray8};

    ${media.widePhone} {
        margin: 1rem 0;
        color: ${(p) => p.theme.gray9};
    }
`

function P(props: any) {
    return <PStyled {...props} />
}

export default P
