import styled from "styled-components"
import media from "@styles/utils/media"

import { IsLight } from "@typing/theme"

import { CodeContentBox } from "./CodeCopyButton"
import { useSlector, _slector } from "@lib/recoil"

const InlineCode = styled.code<IsLight>`
    padding: 0.1rem 0.15rem;
    margin: 0 0.25rem;

    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    font-weight: 600;
    color: ${({ theme, isLight }) => (isLight ? theme.red5 : theme.gray2)};

    border-radius: ${(props) => props.theme.bxsm};

    border: 1.25px solid
        ${({ theme, isLight }) => (isLight ? theme.gray3 : theme.blue6)};

    background-color: ${({ theme, isLight }) =>
        isLight ? theme.gray1 : theme.blue9};
`

const CodeFontSizeManager = styled.code`
    display: inline-block;

    font-size: 0.9rem;
    text-size-adjust: none;
    -webkit-text-size-adjust: none;

    ${media.mediumTablet} {
        font-size: ${(p) => p.theme.sm};
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
    const { isLightState: isLight } = useSlector(_slector("isLight"))

    if (!props.className) return <InlineCode isLight={isLight} {...props} />

    const language = props.className.split(" ")[0].replace("language-", "")

    return (
        <>
            <CodeFontSizeManager {...props} />
            <CodeContentBox>{language}</CodeContentBox>
        </>
    )
}

export default Code
