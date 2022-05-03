import styled from "styled-components"
import media from "@styles/utils/media"

import { IsLight } from "@typing/theme"
import { useThemeIsLight } from "@lib/atoms/theme/theme.state"

const InlineCode = styled.code<IsLight>`
    padding: 0.1rem 0.15rem;
    margin: 0 0.25rem;

    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    font-weight: 600;
    font-size: ${(p) => p.theme.sm};
    color: ${({ theme, isLight }) => (isLight ? theme.red5 : theme.gray2)};

    border-radius: ${(props) => props.theme.bxsm};

    border: 1.25px solid
        ${({ theme, isLight }) => (isLight ? theme.gray3 : theme.blue6)};

    background-color: ${({ theme, isLight }) =>
        isLight ? theme.gray1 : theme.blue9};
`

const CodeChildContainer = styled.code`
    padding: 2rem 1rem 1rem 1rem;

    font-size: 0.9rem;

    ${media.mediumTablet} {
        font-size: ${(p) => p.theme.sm};

        padding: 2rem 0.5rem 1rem 0.5rem;
    }

    ${media.widePhone} {
        font-size: ${(p) => p.theme.xsm};
    }
`
interface CodeProps {
    children: string
    className?: string
}
function Code(props: CodeProps) {
    const isLight = useThemeIsLight()
    if (!props.className)
        return <InlineCode isLight={isLight}>{props.children}</InlineCode>

    return <CodeChildContainer {...props} />
}

export default Code
