import styled from "styled-components"
import media from "@styles/utils/media"
import { scrollBar } from "@styles/utils/scrollBar"
import { iconStyle } from "@styles/utils/icon.style"

import { useState } from "react"

import Link from "next/link"

import { ColorProps } from "@typing/theme"
import { SeriesInfoType } from "@typing/post/series"

import { useTimeout } from "@hooks/index"

import { SizedText } from "@components/UI/Atoms/SizedText"
import { BookmarkIcon } from "@components/UI/Atoms/Icons"

interface SeriesLinkContainerStyle extends ColorProps {
    isOpen: boolean
}
const SeriesLinkContainer = styled.div<SeriesLinkContainerStyle>`
    transition: border-color ease-out 0.2s;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    width: 100%;

    gap: 0.75rem;

    padding: 0.5rem;

    background-color: ${({ theme }) =>
        `${theme.containerBackgroundColor}${theme.opacity80}`};

    border-width: 0.1rem;
    border-style: solid;
    border-color: ${(p) => (p.isOpen ? p._color : "transparent")};
    border-radius: ${(p) => p.theme.bxsm};

    box-shadow: ${(p) => p.theme.shadowXxsm};

    cursor: pointer;

    &:hover {
        border-color: ${(p) => p._color};
        background-color: ${(p) => p.theme.containerBackgroundColor};
    }
    ${media.mediumTablet} {
        padding: 0.4rem;
    }

    ${media.widePhone} {
        gap: 0.65rem;

        backdrop-filter: unset;
    }
`

const SeriesLinkInfoContainer = styled.div<ColorProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    gap: 0.75rem;

    width: 100%;

    padding-left: 0.2rem;

    border-right: 0.1rem solid ${(p) => p._color};

    user-select: none;
`

const SeriesTitle = styled.h1`
    color: ${(p) => p.theme.fontColor};
    font-weight: 600;
    font-size: ${(p) => p.theme.md};

    ${media.widePhone} {
        font-weight: 500;
    }
`

const SeriesBookmarkBox = styled.div<ColorProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    gap: 0.1rem;

    padding: 0.25rem;

    border-radius: ${(p) => p.theme.bxsm};
    border: 0.1rem solid ${(p) => p._color};
    background-color: ${({ theme, _color }) => `${_color}${theme.opacity20}`};

    color: ${(p) => p.theme.fontColor};
    font-weight: 700;
    font-size: ${(p) => p.theme.sm};

    ${iconStyle.md()};

    ${media.mediumTablet} {
        padding: 0.2rem;
    }

    ${media.widePhone} {
        gap: 0.15rem;

        border-radius: ${(p) => p.theme.bxsm};

        font-weight: 500;
    }
`

const SeriesPostContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    gap: 0.75rem;

    padding: 0.2rem;

    border-radius: ${(p) => p.theme.bsm};
    border: 0.1rem solid transparent;

    &:hover {
        background-color: ${(p) => p.theme.containerBackgroundColor};
        border-color: ${(p) => p.theme.containerBorderColor};
    }
    cursor: pointer;

    ${media.widePhone} {
        gap: 0.5rem;
    }
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

const SeriesListContainer = styled.div<ColorProps>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    gap: 0.25rem;

    width: 100%;

    max-height: 5.5rem;
    overflow-y: scroll;

    padding-right: 0.5rem;

    ${(p) => scrollBar.basic(p._color)};

    ${media.widePhone} {
        max-height: unset;
        overflow-y: auto;

        gap: 0.35rem;
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
const SERIES_AUTO_CLOSE_TIME = 4000

function CategorySeriesLink({ seriesTitle, seriesInfo }: SeriesInfoType) {
    const [isOpen, setIsOpen] = useState(false)
    const [seriesViewOver, setSeriesViewOver] = useState(false)

    const seriesColor = seriesInfo[0].color

    useTimeout({
        timeoutCondition: seriesViewOver,
        timeoutFunction: () => setIsOpen(false),
        time: SERIES_AUTO_CLOSE_TIME,
    })

    return (
        <SeriesLinkContainer
            isOpen={isOpen}
            _color={seriesColor}
            onClick={() => {
                setIsOpen(true)
                setSeriesViewOver(false)
            }}
            onMouseLeave={() => setSeriesViewOver(true)}
            onMouseEnter={() => setSeriesViewOver(false)}
        >
            <SeriesLinkInfoContainer
                _color={seriesColor}
                onClick={(e) => {
                    e.stopPropagation()
                    setSeriesViewOver(false)
                    setIsOpen((isOpen) => !isOpen)
                }}
            >
                <SeriesBookmarkBox _color={seriesColor}>
                    <BookmarkIcon />
                    <p>{seriesInfo.length}</p>
                </SeriesBookmarkBox>
                <SeriesTitle>{seriesTitle}</SeriesTitle>
            </SeriesLinkInfoContainer>

            {isOpen && (
                <SeriesListContainer _color={seriesColor}>
                    {seriesInfo.map(({ postTitle, url, order, color }) => (
                        <Link passHref href={url} key={postTitle}>
                            <SeriesPostContainer color={color}>
                                <SeriesPostOrder>
                                    <p>{SERIES_ORDER_TEXT[order - 1]}</p>
                                </SeriesPostOrder>
                                <SeriesPostTitle>
                                    <SizedText
                                        defaultLineNumber={1}
                                        lineHeight={0.85}
                                    >
                                        {postTitle}
                                    </SizedText>
                                </SeriesPostTitle>
                            </SeriesPostContainer>
                        </Link>
                    ))}
                </SeriesListContainer>
            )}
        </SeriesLinkContainer>
    )
}

export default CategorySeriesLink
