import styled from "styled-components"
import media from "@styles/utils/media"
import type { MediaType } from "@styles/utils/media"

type MediaLineOption = {
    [key in MediaType]?: number
} & {
    defaultLineNumber: number
    breakOption?: "normal" | "break-all" | "keep-all" | "break-word"
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
    ${media.wideScreen} {
        -webkit-line-clamp: ${(p) => p.wideScreen ?? p.defaultLineNumber};
    }
    ${media.mediumScreen} {
        -webkit-line-clamp: ${(p) => p.mediumScreen ?? p.defaultLineNumber};
    }
    ${media.smallScreen} {
        -webkit-line-clamp: ${(p) => p.smallScreen ?? p.defaultLineNumber};
    }
    ${media.wideTablet} {
        -webkit-line-clamp: ${(p) => p.wideTablet ?? p.defaultLineNumber};
    }
    ${media.mediumTablet} {
        -webkit-line-clamp: ${(p) => p.mediumTablet ?? p.defaultLineNumber};
    }
    ${media.widePhone} {
        -webkit-line-clamp: ${(p) => p.widePhone ?? p.defaultLineNumber};
    }
    ${media.mediumPhone} {
        -webkit-line-clamp: ${(p) => p.mediumPhone ?? p.defaultLineNumber};
    }
`
function SizedText(props: SizedTextProps) {
    return <SizedP {...props}>{props.children}</SizedP>
}

export default SizedText
