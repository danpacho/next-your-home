import styled from "styled-components"

import media from "@styles/utils/media"

import { IsLight } from "@typing/theme"

import { useStore, $ } from "@atom/index"

const ThStyled = styled.th<IsLight>`
    padding: 0.65rem;

    border-bottom: 1px solid ${({ theme }) => theme.containerBorderColor};

    background-color: ${({ theme, isLight }) =>
        isLight ? theme.gray2 : theme.trueDeepDark};

    color: ${(p) => p.theme.headerFontColor};
    font-size: ${(p) => p.theme.md};
    text-align: center;
    text-transform: capitalize;

    ${media.widePhone} {
        font-size: ${(p) => p.theme.sm};

        padding: 0.5rem;
    }
`
const TH = (props: any) => {
    const { IsLight } = useStore($("isLight"))
    return <ThStyled {...props} isLight={IsLight} />
}

export default TH
