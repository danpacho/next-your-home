import media from "@styles/utils/media"
import styled from "styled-components"

const PStyled = styled.p`
    color: ${(p) => p.theme.fontColor};
    font-size: ${(props) => props.theme.md};

    line-height: 2rem;

    ${media.widePhone} {
        line-height: 1.75rem;
    }
`

function P(props: any) {
    return <PStyled {...props} />
}

export default P
