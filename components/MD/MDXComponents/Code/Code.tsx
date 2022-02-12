import { useState } from "react"
import styled from "styled-components"

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"

import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript"
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript"
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx"
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python"
import c from "react-syntax-highlighter/dist/cjs/languages/prism/c"
import matlab from "react-syntax-highlighter/dist/cjs/languages/prism/matlab"
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash"

import { nord } from "react-syntax-highlighter/dist/cjs/styles/prism"

import Toast from "@/components/UX/Toast/Toast"
import useClipboard from "@/hooks/useClipboard"

import animation from "@/styles/utils/animation"

SyntaxHighlighter.registerLanguage("tsx", tsx)
SyntaxHighlighter.registerLanguage("javascript", javascript)
SyntaxHighlighter.registerLanguage("typescript", typescript)
SyntaxHighlighter.registerLanguage("python", python)
SyntaxHighlighter.registerLanguage("c", c)
SyntaxHighlighter.registerLanguage("matlab", matlab)
SyntaxHighlighter.registerLanguage("bash", bash)

interface CodeProps {
    children: string
    className: string
}

const CodeContentBox = styled.div`
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

    color: ${(props) => props.theme.white};
    font-weight: 800;
    font-size: ${(props) => props.theme.sm};
    letter-spacing: 0.05rem;

    &:hover {
        border-color: ${(props) => props.theme.blue5};
    }

    transition: all 0.15s ease-in;
    animation: ${animation.fadeIn} 0.15s ease-out;

    user-select: none;
`

const CodeBox = styled(SyntaxHighlighter)`
    font-size: 0.9rem;

    min-height: 4rem;

    border: 0.1rem solid ${(props) => props.theme.gray6};
    border-radius: ${(props) => props.theme.blg};

    box-shadow: 0 10px 10px ${(props) => props.theme.gray4};

    user-select: none;

    overflow-x: auto;
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
                    lineHight: "1.25rem",
                    // fontSize: "1rem",
                }}
                useInlineStyles={true}
            >
                {code}
            </CodeBox>
            <CodeContentBox>{fixedLanguage}</CodeContentBox>
            <CopyContentBtn copyObject={code} />
        </CodeContainer>
    )
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
    &:hover {
        border-color: ${(props) => props.theme.blue5};
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.9);
    }
`

interface CopyContentProps {
    copyObject: string
}

const CopyInfo = {
    success: {
        message: "Copied!😊",
        left: 94,
    },
    fail: {
        message: "Copy Failed🥲",
        left: 124,
    },
}

function CopyContentBtn({ copyObject }: CopyContentProps) {
    const { copyTextToUser } = useClipboard()
    const [isCopySuccess, setIsCopySuccess] = useState(false)
    return (
        <>
            <CodeCopyButton
                onClick={async () => {
                    if (!isCopySuccess) {
                        const { isCopySucess } = await copyTextToUser(
                            copyObject
                        )
                        setIsCopySuccess(isCopySucess)
                    }
                }}
            >
                📝
            </CodeCopyButton>
            <Toast
                tooltipElement={
                    <CodeContentBox>
                        {isCopySuccess && <>{CopyInfo.success.message}</>}
                        {!isCopySuccess && <>{CopyInfo.fail.message}</>}
                    </CodeContentBox>
                }
                active={isCopySuccess}
                setActive={setIsCopySuccess}
                left={
                    isCopySuccess ? CopyInfo.success.left : CopyInfo.fail.left
                }
                bottom={24}
                appearSecond={2}
            />
        </>
    )
}

export default Code
