import { useState, memo } from "react"

import styled from "styled-components"
import animation from "@styles/utils/animation"
import media from "@styles/utils/media"

import type { TableOfContents } from "@lib/unified/remark"

import { usePointerInteraction } from "@hooks/index"

import { SizedText } from "@components/UI/Atoms/SizedText"
import { LinkContainer } from "./common"

import { useAtoms, _atom } from "@lib/jotai"

const TableOfContentPositionContainer = styled.div`
    position: sticky;
    top: 6rem;

    width: 100%;
    max-height: 40rem;
    overflow-y: scroll;

    margin-right: 1rem;

    margin-top: 6rem;
`

const TOCContainer = styled.div`
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
    border-left: 0.1rem solid ${(p) => p.theme.gray4};

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

    padding: 0.75rem 0.25rem;

    &:hover {
        background-color: ${({ theme }) => `${theme.containerBackgroundColor}`};
        border-radius: ${(p) => `0 ${p.theme.bmd} ${p.theme.bmd} 0`};
    }

    animation-delay: ${({ index }) => index * 85}ms;
`
const H2Link = styled(HeaderLinkCommon)`
    transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);

    padding: 0.5rem 0.25rem;

    margin-left: 1rem;

    color: ${(p) => p.theme.descriptionFontColor};

    &:hover {
        border-color: ${(p) => p.theme.themePrimaryColor};
    }

    transform-origin: left;
    transform: translateY(${(p) => (p.isFocusing ? "0" : "-15px")});

    opacity: ${(p) => (p.isFocusing ? 1 : 0)};
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

function TableOfContentDesktop({ toc }: { toc: TableOfContents[] }) {
    const { focusTitleState, focusTitleSetState } = useAtoms(
        _atom("focusTitle")
    )

    const [isFocusing, setIsFocusing] = useState(false)

    return (
        <TableOfContentPositionContainer>
            <TOCContainer
                {...usePointerInteraction({
                    pointerStateSetter: setIsFocusing,
                    neverCloseOnTouchEnd: true,
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
                                <SizedText
                                    defaultLineNumber={1}
                                    breakOption="break-all"
                                    lineHeight={1}
                                >
                                    🍞 {title}
                                </SizedText>
                                {!!children && (
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
                                                        <SizedText
                                                            defaultLineNumber={
                                                                1
                                                            }
                                                            breakOption="break-all"
                                                            lineHeight={1}
                                                        >
                                                            🥛 {childTitle}
                                                        </SizedText>
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
