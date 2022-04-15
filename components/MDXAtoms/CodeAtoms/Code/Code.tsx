import styled from "styled-components"
import media from "@/styles/utils/media"
import pallete from "@/styles/utils/pallete"

import { BlogPropertyError } from "@/utils/function/blog-error-handler/blogError"
import { CodeContentBox, CodeCopyButton } from "./CodeCopyButton"

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
import palleteOpacity from "@/styles/utils/palleteOpacity"
import shadow from "@/styles/utils/shadow"
import { useTheme } from "@/lib/atoms/theme/theme.state"
import { IsLight } from "@/types/theme"

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

const CodeContainer = styled.div`
    position: relative;

    width: 100%;
    min-width: 25rem;

    ${media.widePhone} {
        min-width: unset;
    }
`

const CodeBox = styled(SyntaxHighlighter)`
    min-height: 2.5rem;

    border-radius: ${(props) => props.theme.bmd};

    box-shadow: ${shadow.shadowLg};

    user-select: none;
    overflow-x: auto;

    background: ${(p) => p.theme.gray10} !important;
    margin: 0 !important;
    padding: 1rem 0 !important;
    font-size: 14px !important;
    line-height: 1.5rem !important;

    ${media.widePhone} {
        box-shadow: none;
        border-width: 0;
        border-radius: ${(p) => p.theme.bsm};

        padding-left: 0.75rem !important;
        .linenumber {
            display: none !important;
        }
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
        min-width: 2rem !important;
        font-size: ${(p) => p.theme.xsm};
        color: ${(p) => p.theme.gray7} !important;
    }
`

const CODE_WRAP_TYPE: Array<"add" | "remove" | "hightlight" | string> = [
    "add",
    "remove",
    "hightlight",
]

const makeMinToMaxNumberArray = ([min, max]: number[]) => {
    if (min > max)
        throw new BlogPropertyError({
            errorNameDescription: "code highlighter option Error",
            propertyName: "add || remove || hightlight",
            propertyType: "number",
            propertyDescription:
                " code block should be start with ```[language-name]add(min, max)remove(min, max)hightlight(min, max)",
            errorPropertyValue: String(min),
            customeErrorMessage:
                "code highlight option's line START number is greater line END number",
        })
    return Array.from({ length: max - min + 1 }, (_, idx) => idx + min)
}

interface CodeOption {
    add?: number[]
    remove?: number[]
    hightlight?: number[]
}

interface CodeInfo {
    language: string
    option?: CodeOption
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
            if (CODE_WRAP_TYPE.includes(trimedKey)) {
                return {
                    ...acc,
                    [trimedKey]: makeMinToMaxNumberArray(
                        optionVal.split(",").map((_) => Number(_))
                    ),
                }
            } else {
                //TODO: code error 타입 작성하기
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
    }
    if (option?.hightlight?.includes(lineNumber)) {
        commonLineStyle.backgroundColor = `${pallete.teal10}${palleteOpacity.opacity20}`
        return { style: commonLineStyle }
    }
    if (option?.remove?.includes(lineNumber)) {
        commonLineStyle.backgroundColor = `${pallete.red4}${palleteOpacity.opacity20}`
        return { style: commonLineStyle }
    }
    if (option?.add?.includes(lineNumber)) {
        commonLineStyle.backgroundColor = `${pallete.blue8}${palleteOpacity.opacity20}`
        return { style: commonLineStyle }
    }
    return {}
}

const InlineCode = styled.code<IsLight>`
    padding: 0.1rem 0.15rem;
    margin: 0 0.25rem;

    color: ${({ theme, isLight }) => (isLight ? theme.red5 : theme.gray2)};
    font-family: "Fira Code", Consolas, Monaco, "Andale Mono", "Ubuntu Mono",
        monospace;
    font-weight: 600;
    font-size: ${(p) => p.theme.sm};

    border-radius: ${(props) => props.theme.bxsm};
    border: 1.25px solid
        ${({ theme, isLight }) => (isLight ? theme.gray3 : theme.blue6)};

    background-color: ${({ theme, isLight }) =>
        isLight ? theme.gray1 : theme.blue9};
`

interface CodeProps {
    children: string
    className?: string
}
function Code({ children: code, className: classNameLanguage }: CodeProps) {
    const isLight = useTheme() === "light"
    if (!classNameLanguage)
        return <InlineCode isLight={isLight}>{code}</InlineCode>

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
            <CodeCopyButton code={code} />
        </CodeContainer>
    )
}

export default Code
