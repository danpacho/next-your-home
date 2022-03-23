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
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css"

import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism"

import Toast from "@/components/UX/Toast/Toast"
import useClipboard from "@/hooks/useClipboard"

import animation from "@/styles/utils/animation"
import media from "@/styles/utils/media"
import pallete from "@/styles/utils/pallete"
import borderRadius from "@/styles/utils/borderRadius"
import { BlogPropertyError } from "@/utils/function/blog-contents-loader/util/blogError"

const SUPPORTED_LANGUAGE = {
    javascript: ["javascript", "js"],
    typescript: ["typescript", "ts"],
    tsx: "tsx",
    python: "python",
    c: "c",
    matlab: "matlab",
    bash: "bash",
    css: "css",
}
const SUPPORTED_LANGUAGE_TYPE = Object.values(SUPPORTED_LANGUAGE).flat()

SyntaxHighlighter.registerLanguage(SUPPORTED_LANGUAGE.tsx, tsx)
SyntaxHighlighter.registerLanguage(SUPPORTED_LANGUAGE.javascript[0], javascript)
SyntaxHighlighter.registerLanguage(SUPPORTED_LANGUAGE.typescript[0], typescript)
SyntaxHighlighter.registerLanguage(SUPPORTED_LANGUAGE.python, python)
SyntaxHighlighter.registerLanguage(SUPPORTED_LANGUAGE.c, c)
SyntaxHighlighter.registerLanguage(SUPPORTED_LANGUAGE.matlab, matlab)
SyntaxHighlighter.registerLanguage(SUPPORTED_LANGUAGE.bash, bash)
SyntaxHighlighter.registerLanguage(SUPPORTED_LANGUAGE.css, css)

interface CodeProps {
    children: string
    className?: string
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

    background-color: ${(p) => p.theme.gray10};

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

    ${media.widePhone} {
        padding: 0.25rem;
        font-size: ${(p) => p.theme.xsm};
    }
`
const CodeBox = styled(SyntaxHighlighter)`
    min-height: 4.25rem;

    border-radius: ${(props) => props.theme.bmd};

    box-shadow: 0 10px 10px ${(props) => props.theme.gray4};

    user-select: none;
    overflow-x: auto;

    background: ${(p) => p.theme.gray10} !important;
    margin: 0 !important;
    font-size: 14px !important;
    line-height: 1.5rem !important;

    ${media.widePhone} {
        box-shadow: none;
        border-width: 0;
        border-radius: ${(p) => p.theme.bsm};
    }

    code {
        background: ${(p) => p.theme.gray10} !important;
        font-family: "Fira Code", Consolas, Monaco, "Andale Mono", "Ubuntu Mono",
            monospace !important;

        ${media.widePhone} {
            font-size: ${(p) => p.theme.xsm} !important;
        }
    }

    .linenumber {
        display: none !important;
    }
`

const CodeContainer = styled.div`
    position: relative;

    width: 100%;
    min-width: 25rem;

    ${media.widePhone} {
        min-width: unset;
    }
`

interface CodeOption {
    add?: number[]
    remove?: number[]
    hightlight?: number[]
}
interface CodeInfo {
    language: string
    option?: CodeOption
}

const WRAP_TYPE: Array<"add" | "remove" | "hightlight" | string> = [
    "add",
    "remove",
    "hightlight",
]

const makeMinToMaxNumberArray = ([min, max]: number[]) => {
    if (min > max)
        throw new BlogPropertyError({
            errorNameDescription: "code highlighter option Error",
            propertyName:
                "add(min, max) || remove(min, max) || hightlight(min, max)",
            propertyType: "number",
            errorPropertyValue: String(min),
            customeErrorMessage:
                "code highlight option's line START number is greater line END number",
        })
    return Array.from({ length: max - min + 1 }, (_, idx) => idx + min)
}

const extractLanguageAndOption = (classNameLanguage: string): CodeInfo => {
    const fixedLanguage = classNameLanguage
        .replace("language-", "")
        .toLowerCase()

    const isOptionIncluded = fixedLanguage.includes(":")
    if (!isOptionIncluded)
        return {
            language: fixedLanguage,
        }

    const [language, pureOption] = fixedLanguage.split(":")
    const option: CodeOption = pureOption
        .split(")")
        .map((elem) => elem.split("("))
        .reduce<CodeOption>((acc, curr) => {
            const [optionKey, optionVal] = curr
            const trimedKey = optionKey.trim()
            if (WRAP_TYPE.includes(trimedKey)) {
                return {
                    ...acc,
                    [trimedKey]: makeMinToMaxNumberArray(
                        optionVal.split(",").map((_) => Number(_))
                    ),
                }
            } else {
                //TODO: code error 타입 작성하기
                // throw blogError("Option Error Occured!", `${trimedKey}`)
                return acc
            }
        }, {})

    return {
        language,
        option,
    }
}

const colorCode = (lineNumber: number, option?: CodeOption) => {
    const commonLineStyle = {
        display: "block",
        backgroundColor: "transparent",
        margin: ".1rem 0",
        paddingLeft: ".5rem",
        borderLeft: "solid .25rem",
        borderLeftColor: "transparent",
        borderRadius: `${borderRadius.bxxsm}`,
    }
    if (option?.hightlight?.includes(lineNumber)) {
        commonLineStyle.backgroundColor = `${pallete.teal6}19`
        commonLineStyle.borderLeftColor = `${pallete.teal6}66`
        return { style: commonLineStyle }
    }
    if (option?.remove?.includes(lineNumber)) {
        commonLineStyle.backgroundColor = `${pallete.red5}19`
        commonLineStyle.borderLeftColor = `${pallete.red5}66`
        return { style: commonLineStyle }
    }
    if (option?.add?.includes(lineNumber)) {
        commonLineStyle.backgroundColor = `${pallete.blue5}19`
        commonLineStyle.borderLeftColor = `${pallete.blue5}66`
        return { style: commonLineStyle }
    }
    return {}
}

const InlineCode = styled.code`
    padding: 0.1rem 0.15rem;
    margin: 0 0.25rem;

    color: ${(p) => p.theme.red5};
    font-family: "Fira Code", Consolas, Monaco, "Andale Mono", "Ubuntu Mono",
        monospace;
    font-weight: 600;
    font-size: ${(p) => p.theme.sm};

    border-radius: ${(props) => props.theme.bxsm};
    border: 1.25px solid ${(p) => p.theme.gray3};

    background-color: ${(p) => p.theme.gray1};
`

function Code({ children: code, className: classNameLanguage }: CodeProps) {
    if (!classNameLanguage) return <InlineCode>{code}</InlineCode>

    const fixedLanguage = classNameLanguage
        .replace("language-", "")
        .toLowerCase()

    const { language, option } = extractLanguageAndOption(fixedLanguage)
    const languageError = !SUPPORTED_LANGUAGE_TYPE.includes(language)

    return (
        <CodeContainer>
            <CodeBox
                language={language}
                style={materialDark}
                showLineNumbers
                wrapLines
                lineProps={(lineNumbers: number) =>
                    colorCode(lineNumbers, option)
                }
            >
                {code}
            </CodeBox>
            <CodeContentBox>{language}</CodeContentBox>
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

    background-color: ${(p) => p.theme.gray10};

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

    ${media.widePhone} {
        padding: 0.75rem;
        width: 1.25rem;
        height: 1.25rem;
    }
`

interface CopyContentProps {
    copyObject: string
}

const CopyInfo = {
    success: {
        message: "Copied!✂️",
        left: 90,
    },
    fail: {
        message: "Copy Failed❗️",
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
                {!isCopySuccess && "📝"}
                {isCopySuccess && "✅"}
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
