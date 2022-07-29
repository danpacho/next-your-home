import styled from "styled-components"

import media from "@styles/utils/media"

import { IsLight } from "@typing/theme"

import useThemeMode from "@hooks/useThemeMode"

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
    const { isLight } = useThemeMode()
    return <ThStyled {...props} isLight={isLight} />
}

export default TH
