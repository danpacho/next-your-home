import media from "@styles/utils/media"
import styled from "styled-components"

const TdStyled = styled.td`
    font-size: ${(p) => p.theme.sm};
    font-weight: 500;
    color: ${(p) => p.theme.fontColor};
    padding: 0.75rem 1.25rem;

    text-align: center;

    ${media.widePhone} {
        padding: 1rem 0.25rem;
    }
`
const TD = (props: any) => <TdStyled {...props} />

export default TD
