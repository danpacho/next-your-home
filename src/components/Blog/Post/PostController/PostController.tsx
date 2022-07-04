import styled, { css } from "styled-components"
import animation from "@styles/utils/animation"
import media from "@styles/utils/media"
import { iconStyle } from "@styles/utils/icon.style"

import Link from "next/link"

import { IsLight } from "@typing/theme"
import { PostControllerType as PostControllerPreviewProps } from "@typing/post/content"

import {
    useScrollDirection,
    useWindowWidth,
    useSizedTextByWindowWidth,
} from "@hooks/index"

import { HomeIcon, NextIcon, PrevIcon } from "@components/UI/Atoms/Icons"

import { useAtoms, _slector } from "@lib/jotai"

const ControllerContainer = styled.div<{ isScrollDown: boolean }>`
    transition: transform cubic-bezier(0.39, 0.575, 0.565, 1) 0.6s;
    width: 35rem;
    min-width: 4rem;

    position: fixed;
    bottom: 1.5rem;
    left: 50%;
    transform: translate(-50%, ${(p) => (p.isScrollDown ? "8rem" : "-1.5rem")});

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    background-color: ${(p) => p.theme.containerBackgroundColor};

    padding: 0.65rem;

    box-shadow: ${(p) => p.theme.shadowXxlg};

    border: 0.1rem solid ${(p) => p.theme.containerBorderColor};
    border-radius: 10rem;

    animation: ${animation.fadeIn} ease-out 1s;

    ${media.widePhone} {
        width: 85%;
        padding: 0.5rem;
        gap: 0.25rem;

        justify-content: space-between;
        background-color: ${(p) => p.theme.containerBackgroundColor};

        bottom: 0.75rem;
        left: 50%;
        transform: translate(-50%, ${(p) => (p.isScrollDown ? "5rem" : 0)});
    }
`

const ControllerButtonStyle = {
    prev: css`
        border-radius: ${(p) => p.theme.bRound};
    `,
    next: css`
        border-radius: ${(p) => p.theme.bRound};
    `,
    category: css`
        border-radius: ${(p) => p.theme.bxlg};
    `,
}

interface ControllerButtonType {
    buttonType: keyof typeof ControllerButtonStyle
}

const ControllerButton = styled.button<ControllerButtonType & IsLight>`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 2.5rem;
    width: 2.5rem;
    min-width: 2.5rem;
    padding: 0.25rem;

    background-color: ${({ theme, isLight }) =>
        isLight ? theme.gray1 : theme.trueDeepDark};
    border: 0.1rem solid ${(p) => p.theme.containerBorderColor};

    ${iconStyle.md()}

    &:hover {
        background-color: ${({ theme, isLight }) =>
            isLight ? theme.gray2 : theme.deepDark};
        border-color: ${({ theme }) => theme.gray5};
    }

    ${({ buttonType }) => ControllerButtonStyle[buttonType]};

    ${media.widePhone} {
        width: 2rem;
        height: 2rem;
        min-width: 2rem;
        min-height: 2rem;
    }
`
const InfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    gap: 0.5rem;

    ${media.widePhone} {
        display: flex;
        gap: 0.25rem;
    }

    ${media.mediumPhone} {
        display: flex;
        gap: 0.5rem;
    }
`

const PostTitleText = styled.p<IsLight>`
    transition: color, border ease-out 0.25s;
    min-width: 10rem;

    color: ${(p) => p.theme.gray5};
    font-weight: 600;
    font-size: ${(p) => p.theme.xsm};
    text-align: center;

    padding-top: 0.35rem;
    padding-bottom: 0.1rem;

    margin: 0 0.25rem;

    border-bottom: 0.25rem solid transparent;

    &:hover {
        border-color: ${({ theme, isLight }) =>
            isLight ? theme.gray3 : theme.gray5};
        color: ${({ theme, isLight }) => isLight && theme.gray7};
    }

    cursor: pointer;

    ${media.widePhone} {
        min-width: unset;
        width: 10rem;

        font-weight: 400;

        padding: 0;

        border-bottom: none;
    }

    ${media.custom(600)} {
        width: 5rem;
    }

    ${media.mediumPhone} {
        width: 3.5rem;
    }
`

interface PostControllerProps extends PostControllerPreviewProps {
    categoryURL: string
}

function PostController({
    prevPost,
    nextPost,
    categoryURL,
}: PostControllerProps) {
    const { isLightState: isLight } = useAtoms(_slector("isLight"))

    const { isScrollDown } = useScrollDirection({
        throttleTime: 200,
        responsivenessPixel: 2.5,
    })

    const { mediaWidth } = useWindowWidth()
    const prevPostTitle = useSizedTextByWindowWidth({
        text: prevPost.title,
        option: {
            widePhone: 25,
            mediumPhone: 15,
        },
        mediaWidth,
    })
    const nextPostTitle = useSizedTextByWindowWidth({
        text: nextPost.title,
        option: {
            widePhone: 20,
            mediumPhone: 15,
        },
        mediaWidth,
    })

    return (
        <ControllerContainer isScrollDown={isScrollDown}>
            <Link href={prevPost.postUrl} passHref scroll={false}>
                <InfoContainer>
                    <ControllerButton
                        buttonType="prev"
                        type="button"
                        aria-label="previous post"
                        isLight={isLight}
                    >
                        <PrevIcon width="18px" height="18px" />
                    </ControllerButton>
                    <PostTitleText isLight={isLight}>
                        {prevPostTitle}
                    </PostTitleText>
                </InfoContainer>
            </Link>

            <Link href={categoryURL} passHref>
                <ControllerButton
                    buttonType="category"
                    type="button"
                    aria-label="back to category"
                    isLight={isLight}
                >
                    <HomeIcon width="18px" height="18px" />
                </ControllerButton>
            </Link>

            <Link href={nextPost.postUrl} passHref>
                <InfoContainer>
                    <PostTitleText isLight={isLight}>
                        {nextPostTitle}
                    </PostTitleText>
                    <ControllerButton
                        buttonType="next"
                        type="button"
                        aria-label="next post"
                        isLight={isLight}
                    >
                        <NextIcon width="18px" height="18px" />
                    </ControllerButton>
                </InfoContainer>
            </Link>
        </ControllerContainer>
    )
}

export default PostController
