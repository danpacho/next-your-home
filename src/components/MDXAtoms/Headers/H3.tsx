import media from "@styles/utils/media"
import styled from "styled-components"

const H3Styled = styled.h3`
    font-size: ${(p) => p.theme.lg};
    font-weight: 600;
    color: ${(p) => p.theme.fontColor};

    margin-bottom: 1rem;

    ${media.widePhone} {
        font-size: ${(p) => p.theme.md};
    }
`

const H3 = (props: any) => {
    return <H3Styled {...props} />
}

export default H3
