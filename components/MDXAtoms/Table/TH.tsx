import media from "@/styles/utils/media"
import styled from "styled-components"

const ThStyled = styled.th`
    padding: 0.75rem 1rem;
    border-bottom: 1.5px solid ${(p) => p.theme.gray3};
    background-color: ${(p) => p.theme.gray2};
    text-align: center;

    ${media.widePhone} {
        padding: 0.75rem 0.5rem;
        font-size: ${(p) => p.theme.sm};
    }
`
const TH = (props: any) => <ThStyled {...props} />

export default TH
