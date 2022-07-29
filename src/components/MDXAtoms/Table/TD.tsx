import media from "@styles/utils/media"
import styled from "styled-components"

const TdStyled = styled.td`
    font-size: ${(p) => p.theme.sm};
    color: ${(p) => p.theme.fontColor};
    text-align: center;

    padding: 0.65rem;

    ${media.widePhone} {
        padding: 0.5rem;
    }
`
const TD = (props: any) => <TdStyled {...props} />

export default TD
