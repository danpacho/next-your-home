import Link from "next/link"
import { useState } from "react"

import styled, { css } from "styled-components"
import media from "@/styles/utils/media"

import { PostMetaType } from "@/types/post/meta"

import PostTitle from "@/components/UI/Atoms/UnderscoreText/UnderscoreText"
import PostMeta from "./PostMeta/PostMeta"
import PostOrderText from "./PostOrderText/PostOrderText"
import { sliceTextByMaxLength } from "@/utils/function/text"

const BORDER_WIDTH = "0.1rem"
const postLinkContainerStyle = {
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

interface PostLinkContainerStyle {
    order: number
    color: string
    //* container 첫번째 | 마지막 요소 border~스타일 변경
    isFirst?: boolean
    isLast?: boolean
}

const PostLinkContainer = styled.div<PostLinkContainerStyle>`
    transition: background-color, box-shadow ease-out 0.25s;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    gap: 2.5rem;

    width: min(30rem, 85%);
    min-height: 8.75rem;
    height: 8.75rem;

    padding: 0.25rem 1.5rem;

    background-color: ${(p) => `${p.theme.white}${p.theme.opacity70}`};
    backdrop-filter: blur(15px);

    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
    &:hover {
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }

    user-select: none;

    ${({ color }) => postLinkContainerStyle.middle(color)};
    ${({ isFirst, color }) => isFirst && postLinkContainerStyle.first(color)};
    ${({ isLast, color }) => isLast && postLinkContainerStyle.last(color)};

    ${media.mediumTablet} {
        gap: 0.5rem;
    }

    ${media.widePhone} {
        min-height: 8rem;
        height: 8rem;

        padding: 0.5rem 1rem;

        background-color: ${(p) => `${p.theme.white}${p.theme.opacity90}`};
        backdrop-filter: unset;

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

    min-height: 80%;
    height: fit-content;

    gap: 0.75rem;

    ${media.widePhone} {
        gap: 0.5rem;
    }
`

const PostPreview = styled.div`
    font-size: ${(p) => p.theme.sm};
    color: ${(p) => p.theme.gray6};
    font-weight: 200;
    line-height: 1.15rem;

    ${media.widePhone} {
        color: ${(p) => p.theme.gray7};

        font-weight: 300;
        line-height: 1rem;
    }
`

interface PostLinkProps extends PostMetaType, PostLinkContainerStyle {
    isCategoryPage?: boolean
}

function PostLink({
    order,
    preview,
    title,
    category,
    update,
    author,
    color,
    tags,
    postUrl,
    isFirst,
    isLast,
    isCategoryPage,
}: PostLinkProps) {
    const [isHover, setIsHover] = useState<boolean>(false)
    return (
        <Link href={postUrl} passHref>
            <PostLinkContainer
                color={color}
                order={order}
                isFirst={isFirst}
                isLast={isLast}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                <ContentContainer>
                    <PostTitle
                        isHover={isHover}
                        fontColor="trueDeepDark"
                        fontSize="lg"
                        fontWeight={200}
                        underscoreColor={color}
                    >
                        {title}
                    </PostTitle>
                    <PostPreview>
                        {sliceTextByMaxLength(preview, 60)}
                    </PostPreview>
                    <PostMeta
                        author={author}
                        category={category}
                        color={color}
                        update={update}
                        tags={tags}
                        isCategoryPage={isCategoryPage}
                    />
                </ContentContainer>
                <PostOrderText order={order} color={color} isHover={isHover} />
            </PostLinkContainer>
        </Link>
    )
}

export default PostLink
