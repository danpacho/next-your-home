import { PostController as PostControllerPreviewProps } from "@/utils/types/main/postContent"

import SvgHome from "@/components/UI/Atoms/Icons/Home"
import SvgNext from "@/components/UI/Atoms/Icons/Next"
import SvgPrev from "@/components/UI/Atoms/Icons/Prev"

import styled, { css } from "styled-components"
import animation from "@/styles/utils/animation"
import media from "@/styles/utils/media"
import { shadow } from "@/styles/utils/shadow"

import { useEffect, useState } from "react"
import Link from "next/link"
import { sliceTextByMaxLength } from "@/utils/function/text"

const ControllerContainer = styled.div<IsHover>`
    transition: width cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.35s;

    position: fixed;
    bottom: 1.5rem;
    left: 50%;
    transform: translate(-50%, -1.5rem);

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;

    background-color: ${(p) => p.theme.white}D8;
    backdrop-filter: blur(15px);
    box-shadow: ${shadow.shadowXlg};
    border-radius: 50rem;
    padding: 0.65rem;
    border: 0.1rem solid ${(p) => p.theme.gray2};

    width: ${({ isHover }) => (isHover ? "29rem" : "2.75rem")};
    min-width: 2.75rem;

    ${media.widePhone} {
        width: 83.5%;
        padding: 0.5rem;
        gap: 0.25rem;

        justify-content: space-between;
        background-color: ${(p) => p.theme.white};
        backdrop-filter: unset;

        bottom: 0.75rem;
        left: 50%;
        transform: translate(-50%, -0.75rem);
    }
`

const ControllerButtonStyle = {
    prev: css`
        border-radius: ${(p) => p.theme.bRound};
    `,
    next: css`
        border-radius: ${(p) => p.theme.bRound};
    `,
    home: css`
        border-radius: ${(p) => p.theme.bxlg};
    `,
}

interface ControllerButtonType {
    buttonType: keyof typeof ControllerButtonStyle
}

interface IsHover {
    isHover: boolean
}

const ControllerButton = styled.button<ControllerButtonType>`
    transition: all ease-out 0.25s;

    display: flex;
    align-items: center;
    justify-content: center;

    height: 2.5rem;
    width: 2.5rem;
    min-width: 2.5rem;
    padding: 0.25rem;

    background-color: ${(p) => p.theme.gray1};

    border: 0.1rem solid ${(p) => p.theme.gray3};

    &:hover {
        background-color: ${(p) => p.theme.gray2};
        border-color: ${(p) => p.theme.gray5};
    }

    ${({ buttonType }) => ControllerButtonStyle[buttonType]};

    ${media.widePhone} {
        width: 2rem;
        height: 2rem;
        min-width: 2rem;
        min-height: 2rem;
    }
`
const InfoContainer = styled.div<IsHover>`
    transition: opacity cubic-bezier(0.075, 0.82, 0.165, 1) 1.5s;

    display: ${({ isHover }) => (isHover ? "flex" : "none")};
    flex-direction: row;
    align-items: center;
    justify-content: center;

    animation: ${animation.fadeIn} 0.85s;

    ${media.widePhone} {
        display: flex;
        gap: 0.25rem;
    }

    ${media.mediumPhone} {
        display: flex;
        gap: 0.5rem;
    }
`

const PostTitleText = styled.p`
    transition: color, border ease-out 0.25s;
    min-width: 10rem;
    color: ${(p) => p.theme.gray5};
    font-weight: 600;
    font-size: ${(p) => p.theme.xsm};

    text-align: center;

    padding-top: 0.35rem;
    padding-bottom: 0.1rem;
    border-bottom: 0.25rem solid transparent;
    margin: 0 0.25rem;

    &:hover {
        border-color: ${(p) => p.theme.gray3};
        color: ${(p) => p.theme.gray7};
    }

    cursor: pointer;

    ${media.widePhone} {
        min-width: unset;
        width: 5rem;
        padding: 0;
        border-bottom: none;

        font-weight: 400;
    }

    ${media.mediumPhone} {
        min-width: unset;
        width: 3.5rem;
    }
`

interface PostControllerProps extends PostControllerPreviewProps {
    homeUrl: string
}

const TITLE_MAX_LENGTH = 15

function PostController({ prevPost, nextPost, homeUrl }: PostControllerProps) {
    const [isHover, setIsHover] = useState(true)

    const prevPostTitle = sliceTextByMaxLength(prevPost.title, TITLE_MAX_LENGTH)
    const nextPostTitle = sliceTextByMaxLength(nextPost.title, TITLE_MAX_LENGTH)

    useEffect(() => {
        const setHoverFalseAfterSecond = setTimeout(
            () => setIsHover(false),
            5000
        )
        return () => clearTimeout(setHoverFalseAfterSecond)
    }, [])

    return (
        <ControllerContainer
            isHover={isHover}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <InfoContainer isHover={isHover}>
                <Link href={prevPost.postUrl} passHref>
                    <ControllerButton buttonType="prev">
                        <SvgPrev width="1rem" height="1rem" />
                    </ControllerButton>
                </Link>
                <Link href={prevPost.postUrl} passHref>
                    <PostTitleText>{prevPostTitle}</PostTitleText>
                </Link>
            </InfoContainer>

            <Link href={homeUrl} passHref>
                <ControllerButton buttonType="home">
                    <SvgHome width="1rem" height="1rem" />
                </ControllerButton>
            </Link>

            <InfoContainer isHover={isHover}>
                <Link href={nextPost.postUrl} passHref>
                    <PostTitleText>{nextPostTitle}</PostTitleText>
                </Link>
                <Link href={nextPost.postUrl} passHref>
                    <ControllerButton buttonType="next">
                        <SvgNext width="1rem" height="1rem" />
                    </ControllerButton>
                </Link>
            </InfoContainer>
        </ControllerContainer>
    )
}

export default PostController
