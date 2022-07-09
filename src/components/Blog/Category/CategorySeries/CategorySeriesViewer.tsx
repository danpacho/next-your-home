import styled from "styled-components"
import media from "@styles/utils/media"
import { iconStyle } from "@styles/utils/icon.style"

import { useState } from "react"

import { SeriesInfoType } from "@typing/post/series"

import { NextIcon, PrevIcon } from "@components/UI/Atoms/Icons"

import CategorySeriesLink from "./CategorySeriesLink"

const SeriesLinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 1.5rem;

    width: 85%;

    ${media.widePhone} {
        width: 100%;
        gap: 1.5rem;
    }
`
const SeriesHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 100%;
`
const ViwerControllerContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    gap: 0.5rem;
`
const ViewerControllButton = styled.button<{ disabled: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.3rem;

    background-color: ${({ theme }) =>
        `${theme.containerBackgroundColor}${theme.themeHexOpacity}`};

    border: 0.1rem solid transparent;
    border-radius: ${(p) => p.theme.bxxsm};

    box-shadow: ${(p) => p.theme.shadowXxsm};

    ${iconStyle.md()};

    :disabled {
        opacity: 0.2;
        cursor: not-allowed;
    }

    &:not(:disabled) {
        &:hover {
            border-color: ${(p) => p.theme.containerBorderColor};
            background-color: ${(p) => p.theme.containerBackgroundColor};
            box-shadow: none;
        }
    }

    ${media.widePhone} {
        padding: 0.3rem;
    }
`

const SeriesPageNumber = styled.div`
    color: ${(p) => p.theme.headerFontColor};
    font-size: ${(p) => p.theme.xlg};
    font-weight: 700;

    ${media.widePhone} {
        font-size: ${(p) => p.theme.lg};
        font-weight: 600;
    }
`

const SeriesViewer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    gap: 0.65rem;

    width: 100%;
`

const SERIES_NUMBER_PER_VIEW = 3
const pageUpdate = {
    next: (pageNumber: number, lastPageNumber: number) =>
        pageNumber === lastPageNumber ? pageNumber : pageNumber + 1,
    prev: (pageNumber: number) =>
        pageNumber === 1 ? pageNumber : pageNumber - 1,
}

function CategorySeriesViewer({
    categorySeriesInfoArray,
}: {
    categorySeriesInfoArray: SeriesInfoType[]
}) {
    const [pageNumber, setPageNumber] = useState(1)
    const lastPageNumber = Math.ceil(
        categorySeriesInfoArray.length / SERIES_NUMBER_PER_VIEW
    )
    const isViewControllerNeeded = lastPageNumber !== 1

    return (
        <SeriesLinkContainer>
            <SeriesHeaderContainer>
                <SeriesPageNumber>
                    <p>Series {isViewControllerNeeded && pageNumber}</p>
                </SeriesPageNumber>

                {isViewControllerNeeded && (
                    <ViwerControllerContainer>
                        <ViewerControllButton
                            type="button"
                            aria-label="previous series page"
                            onClick={() =>
                                setPageNumber((num) => pageUpdate.prev(num))
                            }
                            disabled={pageNumber === 1}
                        >
                            <PrevIcon />
                        </ViewerControllButton>
                        <ViewerControllButton
                            type="button"
                            aria-label="previous series page"
                            onClick={() =>
                                setPageNumber((num) =>
                                    pageUpdate.next(num, lastPageNumber)
                                )
                            }
                            disabled={pageNumber === lastPageNumber}
                        >
                            <NextIcon />
                        </ViewerControllButton>
                    </ViwerControllerContainer>
                )}
            </SeriesHeaderContainer>

            <SeriesViewer>
                {categorySeriesInfoArray
                    .slice(
                        (pageNumber - 1) * SERIES_NUMBER_PER_VIEW,
                        pageNumber * SERIES_NUMBER_PER_VIEW
                    )
                    .map((categorySeriesInfo) => (
                        <CategorySeriesLink
                            key={categorySeriesInfo.seriesTitle}
                            {...categorySeriesInfo}
                        />
                    ))}
            </SeriesViewer>
        </SeriesLinkContainer>
    )
}

export default CategorySeriesViewer
