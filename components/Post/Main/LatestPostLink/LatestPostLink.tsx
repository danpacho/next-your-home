import Link from "next/link"
import { useState } from "react"
import styled, { css } from "styled-components"

import { PostMeta } from "@/utils/types/main/meta"
import LatestPostTitle from "@/components/UI/Atoms/UnderscoreText/UnderscoreText"
interface LatestPostLinkButtonStyle {
    order: number
    //* container 첫번째 | 마지막 요소 border~스타일 변경
    isFirst?: boolean
    isLast?: boolean
    color: any
}
const BORDER_WIDTH = "0.1rem"
const latestPostLinkButtonStyle = {
    first: (borderColor: any) => css`
        border-top-right-radius: ${(p) => p.theme.bxxxlg};
        border-left: ${BORDER_WIDTH} solid ${borderColor};
        border-bottom: ${BORDER_WIDTH} solid ${borderColor};
    `,
    middle: (borderColor: any) => css`
        border-radius: 0 ${(p) => p.theme.bxsm} ${(p) => p.theme.bxsm} 0;
        border-left: ${BORDER_WIDTH} solid ${borderColor};
    `,
    last: (borderColor: any) => css`
        border-bottom-right-radius: ${(p) => p.theme.bxxxlg};
        border-left: ${BORDER_WIDTH} solid ${borderColor};
        border-top: ${BORDER_WIDTH} solid ${borderColor};
    `,
}

const LatestPostLinkButton = styled.div<LatestPostLinkButtonStyle>`
    transition: all ease-out 0.25s;

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
`
const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    gap: 0.75rem;
`
const LatestPostPreview = styled.div`
    font-size: ${(p) => p.theme.sm};
    color: ${(p) => p.theme.gray5};
    font-weight: 200;
    line-height: 1.15rem;
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

const STYLE = {
    X: "15px",
    Y: "10px",
    BLUR: "0px",
}
const ORDER_TEXT_SHADOW = `${STYLE.X} ${STYLE.Y} ${STYLE.BLUR}`
const OrderTextStyled = styled.p<OrderTextProp>`
    transition: all cubic-bezier(0.19, 1, 0.22, 1) 0.5s;

    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: 700;
    font-size: 150px;
    color: ${(p) => p.theme.trueDeepDark};

    text-shadow: ${({ color: shadowColor }) =>
        `${ORDER_TEXT_SHADOW} ${shadowColor}`};

    ${({ isHover, color }) =>
        isHover &&
        css`
            color: ${color};
            text-shadow: ${ORDER_TEXT_SHADOW} black;
        `}
`

interface OrderTextProp {
    order: number
    color: any
    isHover: boolean
}
const ORDER_TEXT_ARRAY = ["A", "B", "C", "D", "E"]
const OrderText = ({ order, color, isHover }: OrderTextProp) => {
    return (
        <OrderTextStyled order={order} color={color} isHover={isHover}>
            {ORDER_TEXT_ARRAY[order]}
        </OrderTextStyled>
    )
}

const PostMetaTagContainer = styled.ul`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    gap: 0.35rem;
`
const postMetaTagStyle = {
    category: () => css`
        border-radius: 1px 1.5px 1.5px 8px;
    `,
    update: () => css`
        border-radius: 1px;
    `,
    author: () => css`
        border-radius: 1px 10px 10px 1px;
    `,
}

interface PostMetaTagStyle {
    type: keyof Omit<LatestPostMetaProps, "color">
    color: any
}
const PostMetaTag = styled.li<PostMetaTagStyle>`
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0.15rem 0.65rem;

    background-color: ${({ color }) => color};

    color: ${(p) => p.theme.white};
    font-size: ${(p) => p.theme.sm};
    font-weight: 100;

    ${({ type }) => postMetaTagStyle[type]}
`

interface LatestPostMetaProps
    extends Pick<PostMeta, "category" | "author" | "update" | "color"> {}

const LatestPostMeta = ({
    author,
    category,
    update,
    color,
}: LatestPostMetaProps) => {
    return (
        <PostMetaTagContainer>
            <PostMetaTag type="category" color={color}>
                {category}
            </PostMetaTag>
            <PostMetaTag type="update" color={color}>
                {update}
            </PostMetaTag>
            <PostMetaTag type="author" color={color}>
                {author}
            </PostMetaTag>
        </PostMetaTagContainer>
    )
}

export default LatestPostLink
