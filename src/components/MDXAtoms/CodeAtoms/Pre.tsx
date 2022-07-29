import styled from "styled-components"
import zIndexes from "@styles/utils/zIndex"
import media from "@styles/utils/media"
import { iconStyle } from "@styles/utils/icon.style"

import { useState } from "react"

import Link from "next/link"

import { ColorProps, IsLight } from "@typing/theme"
import { SeriesInfoType } from "@typing/post/series"

import { useColorSet, usePointerInteraction, useThemeMode } from "@hooks/index"

import { SizedText } from "@components/UI/Atoms/SizedText"
import { BookmarkIcon, NextIcon, PrevIcon } from "@components/UI/Atoms/Icons"

const PostSeriesContainer = styled.div<ColorProps>`
    transition: border-color 0.1s ease-out;

    position: relative;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    gap: 1.5rem;

    width: 100%;

    margin-top: 2rem;
    padding: 1.5rem;

    border-width: 0.1rem;
    border-style: solid;
    border-color: ${({ _color, theme }) => `${_color}${theme.opacity20}`};
    border-radius: ${(p) => p.theme.bsm};

    overflow: hidden;

    &:hover {
        border-color: ${(p) => p._color};
    }

    ${media.widePhone} {
        width: 85%;

        margin-top: 1rem;
        border-color: ${(p) => p._color};

        padding: 1rem;
    }
`

const PostSeriesHeader = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 100%;

    z-index: ${zIndexes.zContnet};
`

const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    gap: 1rem;

    ${media.widePhone} {
        width: 100%;
        justify-content: space-between;
    }
`
const SeriesTitle = styled.div`
    font-weight: 600;
    font-size: ${(p) => p.theme.xlg};

    color: ${(p) => p.theme.fontColor};

    padding: 0.25rem;

    user-select: none;

    ${media.widePhone} {
        font-size: ${(p) => p.theme.lg};
    }
`

const SeriesLinkButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0 0.25rem;

    ${iconStyle.md()};
`

const PostSeriesLinkContainer = styled.ol`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    gap: 0.5rem;

    z-index: ${zIndexes.zContnet};
`

interface SeriesLinkStyle {
    color: string
    focusedPost: boolean
}
const SeriesLink = styled.li<SeriesLinkStyle & IsLight>`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;

    padding: 0.25rem;
    padding-right: 0.4rem;

    border: 0.1rem solid transparent;
    border-radius: ${(p) => p.theme.bxsm};

    color: ${(p) => p.theme.fontColor};
    font-size: ${(p) => p.theme.md};
    font-weight: ${(p) => (p.focusedPost ? 600 : 400)};

    background-color: ${({ focusedPost, theme, color, isLight }) =>
        focusedPost
            ? `${color}${isLight ? theme.opacity10 : theme.opacity30}`
            : "transparent"};

    cursor: pointer;
    user-select: none;

    &:hover {
        border-color: ${(p) => p.color};
    }

    ${media.widePhone} {
        font-size: ${(p) => p.theme.sm};
    }
`
const Box = styled.div<ColorProps & IsLight>`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 2rem;

    background-color: ${({ theme, _color, isLight }) =>
        `${_color}${isLight ? theme.opacity10 : theme.opacity30}`};

    border-radius: ${(p) => p.theme.bsm};
    border: 0.1rem solid transparent;

    color: ${(p) => p.theme.fontColor};
    font-weight: 600;
    font-size: ${(p) => p.theme.sm};
`

const ButtonBox = styled(Box)`
    gap: 0;
    cursor: pointer;
    user-select: none;

    &:hover {
        border-color: ${(p) => p._color};
    }

    ${media.widePhone} {
        display: none;
    }
`

const BookmarkBox = styled(Box)`
    gap: 0.25rem;
    padding: 0.2rem 0.3rem;

    ${(p) => iconStyle.md({ color: p.color })};

    ${media.widePhone} {
        height: fit-content;
        font-weight: 500;
        padding: 0.15rem 0.3rem;
        border-color: ${(p) => p.color};
    }
`

interface CircleStyle {
    isHover: boolean
    pos: {
        top?: string
        bottom?: string
        left?: string
        right?: string
    }
    radius: number
    startColor: string
    endColor: string
    gradientDegree: number
    transformationOnHover: string
}

const BackgroundCircle = styled.div<CircleStyle>`
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    position: absolute;
    top: ${(p) => p.pos?.top ?? "unset"};
    bottom: ${(p) => p.pos?.bottom ?? "unset"};
    left: ${(p) => p.pos?.left ?? "unset"};
    right: ${(p) => p.pos?.right ?? "unset"};

    width: ${(p) => p.radius}rem;
    height: ${(p) => p.radius}rem;
    border-radius: ${(p) => p.theme.bRound};

    background-image: ${({ startColor, endColor, gradientDegree }) =>
        `linear-gradient(${gradientDegree}deg, ${startColor}, ${endColor})`};

    transform: ${({ isHover, transformationOnHover }) =>
        isHover ? transformationOnHover : "none"};
    transform-style: flat;

    user-select: none;
    pointer-events: none;

    ${media.custom(500)} {
        display: none;
    }
`

interface PostSeriesProps extends SeriesInfoType {
    currentTitle: string
}
function PostSeries({
    currentTitle,
    seriesTitle,
    seriesInfo,
}: PostSeriesProps) {
    const { isLight } = useThemeMode()
    const [isHover, setIsHover] = useState(false)

    const currentOrder = seriesInfo.findIndex(
        ({ postTitle }) => postTitle === currentTitle
    )

    const { color, prevUrl, nextUrl } = seriesInfo[currentOrder]
    const { light, dark } = useColorSet(color)
    const isPrevExists = prevUrl !== null
    const isNextExists = nextUrl !== null

    const numberOfSeries = seriesInfo.length

    return (
        <PostSeriesContainer
            _color={color}
            {...usePointerInteraction({
                pointerStateSetter: setIsHover,
            })}
        >
            <PostSeriesHeader>
                <TitleContainer>
                    <SeriesTitle>{seriesTitle}</SeriesTitle>
                    <BookmarkBox _color={color} isLight={isLight}>
                        <BookmarkIcon fill={color} />
                        <p>
                            {numberOfSeries} / {currentOrder + 1}
                        </p>
                    </BookmarkBox>
                </TitleContainer>

                <ButtonBox _color={color} isLight={isLight}>
                    {isPrevExists && (
                        <Link passHref href={seriesInfo[currentOrder].prevUrl!}>
                            <SeriesLinkButton
                                type="button"
                                aria-label="prev series"
                            >
                                <PrevIcon />
                            </SeriesLinkButton>
                        </Link>
                    )}
                    {isPrevExists && isNextExists && "/"}
                    {isNextExists && (
                        <Link passHref href={seriesInfo[currentOrder].nextUrl!}>
                            <SeriesLinkButton
                                type="button"
                                aria-label="next series"
                            >
                                <NextIcon />
                            </SeriesLinkButton>
                        </Link>
                    )}
                </ButtonBox>
            </PostSeriesHeader>

            <PostSeriesLinkContainer>
                {seriesInfo.map(({ order, url, postTitle }) => (
                    <Link passHref href={url} key={postTitle}>
                        <SeriesLink
                            color={color}
                            isLight={isLight}
                            focusedPost={postTitle === currentTitle}
                        >
                            <SizedText defaultLineNumber={1} lineHeight={1}>
                                {order}. {postTitle}
                            </SizedText>
                        </SeriesLink>
                    </Link>
                ))}
            </PostSeriesLinkContainer>

            <BackgroundCircle
                isHover={isHover}
                pos={{
                    top: "-1.5rem",
                    left: "-1.5rem",
                }}
                radius={3}
                startColor={isLight ? light.middle : dark.middle}
                endColor={isLight ? light.low : dark.low}
                gradientDegree={30}
                transformationOnHover="scaleX(1.75) scaleY(1.5)"
            />
            <BackgroundCircle
                isHover={isHover}
                pos={{
                    bottom: "-2.5rem",
                    right: "-2.5rem",
                }}
                radius={5}
                gradientDegree={135}
                startColor={isLight ? light.low : dark.low}
                endColor={isLight ? light.high : dark.high}
                transformationOnHover="scale(2.5)"
            />
        </PostSeriesContainer>
    )
}

export default PostSeries
