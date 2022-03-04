import Link from "next/link"
import { useState } from "react"

import styled, { css } from "styled-components"
import media from "@/styles/utils/media"

import { PostMeta } from "@/utils/types/main/meta"

import LatestPostTitle from "@/components/UI/Atoms/UnderscoreText/UnderscoreText"
import LatestPostMeta from "./LatestPostMeta/LatestPostMeta"
import OrderText from "./OrderText/OrderText"

const BORDER_WIDTH = "0.1rem"
const latestPostLinkButtonStyle = {
    first: (borderColor: string) => css`
        border-top-right-radius: ${(p) => p.theme.bxxxlg};
        border-left: ${BORDER_WIDTH} solid ${borderColor};
        border-bottom: ${BORDER_WIDTH} solid ${borderColor};
    `,
    middle: (borderColor: string) => css`
        border-radius: 0 ${(p) => p.theme.bxsm} ${(p) => p.theme.bxsm} 0;
        border-left: ${BORDER_WIDTH} solid ${borderColor};
    `,
    last: (borderColor: string) => css`
        border-bottom-right-radius: ${(p) => p.theme.bxxxlg};
        border-left: ${BORDER_WIDTH} solid ${borderColor};
        border-top: ${BORDER_WIDTH} solid ${borderColor};
    `,
}

interface LatestPostLinkButtonStyle {
    order: number
    color: string
    //* container 첫번째 | 마지막 요소 border~스타일 변경
    isFirst?: boolean
    isLast?: boolean
}

const LatestPostLinkButton = styled.div<LatestPostLinkButtonStyle>`
    transition: background-color, box-shadow ease-out 0.25s;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    gap: 2.5rem;

    padding: 0.25rem 1.5rem;

    width: min(30rem, 85%);
    height: 8.75rem;

    background-color: ${(p) => p.theme.white};
    ${({ color }) => latestPostLinkButtonStyle.middle(color)};

    ${({ isFirst, color }) =>
        isFirst && latestPostLinkButtonStyle.first(color)};

    ${({ isLast, color }) => isLast && latestPostLinkButtonStyle.last(color)};

    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
    user-select: none;

    &:hover {
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }

    ${media.widePhone} {
        height: 8rem;

        gap: 0.5rem;
        padding: 0.5rem 1rem;

        &:hover {
            box-shadow: none;
        }
    }
`
const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    height: fit-content;
    gap: 0.75rem;

    ${media.widePhone} {
        gap: 0.5rem;
    }
`

const LatestPostPreview = styled.div`
    font-size: ${(p) => p.theme.sm};
    color: ${(p) => p.theme.gray5};
    font-weight: 200;
    line-height: 1.15rem;

    ${media.widePhone} {
        color: ${(p) => p.theme.gray6};

        font-weight: 300;
        line-height: 1rem;
    }
`

interface LatestProps extends PostMeta, LatestPostLinkButtonStyle {}

function LatestPostLink({
    order,
    preview,
    title,
    category,
    update,
    author,
    color,
    postUrl,
    isFirst,
    isLast,
}: LatestProps) {
    const [isHover, setIsHover] = useState<boolean>(false)
    return (
        <LatestPostLinkButton
            color={color}
            order={order}
            isFirst={isFirst}
            isLast={isLast}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onTouchStart={() => setIsHover(true)}
            onTouchEnd={() => setIsHover(false)}
        >
            <Link href={postUrl} passHref>
                <ContentContainer>
                    <LatestPostTitle
                        isHover={isHover}
                        fontColor="gray8"
                        fontSize="lg"
                        fontWeight={200}
                        underscoreColor={color}
                    >
                        {title}
                    </LatestPostTitle>
                    <LatestPostPreview>{preview}</LatestPostPreview>
                    <LatestPostMeta
                        author={author}
                        category={category}
                        color={color}
                        update={update}
                    />
                </ContentContainer>
            </Link>
            <OrderText order={order} color={color} isHover={isHover} />
        </LatestPostLinkButton>
    )
}

export default LatestPostLink
