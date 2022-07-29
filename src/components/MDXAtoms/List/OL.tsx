import styled from "styled-components"
import media from "@styles/utils/media"

const OlStyled = styled.ol`
    width: 90%;

    margin-top: 0.2rem;
    margin-bottom: 0.65rem;
    margin-left: 1.35rem;

    line-height: 1.75rem;
    list-style-type: decimal;

    ${media.widePhone} {
        margin-left: 1.2rem;
        line-height: 1.55rem;
    }
`
function OL(props: any) {
    return <OlStyled {...props} />
}

export default OL
