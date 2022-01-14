import styled, {
    css,
    DefaultTheme,
    FlattenInterpolation,
    ThemeProps,
} from "styled-components"

interface QuoteStyles {
    note: StyleProperty
    warning: StyleProperty
    question: StyleProperty
    default: StyleProperty
}
interface StyleProperty {
    containerCss: () => FlattenInterpolation<ThemeProps<DefaultTheme>>
    iconCss: () => FlattenInterpolation<ThemeProps<DefaultTheme>>
    icon: string
}

type QuoteStyleType = keyof QuoteStyles

const quoteStyles: QuoteStyles = {
    note: {
        containerCss: () => css`
            border-color: ${(props) => props.theme.teal6};
        `,
        iconCss: () => css`
            background-color: ${(props) => props.theme.teal2};
            border-color: ${(props) => props.theme.teal4};
        `,

        icon: "✒️",
    },
    warning: {
        containerCss: () => css`
            border-color: ${(props) => props.theme.red4};
        `,
        iconCss: () => css`
            background-color: ${(props) => props.theme.red1};
            border-color: ${(props) => props.theme.red3};
        `,

        icon: "🔥",
    },
    question: {
        containerCss: () => css`
            border-color: ${(props) => props.theme.yellow6};
        `,
        iconCss: () => css`
            background-color: ${(props) => props.theme.yellow2};
            border-color: ${(props) => props.theme.yellow4};
        `,

        icon: "🧐",
    },
    default: {
        containerCss: () => css`
            border-color: ${(props) => props.theme.gray3};
        `,
        iconCss: () => css`
            background-color: ${(props) => props.theme.gray1};
            border-color: ${(props) => props.theme.gray3};
        `,

        icon: "🚩",
    },
}

interface QuoteStyleTypeProp {
    type: QuoteStyleType
}

const QuoteStyled = styled.blockquote<QuoteStyleTypeProp>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 0.75rem;

    width: fit-content;
    height: fit-content;

    padding: 0 0.5rem;
    padding-right: 1rem;

    margin: 1rem 0;
    background-color: ${(props) => props.theme.gray1};

    border-radius: 0 ${(props) => props.theme.bxxlg} 0 0;

    border-left-width: 0.65rem;
    border-bottom-width: 0.15rem;
    border-style: solid;

    p {
        font-size: ${(props) => props.theme.lg};
        font-weight: 500;
    }

    ${({ type }) => quoteStyles[type]?.containerCss};
`

const QuoteIcon = styled.div<QuoteStyleTypeProp>`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 2rem;
    height: 2rem;
    padding: 0.25rem;

    font-size: 1.85rem;
    user-select: none;

    border-radius: ${(props) => props.theme.blg};
    border-width: 0.2rem;
    border-style: solid;

    ${({ type }) => quoteStyles[type]?.iconCss};
`

interface QuoteProps {
    children: {
        props: {
            children: string | string[]
        }
    }
}

// const QUOTE_TYPE = {
//     NOTE: "note",
//     WARNING: "warning",
//     QUESTION: "question",
//     DEFAULT: "default",
// }

const getTextQuoteType = (pureChildren: string): QuoteStyleType => {
    if (pureChildren.includes(":note")) return "note"
    if (pureChildren.includes(":warning")) return "warning"
    if (pureChildren.includes(":question")) return "question"
    return "default"
}

//* 마지막 요소만 검사
const getArrayQuoteType = (pureChildren: any[]): QuoteStyleType =>
    getTextQuoteType(pureChildren[pureChildren.length - 1])

const getQuoteType = (pureChildren: string | string[]): QuoteStyleType => {
    if (typeof pureChildren === "string") return getTextQuoteType(pureChildren)
    else return getArrayQuoteType(pureChildren)
}

const getQuoteProp = (
    type: QuoteStyleType,
    pureChildren: string | string[]
) => {
    if (typeof pureChildren === "string")
        return pureChildren.replace(`:${type}`, "")

    const childRength = pureChildren.length

    const frontModifiedChildren = pureChildren.slice(0, childRength - 1)
    const backModifiedChildren = pureChildren
        .slice(childRength - 1, childRength)[0]
        .replace(`:${type}`, "")

    return [frontModifiedChildren, backModifiedChildren]
}

function Quote(props: QuoteProps) {
    const pureChildren = props.children.props.children

    const quoteType = getQuoteType(pureChildren)
    const fixedProps = getQuoteProp(quoteType, pureChildren)

    const modifiedChildren = {
        children: {
            ...props.children,
            props: {
                ...props.children.props,
                children: fixedProps,
            },
        },
    }

    return (
        <QuoteStyled type={quoteType}>
            <QuoteIcon type={quoteType}>
                {quoteStyles[quoteType].icon}
            </QuoteIcon>
            <p {...modifiedChildren} />
        </QuoteStyled>
    )
}

export default Quote
