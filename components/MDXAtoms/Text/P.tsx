import media from "@/styles/utils/media"
import styled from "styled-components"

const PStyled = styled.p`
    margin: 1.25rem 0;

    font-size: ${(props) => props.theme.md};
    line-height: 2rem;
    color: ${(p) => p.theme.fontColor};

    ${media.widePhone} {
        margin: 1rem 0;
    }
`

function P(props: any) {
    return <PStyled {...props} />
}

export default P
