import styled, {
    css,
    DefaultTheme,
    FlattenInterpolation,
    ThemeProps,
} from "styled-components"

import media from "@styles/utils/media"

import { IsLight } from "@typing/theme"

import useThemeMode from "@hooks/useThemeMode"

interface QuoteStyles {
    note: StyleProperty
    warning: StyleProperty
    question: StyleProperty
    default: StyleProperty
}
interface StyleProperty {
    containerStyle: FlattenInterpolation<ThemeProps<DefaultTheme>>
    emojiStyle: FlattenInterpolation<ThemeProps<DefaultTheme>>
    emoji: string
}

type QuoteStyleType = keyof QuoteStyles

const quoteStyles: QuoteStyles = {
    note: {
        containerStyle: css`
            border-color: ${(props) => props.theme.teal6};
        `,
        emojiStyle: css`
            background-color: ${(props) => props.theme.teal2};
            border-color: ${(props) => props.theme.teal4};
        `,
        // icon: "🖋",
        emoji: "✒️",
    },
    warning: {
        containerStyle: css`
            border-color: ${(props) => props.theme.red4};
        `,
        emojiStyle: css`
            background-color: ${(props) => props.theme.red1};
            border-color: ${(props) => props.theme.red3};
        `,

        emoji: "🔥",
    },
    question: {
        containerStyle: css`
            border-color: ${(props) => props.theme.yellow6};
        `,
        emojiStyle: css`
            background-color: ${(props) => props.theme.yellow1};
            border-color: ${(props) => props.theme.yellow3};
        `,

        emoji: "🧐",
    },
    default: {
        containerStyle: css`
            border-color: ${(props) => props.theme.gray3};
        `,
        emojiStyle: css`
            background-color: ${(props) => props.theme.gray1};
            border-color: ${(props) => props.theme.gray3};
        `,

        // icon: "🏷",
        emoji: "💡",
    },
}

interface QuoteStyleTypeProp {
    type: QuoteStyleType
}

const QuoteStyled = styled.blockquote<QuoteStyleTypeProp & IsLight>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 0.75rem;

    width: fit-content;
    height: fit-content;

    padding: 0.75rem;
    padding-right: 1rem;

    margin: 1rem 0;

    background-color: ${({ theme, isLight }) =>
        isLight ? theme.white : theme.deepDark};

    border-radius: 0 ${(props) => props.theme.blg} 0 0;

    border-left-width: 0.65rem;
    border-bottom-width: 0.15rem;
    border-style: solid;

    box-shadow: ${(p) => p.theme.shadowXxsm};

    p {
        font-weight: 500;
        margin: 0;
    }

    ${({ type }) => quoteStyles[type]?.containerStyle};

    ${media.widePhone} {
        p {
            line-height: 1.5rem;
        }
    }
`

const QuoteIcon = styled.div<QuoteStyleTypeProp & IsLight>`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 2rem;
    height: 2rem;
    padding: 1.25rem;

    font-size: ${(p) => p.theme.xxlg};
    user-select: none;

    border-radius: ${(props) => props.theme.blg};
    border-width: 0.175rem;
    border-style: solid;

    ${({ type }) => quoteStyles[type]?.emojiStyle};

    ${media.widePhone} {
        width: 1.5rem;
        height: 1.5rem;
        padding: 1rem;
        border-width: 0.15rem;
        border-radius: ${(props) => props.theme.blg};

        font-size: ${(p) => p.theme.lg};
    }
`

interface QuoteProps {
    children: [
        divider: "\n",
        quoteContent: {
            props: {
                children: string[] | string
            }
        },
        divider: "\n"
    ]
}

const getTextQuoteType = (lastQuoteString: string): QuoteStyleType => {
    if (lastQuoteString.includes(":note")) return "note"
    if (lastQuoteString.includes(":warning")) return "warning"
    if (lastQuoteString.includes(":question")) return "question"
    return "default"
}

//* 마지막 요소 검사
const getQuoteType = (quoteContent: string[] | string): QuoteStyleType =>
    typeof quoteContent === "string"
        ? getTextQuoteType(quoteContent)
        : getTextQuoteType(quoteContent[quoteContent.length - 1])

const getQuoteProp = (
    type: QuoteStyleType,
    quoteContent: QuoteProps
): QuoteProps => {
    const modifiChildren = quoteContent.children[1].props.children
    const isChildrenString = typeof modifiChildren === "string"

    if (isChildrenString)
        return {
            children: [
                quoteContent.children[0],
                {
                    ...quoteContent.children[1],
                    props: {
                        children: modifiChildren.replace(`:${type}`, ""),
                    },
                },
                quoteContent.children[2],
            ],
        }

    //* last element
    const modifyObjectLocation = modifiChildren.length - 1
    const modifieLastdChildren = modifiChildren[modifyObjectLocation].replace(
        `:${type}`,
        ""
    )

    const modifiedChildren = modifiChildren
        .slice(0, modifyObjectLocation)
        .concat(modifieLastdChildren)

    return {
        children: [
            quoteContent.children[0],
            {
                ...quoteContent.children[1],
                props: {
                    children: modifiedChildren,
                },
            },
            quoteContent.children[2],
        ],
    }
}

function Quote(props: QuoteProps) {
    const lastChildren = props.children[1].props.children as string | string[]
    const quoteType = getQuoteType(lastChildren)
    const fixedProps = getQuoteProp(quoteType, props)

    const { isLight } = useThemeMode()
    return (
        <QuoteStyled type={quoteType} isLight={isLight}>
            <QuoteIcon type={quoteType} isLight={isLight}>
                {quoteStyles[quoteType].emoji}
            </QuoteIcon>
            <div {...fixedProps} />
        </QuoteStyled>
    )
}

export default Quote
