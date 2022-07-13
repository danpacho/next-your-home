import styled, { css } from "styled-components"
import media from "@styles/utils/media"
import type { MediaType } from "@styles/utils/media"

type MediaLineOption = {
    [key in MediaType]?: number
} & {
    defaultLineNumber: number
    breakOption?: "normal" | "break-all" | "keep-all" | "break-word"
    lineHeight: number
    align?: "start" | "end" | "left" | "right" | "center" | "justify"
}
type SizedTextProps = MediaLineOption & {
    children: React.ReactNode
}

const SizedP = styled.p<MediaLineOption>`
    display: -webkit-box;
    -webkit-box-orient: vertical;

    width: 100%;
    text-overflow: ellipsis;
    word-break: ${(p) => p.breakOption ?? "break-word"};
    overflow: hidden;

    -webkit-line-clamp: ${(p) => p.defaultLineNumber};
    line-height: ${(p) => p.lineHeight}rem;
    max-height: ${({ lineHeight, defaultLineNumber }) =>
        lineHeight * defaultLineNumber}rem;

    ${(p) =>
        p.align &&
        css`
            text-align: ${p.align};
        `};

    ${media.wideScreen} {
        -webkit-line-clamp: ${(p) => p.wideScreen ?? p.defaultLineNumber};
        max-height: ${({ wideScreen, defaultLineNumber, lineHeight }) =>
            wideScreen
                ? lineHeight * wideScreen
                : lineHeight * defaultLineNumber}rem;
    }
    ${media.mediumScreen} {
        -webkit-line-clamp: ${(p) => p.mediumScreen ?? p.defaultLineNumber};
        max-height: ${({ mediumScreen, defaultLineNumber, lineHeight }) =>
            mediumScreen
                ? lineHeight * mediumScreen
                : lineHeight * defaultLineNumber}rem;
    }
    ${media.smallScreen} {
        -webkit-line-clamp: ${(p) => p.smallScreen ?? p.defaultLineNumber};
        max-height: ${({ smallScreen, defaultLineNumber, lineHeight }) =>
            smallScreen
                ? lineHeight * smallScreen
                : lineHeight * defaultLineNumber}rem;
    }
    ${media.wideTablet} {
        -webkit-line-clamp: ${(p) => p.wideTablet ?? p.defaultLineNumber};
        max-height: ${({ wideTablet, defaultLineNumber, lineHeight }) =>
            wideTablet
                ? lineHeight * wideTablet
                : lineHeight * defaultLineNumber}rem;
    }
    ${media.mediumTablet} {
        -webkit-line-clamp: ${(p) => p.mediumTablet ?? p.defaultLineNumber};
        max-height: ${({ mediumTablet, defaultLineNumber, lineHeight }) =>
            mediumTablet
                ? lineHeight * mediumTablet
                : lineHeight * defaultLineNumber}rem;
    }
    ${media.widePhone} {
        -webkit-line-clamp: ${(p) => p.widePhone ?? p.defaultLineNumber};
        max-height: ${({ widePhone, defaultLineNumber, lineHeight }) =>
            widePhone
                ? lineHeight * widePhone
                : lineHeight * defaultLineNumber}rem;
    }
    ${media.mediumPhone} {
        -webkit-line-clamp: ${(p) => p.mediumPhone ?? p.defaultLineNumber};
        max-height: ${({ mediumPhone, defaultLineNumber, lineHeight }) =>
            mediumPhone
                ? lineHeight * mediumPhone
                : lineHeight * defaultLineNumber}rem;
    }
`
function SizedText(props: SizedTextProps) {
    return <SizedP {...props}>{props.children}</SizedP>
}

export default SizedText
