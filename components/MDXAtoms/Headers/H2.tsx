import media from "@/styles/utils/media"
import styled from "styled-components"

const H2Styled = styled.h2`
    font-size: ${(props) => props.theme.xlg};
    font-weight: 600;
    color: ${(p) => p.theme.fontColor};

    padding: 0.35rem 0;

    ${media.widePhone} {
        font-size: ${(p) => p.theme.md};
    }
`
const H2 = (props: any) => {
    return <H2Styled {...props} />
}
export default H2
