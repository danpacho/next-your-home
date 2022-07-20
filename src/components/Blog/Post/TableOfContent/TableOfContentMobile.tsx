import styled from "styled-components"
import media from "@styles/utils/media"

import { IsLight } from "@typing/theme"
import type { TableOfContents } from "@lib/unified/remark"

import { useThemeMode } from "@hooks/index"
import { useAtoms, _atom } from "@lib/jotai"

import { LinkContainer } from "./common"
import { memo } from "react"

const TableOfContentContainer = styled.div<{ color: string }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    gap: 1.5rem;

    width: 100%;

    padding: 1.5rem 0;

    border-bottom: 0.1rem solid ${(p) => p.theme.containerBorderColor};
    ${({ theme, color }) => `${color}${theme.themeHexOpacity}`};

    ${media.widePhone} {
        gap: 1.25rem;
    }
`
const MobileTocTitle = styled.div`
    display: none;
    ${media.widePhone} {
        display: block;
    }

    font-size: ${(p) => p.theme.lg};
    font-weight: 700;
    color: ${(p) => p.theme.headerFontColor};

    margin-bottom: 1.5rem;
`
const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`
const H1LinkContainer = styled.div<IsLight>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;

    color: ${(p) => p.theme.fontColor};
    font-weight: 600;

    cursor: pointer;
`
const H1Link = styled.div`
    font-size: ${(p) => p.theme.lg};
    color: ${(p) => p.theme.fontColor};

    ${media.widePhone} {
        font-size: ${(p) => p.theme.md};
    }

    &:hover {
        text-decoration: underline;
        text-decoration-thickness: 0.1rem;
    }
`

const H2LinkContainer = styled.div<IsLight & { color: string }>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    gap: 0.65rem;

    padding: 1.05rem;
    padding-bottom: 0.6rem;
    margin-left: 0.45rem;

    border-left: 0.125rem solid ${({ color }) => color};
    border-bottom-left-radius: 1px;

    ${media.widePhone} {
        padding: 0.95rem;
        padding-bottom: 0.6rem;
        margin-left: 0.35rem;
    }
`
const H2Link = styled.div`
    font-size: ${(p) => p.theme.sm};
    font-weight: 400;
    color: ${(p) => p.theme.descriptionFontColor};

    &:hover {
        text-decoration: underline;
    }

    cursor: pointer;
`

const HeaderOrder = styled.div<{ color: string }>`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 1.2rem;
    height: 1.2rem;

    font-size: ${(p) => p.theme.sm};

    border-radius: ${(p) => p.theme.bsm};

    background-color: ${({ theme, color }) =>
        `${color}${theme.themeHexOpacity}`};
    box-shadow: -0.1rem 0.125rem 0 0 ${(p) => p.color};

    ${media.widePhone} {
        width: 1rem;
        height: 1rem;

        border-radius: ${(p) => p.theme.bxsm};
    }
`

function TableOfContentMobile({ toc }: { toc: TableOfContents[] }) {
    const { isLight } = useThemeMode()
    const { focusingPageColorState: color } = useAtoms(
        _atom("focusingPageColor")
    )
    return (
        <TableOfContentContainer color={color}>
            <MobileTocTitle>Before You Read</MobileTocTitle>

            {toc.map(({ title, href, children }, order) => (
                <HeaderContainer key={title}>
                    <LinkContainer href={href}>
                        <H1LinkContainer isLight={isLight}>
                            <HeaderOrder color={color}>{order + 1}</HeaderOrder>
                            <H1Link>{title}</H1Link>
                        </H1LinkContainer>
                    </LinkContainer>
                    {children !== null && (
                        <H2LinkContainer isLight={isLight} color={color}>
                            {children.map(({ title: childTitle, href }) => (
                                <LinkContainer href={href} key={childTitle}>
                                    <H2Link>{childTitle}</H2Link>
                                </LinkContainer>
                            ))}
                        </H2LinkContainer>
                    )}
                </HeaderContainer>
            ))}
        </TableOfContentContainer>
    )
}

export default memo(TableOfContentMobile)
