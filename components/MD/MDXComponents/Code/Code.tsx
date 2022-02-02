import styled from "styled-components"

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"

import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx"
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript"
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript"
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python"
import c from "react-syntax-highlighter/dist/cjs/languages/prism/c"
import matlab from "react-syntax-highlighter/dist/cjs/languages/prism/matlab"

import { nord } from "react-syntax-highlighter/dist/cjs/styles/prism"

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

    font-size: ${(props) => props.theme.sm};
    font-weight: 700;
    color: ${(props) => props.theme.teal6};

    border-radius: ${(props) => props.theme.bsm};
    border: 0.15rem solid ${(props) => props.theme.blue8};

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
    transition: all 0.15s ease-in;

    position: absolute;

    top: 1rem;
    right: 1rem;

    display: flex;
    align-items: center;
    justify-content: center;

    width: fit-content;
    height: fit-content;
    padding: 0.25rem 0.5rem;

    background-color: transparent;
    border: 0.15rem solid ${(props) => props.theme.blue8};

    border-radius: ${(props) => props.theme.bsm};

    color: ${(props) => props.theme.blue3};
    font-weight: 800;
    letter-spacing: 0.05rem;
    font-size: ${(props) => props.theme.sm};
    user-select: none;

    color: ${(props) => props.theme.white};

    &:hover {
        border-color: ${(props) => props.theme.blue5};
    }
`

const CodeBox = styled(SyntaxHighlighter)`
    border-radius: ${(props) => props.theme.blg};

    border: 0.1rem solid ${(props) => props.theme.gray6};

    box-shadow: 0 10px 10px ${(props) => props.theme.gray4};

    user-select: text;

    font-size: 0.85rem;
`

const CodeContainer = styled.div`
    position: relative;
    width: 100%;
    min-width: 25rem;
`

function Code({ children: code, className: language }: CodeProps) {
    const fixedLanguage = language.replace("language-", "").toLowerCase()
    return (
        <CodeContainer>
            <CodeBox
                language={fixedLanguage}
                style={nord}
                customStyle={{
                    fontWeight: 500,
                    margin: 0,
                    padding: "1rem 5rem 1rem 1.25rem",
                    backgroundColor: "#0c1c2b",
                    // textAlighn: "none",
                    lineHight: "1.25rem",
                    // fontSize: "1rem",
                }}
                useInlineStyles={true}
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
