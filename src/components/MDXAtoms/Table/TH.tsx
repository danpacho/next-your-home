import styled from "styled-components"

import media from "@styles/utils/media"

import { IsLight } from "@typing/theme"

import useThemeMode from "@hooks/useThemeMode"

const ThStyled = styled.th<IsLight>`
    padding: 0.75rem 1rem;
    color: ${(p) => p.theme.headerFontColor};
    border-bottom: 1.5px solid
        ${({ theme, isLight }) => (isLight ? theme.gray3 : theme.gray6)};
    background-color: ${({ theme, isLight }) =>
        isLight ? theme.gray2 : theme.gray8};
    text-align: center;

    ${media.widePhone} {
        padding: 0.75rem 0.5rem;
        font-size: ${(p) => p.theme.sm};
    }
`
const TH = (props: any) => {
    const { isLight } = useThemeMode()
    return <ThStyled {...props} isLight={isLight} />
}

export default TH
