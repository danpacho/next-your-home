import styled from "styled-components"

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx"
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript"
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript"
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python"
import c from "react-syntax-highlighter/dist/cjs/languages/prism/c"
import matlab from "react-syntax-highlighter/dist/cjs/languages/prism/matlab"

import { atomDark, nord } from "react-syntax-highlighter/dist/cjs/styles/prism"

SyntaxHighlighter.registerLanguage("tsx", tsx)
SyntaxHighlighter.registerLanguage("javascript", javascript)
SyntaxHighlighter.registerLanguage("typescript", typescript)
SyntaxHighlighter.registerLanguage("python", python)
SyntaxHighlighter.registerLanguage("c", c)
SyntaxHighlighter.registerLanguage("matlab", matlab)

interface CodeProps {
    children: string
    className: string
}

const CodeCopyButton = styled.button`
    position: absolute;
    bottom: 1rem;
    right: 1rem;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 2rem;
    height: 2rem;

    padding: 0.25rem;

    font-size: ${(props) => props.theme.md};
    font-weight: 700;
    color: ${(props) => props.theme.teal6};

    border-radius: ${(props) => props.theme.bsm};
    border: 0.15rem solid ${(props) => props.theme.blue7};

    transition: all 0.075s ease-in;
    font-style: italic;
    &:hover {
        border-color: ${(props) => props.theme.blue5};
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.9);
    }
`

const CodeLanguageBox = styled.div`
    position: absolute;

    top: 1rem;
    right: 1rem;

    display: flex;
    align-items: center;
    justify-content: center;

    width: fit-content;
    height: fit-content;
    padding: 0.25rem 0.5rem;

    background-color: ${(props) => props.theme.blue7};

    border-radius: ${(props) => props.theme.bsm};
    /* border: 0.15rem solid ${(props) => props.theme.blue2}; */

    color: ${(props) => props.theme.blue3};
    font-weight: 700;
    font-size: ${(props) => props.theme.md};
    user-select: none;

    color: ${(props) => props.theme.white};
    &:hover {
    }
`

const CodeBox = styled(SyntaxHighlighter)`
    margin: 2rem 0;

    font-weight: 700;
    font-size: ${(props) => props.theme.md};

    line-height: 25px;
    word-spacing: 0.5px;

    border-radius: ${(props) => props.theme.blg};
    background-color: ${(props) => props.theme.gray8};

    border: 0.2rem solid ${(props) => props.theme.gray7};

    box-shadow: 0 10px 15px ${(props) => props.theme.gray4};

    user-select: text;
`

const CodeContainer = styled.div`
    position: relative;
`

function Code({ children: code, className: language }: CodeProps) {
    const fixedLanguage = language.replace("language-", "").toLowerCase()
    return (
        <CodeContainer>
            <CodeBox
                language={fixedLanguage}
                style={nord}
                customStyle={{
                    fontWeight: 800,
                }}
            >
                {code}
            </CodeBox>
            {/* 📃📜📄📑 */}
            <CodeLanguageBox>{fixedLanguage}</CodeLanguageBox>
            <CodeCopyButton onClick={() => 1}>📝</CodeCopyButton>
        </CodeContainer>
    )
}

export default Code
