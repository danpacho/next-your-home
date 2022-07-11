import styled from "styled-components"
import media from "@styles/utils/media"

const OlStyled = styled.ol`
    max-width: 100%;

    margin-top: 0.2rem;
    margin-bottom: 0.5rem;
    margin-left: 1.5rem;

    line-height: 1.75rem;
    list-style-type: decimal;

    ${media.widePhone} {
        margin-left: 1rem;
        line-height: 1.55rem;
    }
`
function OL(props: any) {
    return <OlStyled {...props} />
}

export default OL
