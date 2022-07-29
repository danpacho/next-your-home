import styled from "styled-components"
import media from "@styles/utils/media"

import { IsLight } from "@typing/theme"

import { useThemeMode } from "@hooks/index"

import { CodeContentBox } from "./CodeUtil"

const InlineCode = styled.code<IsLight>`
    padding: 0 0.2rem;
    margin: 0 0.1rem;

    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    font-size: inherit;
    color: ${({ theme, isLight }) => (isLight ? theme.red6 : theme.teal5)};
    letter-spacing: 0;
    word-spacing: -2px;
    word-break: break-word;

    border-radius: ${(p) => p.theme.bxsm};

    border: 1px solid
        ${({ theme, isLight }) => (isLight ? theme.gray3 : theme.teal8)};

    background-color: ${({ theme, isLight }) =>
        isLight ? theme.gray1 : theme.trueDeepDark};

    ${media.widePhone} {
        padding: 0.1rem 0.2rem;
        font-size: ${(p) => p.theme.sm};
    }
`

const CodeFontSizeManager = styled.code`
    //! DON'T DELETE FOR CODE HIGHLIGHTING
    display: inline-block;

    text-size-adjust: none;
    -webkit-text-size-adjust: none;
    //! DON'T DELETE FOR CODE HIGHLIGHTING

    font-size: 0.9rem;

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
    const { isLight } = useThemeMode()
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
