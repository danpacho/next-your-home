import styled from "styled-components"
import media from "@styles/utils/media"

const UlStyled = styled.ul`
    width: 90%;

    margin-top: 0.2rem;
    margin-bottom: 0.65rem;
    margin-left: 1.35rem;

    line-height: 1.75rem;
    list-style-type: disc;

    ${media.widePhone} {
        margin-left: 1.2rem;
        line-height: 1.55rem;
    }
`

function UL(props: any) {
    return <UlStyled {...props} />
}

export default UL
