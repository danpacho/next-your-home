import styled from "styled-components"
import shadow from "@styles/utils/shadow"
import media from "@styles/utils/media"
import { scrollBar } from "@styles/utils/scrollBar"
import { iconStyle } from "@styles/utils/icon.style"

import { useState } from "react"

import Link from "next/link"

import { SeriesInfoType } from "@typing/post/series"

import { useMouseInteraction, useTimeout } from "@hooks/index"

import { BookmarkIcon } from "@components/UI/Atoms/Icons"

interface SeriesLinkContainerStyle {
    color: string
    isOpen: boolean
}
const SeriesLinkContainer = styled.div<SeriesLinkContainerStyle>`
    transition: border-color ease-out 0.2s;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    width: 100%;

    gap: 1rem;

    padding: 0.75rem;

    background-color: ${({ theme }) =>
        `${theme.containerBackgroundColor}${theme.opacity80}`};
    backdrop-filter: blur(10px);

    border-width: 0.1rem;
    border-style: solid;
    border-color: ${(p) => (p.isOpen ? p.color : "transparent")};
    border-radius: ${(p) => p.theme.bsm};

    box-shadow: ${shadow.shadowXxsm};

    cursor: pointer;

    &:hover {
        border-color: ${(p) => p.color};
        background-color: ${(p) => p.theme.containerBackgroundColor};
    }

    ${media.widePhone} {
        padding: 0.5rem;
        backdrop-filter: unset;
    }
`

const SeriesLinkInfoContainer = styled.div<{ color: string }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    gap: 0.75rem;

    width: 100%;

    padding-left: 0.2rem;

    border-right: 0.1rem solid ${(p) => p.color};

    user-select: none;
`

const SeriesTitle = styled.h1`
    color: ${(p) => p.theme.fontColor};
    font-weight: 700;
    font-size: ${(p) => p.theme.md};

    ${media.widePhone} {
        font-weight: 600;
    }
`

const SeriesBookmarkBox = styled.div<{ color: string }>`
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 0.25rem;

    padding: 0.35rem;

    border-radius: ${(p) => p.theme.bsm};
    border: 0.1rem solid ${(p) => p.color};
    background-color: ${({ theme, color }) => `${color}${theme.opacity20}`};

    color: ${(p) => p.theme.fontColor};
    font-weight: 700;
    font-size: ${(p) => p.theme.sm};

    ${iconStyle.md()};

    ${media.widePhone} {
        gap: 0.15rem;

        padding: 0.25rem;

        border-radius: ${(p) => p.theme.bxsm};
    }
`

const SeriesPostContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    gap: 1rem;

    padding: 0.2rem;

    border-radius: ${(p) => p.theme.bsm};
    border: 0.1rem solid transparent;

    &:hover {
        background-color: ${(p) => p.theme.containerBackgroundColor};
        border-color: ${(p) => p.theme.containerBorderColor};
    }
    cursor: pointer;
`
const SeriesPostOrder = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: ${(p) => p.theme.xsm};
    font-weight: 500;
    color: ${(p) => p.theme.fontColor};

    width: 1rem;
    height: 1rem;
    padding: 0.25rem;

    border-radius: ${(p) => p.theme.bxsm};
    background-color: ${({ theme }) => `${theme.fontColor}${theme.opacity10}`};
`

const SeriesPostTitle = styled.div`
    color: ${(p) => p.theme.fontColor};
    font-weight: 500;
    font-size: ${(p) => p.theme.sm};
`

const AccordianContainer = styled.div<SeriesLinkContainerStyle>`
    display: ${(p) => (p.isOpen ? "flex" : "none")};
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    gap: 0.25rem;

    width: 100%;

    max-height: 5.5rem;
    overflow-y: scroll;
    ${(p) => scrollBar.basic(p.color)};

    ${media.widePhone} {
        max-height: unset;
        overflow-y: auto;
    }
`

const SERIES_ORDER_TEXT = [
    "Ⅰ",
    "Ⅱ",
    "Ⅲ",
    "Ⅳ",
    "Ⅴ",
    "Ⅵ",
    "Ⅶ",
    "Ⅷ",
    "Ⅸ",
    "Ⅹ",
    "Ⅺ",
    "Ⅻ",
]
function CategorySeriesLink({ seriesTitle, seriesInfo }: SeriesInfoType) {
    const [isOpen, setIsOpen] = useState(false)
    const [seriesViewOver, setSeriesViewOver] = useState(false)

    const seriesColor = seriesInfo[0].color

    useTimeout({
        timeoutCondition: seriesViewOver,
        timeoutFunction: () => setIsOpen(false),
        time: 4000,
    })

    return (
        <SeriesLinkContainer
            isOpen={isOpen}
            color={seriesColor}
            onClick={() => {
                setIsOpen(true)
                setSeriesViewOver(false)
            }}
            {...useMouseInteraction({
                mouseStateSetter: setSeriesViewOver,
            })}
        >
            <SeriesLinkInfoContainer
                color={seriesColor}
                onClick={(e) => {
                    e.stopPropagation()
                    setSeriesViewOver(false)
                    setIsOpen((isOpen) => !isOpen)
                }}
            >
                <SeriesBookmarkBox color={seriesColor}>
                    <BookmarkIcon />
                    <p>{seriesInfo.length}</p>
                </SeriesBookmarkBox>
                <SeriesTitle>{seriesTitle}</SeriesTitle>
            </SeriesLinkInfoContainer>

            <AccordianContainer isOpen={isOpen} color={seriesColor}>
                {seriesInfo.map(({ postTitle, url, order, color }) => (
                    <Link passHref href={url} key={postTitle}>
                        <SeriesPostContainer color={color}>
                            <SeriesPostOrder>
                                <p>{SERIES_ORDER_TEXT[order - 1]}</p>
                            </SeriesPostOrder>
                            <SeriesPostTitle>{postTitle}</SeriesPostTitle>
                        </SeriesPostContainer>
                    </Link>
                ))}
            </AccordianContainer>
        </SeriesLinkContainer>
    )
}

export default CategorySeriesLink
