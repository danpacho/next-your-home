import styled, { css } from "styled-components"
import animation from "@styles/utils/animation"
import media from "@styles/utils/media"
import { iconStyle } from "@styles/utils/icon.style"

import Link from "next/link"

import { IsLight } from "@typing/theme"
import { PostControllerType as PostControllerPreviewProps } from "@typing/post/content"

import { useScrollDirection, useThemeMode } from "@hooks/index"

import { SizedText } from "@components/UI/Atoms/SizedText"
import { HomeIcon, NextIcon, PrevIcon } from "@components/UI/Atoms/Icons"

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
    z-index: ${(p) => p.theme.zModal};

    ${media.widePhone} {
        width: 85%;
        padding: 0.5rem;
        gap: 0.25rem;

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
    transition: border-color ease-out 0.25s;

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
        border-color: ${({ theme }) => theme.fontColor};
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

    gap: 1.5rem;

    ${media.widePhone} {
        display: flex;
        gap: 0.25rem;
    }

    ${media.mediumPhone} {
        display: flex;
        gap: 0.5rem;
    }
`

const PostTitleText = styled.div<IsLight>`
    transition: all ease-out 0.25s;

    max-width: 10rem;
    min-width: 10rem;

    font-size: ${(p) => p.theme.sm};
    font-weight: 500;
    color: ${(p) => p.theme.gray5};
    letter-spacing: -0.1px;

    padding: 0.1rem 0;

    margin: 0 0.25rem;

    border-bottom: 0.1rem solid transparent;

    &:hover {
        border-color: ${({ theme }) => theme.fontColor};
        color: ${({ theme }) => theme.fontColor};
    }

    cursor: pointer;

    ${media.widePhone} {
        font-size: ${(p) => p.theme.xsm};

        padding: 0;

        border-bottom: none;

        max-width: 5rem;
        min-width: unset;
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
    const { isLight } = useThemeMode()
    const { isScrollDown } = useScrollDirection({
        throttleTime: 200,
        responsivenessPixel: 2.5,
    })

    return (
        <ControllerContainer isScrollDown={isScrollDown}>
            <Link href={prevPost.postUrl} passHref>
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
                        <SizedText
                            defaultLineNumber={2}
                            lineHeight={0.85}
                            align="center"
                        >
                            {prevPost.title}
                        </SizedText>
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
                        <SizedText
                            defaultLineNumber={2}
                            lineHeight={0.85}
                            align="center"
                        >
                            {nextPost.title}
                        </SizedText>
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
