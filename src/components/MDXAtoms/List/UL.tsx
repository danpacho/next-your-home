import styled from "styled-components"
import media from "@styles/utils/media"

const UlStyled = styled.ul`
    max-width: 100%;

    margin-top: 0.2rem;
    margin-bottom: 0.5rem;
    margin-left: 1.5rem;

    line-height: 1.75rem;
    list-style-type: disc;

    ${media.widePhone} {
        margin-left: 1rem;
        line-height: 1.55rem;
    }
`

function UL(props: any) {
    return <UlStyled {...props} />
}

export default UL
