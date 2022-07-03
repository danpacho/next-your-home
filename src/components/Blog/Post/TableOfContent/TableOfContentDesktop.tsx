import { useState, memo } from "react"

import styled from "styled-components"
import animation from "@styles/utils/animation"
import media from "@styles/utils/media"

import type { TableOfContents } from "@lib/unified/remark"

import { sliceTextByMaxLength } from "@utils/function/text"

import { useMouseInteraction } from "@hooks/index"

import { useAtoms, _atom } from "@lib/jotai"

import { LinkContainer } from "./common"

const TableOfContentPositionContainer = styled.div`
    position: sticky;
    top: 6rem;

    min-width: 17.5rem;
    margin-right: 2rem;

    margin-top: 6rem;
    ${media.smallScreen} {
        min-width: unset;
        margin-right: 0.5rem;
        flex: 1;
    }
`

const TOCContainer = styled.div`
    min-width: max-content;
    height: fit-content;

    display: flex;
    justify-content: center;
    flex-direction: column;

    z-index: ${(p) => p.theme.zContnet};
`

interface LinkStyle {
    isFocusing: boolean
}

const HeaderLinkCommon = styled.div<LinkStyle>`
    width: 100%;
    padding: 0.75rem 0.25rem;
    border-left: 0.1rem solid ${(p) => p.theme.gray2};

    color: ${(p) => p.theme.fontColor};
    font-size: ${({ theme }) => theme.sm};

    animation: ${animation.pureZoomIn} 1.35s cubic-bezier(0.19, 1, 0.22, 1);
    transform-origin: left;

    &:hover {
        color: ${(p) => p.theme.themePrimaryColor};
    }

    cursor: pointer;
`

const H1Link = styled(HeaderLinkCommon)<{ index: number }>`
    transition: background-color 0.2s ease;

    font-weight: ${(p) => (p.isFocusing ? 700 : 500)};
    color: ${({ isFocusing, theme }) => isFocusing && theme.themePrimaryColor};

    border-color: ${({ theme, isFocusing }) =>
        isFocusing && theme.themePrimaryColor};

    height: ${(p) => (p.isFocusing ? "fit-content" : "2.5rem")};
    min-height: 2.5rem;

    &:hover {
        background-color: ${({ theme }) => `${theme.containerBackgroundColor}`};
        border-radius: ${(p) => `0 ${p.theme.bmd} ${p.theme.bmd} 0`};
    }

    animation-delay: ${({ index }) => index * 85}ms;
`
const H2Link = styled(HeaderLinkCommon)`
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

    margin-left: 1.25rem;

    color: ${(p) => p.theme.descriptionFontColor};

    &:hover {
        border-color: ${(p) => p.theme.themePrimaryColor};
    }

    will-change: transform;
    transform-origin: left;
    transform: scale(${(p) => (p.isFocusing ? "1" : "0")})
        translateY(${(p) => (p.isFocusing ? "0" : "-10px")});

    visibility: ${(p) => (p.isFocusing ? "visible" : "hidden")};

    ${media.mediumTablet} {
        display: none;
    }

    font-weight: 400;
`
const H2Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    margin-top: 1rem;
`

const TITLE_MAX_LENGTH = {
    h1: 17,
    h2: 15,
}

function TableOfContentDesktop({ toc }: { toc: TableOfContents[] }) {
    const { focusTitleState, focusTitleSetState } = useAtoms(
        _atom("focusTitle")
    )

    const [isFocusing, setIsFocusing] = useState(false)

    return (
        <TableOfContentPositionContainer>
            <TOCContainer
                {...useMouseInteraction({
                    mouseStateSetter: setIsFocusing,
                })}
            >
                {toc.map(({ title, href, children }, index) => {
                    const isTitleFocusing = focusTitleState === title
                    return (
                        <LinkContainer key={title} href={href}>
                            <H1Link
                                index={index}
                                isFocusing={isTitleFocusing || isFocusing}
                                key={title}
                            >
                                <p>
                                    🍞{" "}
                                    {sliceTextByMaxLength(
                                        title,
                                        TITLE_MAX_LENGTH.h1
                                    )}
                                </p>
                                {children.length !== 0 && (
                                    <H2Container>
                                        {children.map(
                                            ({ title: childTitle, href }) => (
                                                <LinkContainer
                                                    href={href}
                                                    key={childTitle}
                                                >
                                                    <H2Link
                                                        isFocusing={
                                                            isTitleFocusing ||
                                                            isFocusing
                                                        }
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            focusTitleSetState(
                                                                title
                                                            )
                                                        }}
                                                    >
                                                        <p>
                                                            🥛{" "}
                                                            {sliceTextByMaxLength(
                                                                childTitle,
                                                                TITLE_MAX_LENGTH.h2
                                                            )}
                                                        </p>
                                                    </H2Link>
                                                </LinkContainer>
                                            )
                                        )}
                                    </H2Container>
                                )}
                            </H1Link>
                        </LinkContainer>
                    )
                })}
            </TOCContainer>
        </TableOfContentPositionContainer>
    )
}

export default memo(TableOfContentDesktop)
