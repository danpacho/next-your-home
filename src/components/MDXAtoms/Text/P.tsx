import media from "@styles/utils/media"
import styled from "styled-components"

const PStyled = styled.p`
    color: ${(p) => p.theme.fontColor};
    font-size: ${(props) => props.theme.md};

    line-height: 1.8rem;
    margin-bottom: 1.5rem;
    margin: 0.85rem 0;

    ${media.widePhone} {
        line-height: 1.65rem;
    }
`

function P(props: any) {
    return <PStyled {...props} />
}

export default P
