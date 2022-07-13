import styled, { css } from "styled-components"
import media from "@styles/utils/media"

import { useState } from "react"

import Link from "next/link"

import { PostMetaType } from "@typing/post/meta"

import { usePointerInteraction } from "@hooks/index"

import PostMeta from "./PostMeta/PostMeta"
import PostOrderText from "./PostOrderText/PostOrderText"

import { UnderscoreText } from "@components/UI/Atoms/UnderscoreText"
import { SizedText } from "@components/UI/Atoms/SizedText"

const POST_LINK_BORDER_WIDTH = "0.1rem"
const postLinkContainerStyle = {
    first: (borderColor: string) => css`
        border-top-right-radius: ${(p) => p.theme.bxxxlg};
        border-left: ${POST_LINK_BORDER_WIDTH} solid ${borderColor};
        border-bottom: ${POST_LINK_BORDER_WIDTH} solid ${borderColor};

        ${media.widePhone} {
            border-top-right-radius: ${(p) => p.theme.bxlg};
        }
    `,
    middle: (borderColor: string) => css`
        border-radius: ${({ theme }) =>
            `${theme.bxxsm} ${theme.bxsm} ${theme.bxxsm} ${theme.bxsm}`};
        border-left: ${POST_LINK_BORDER_WIDTH} solid ${borderColor};
    `,
    last: (borderColor: string) => css`
        border-bottom-right-radius: ${(p) => p.theme.bxxxlg};
        border-left: ${POST_LINK_BORDER_WIDTH} solid ${borderColor};
        border-top: ${POST_LINK_BORDER_WIDTH} solid ${borderColor};

        ${media.widePhone} {
            border-bottom-right-radius: ${(p) => p.theme.bxlg};
        }
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
    transition: box-shadow ease-out 0.25s;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    gap: 1.5rem;

    width: 100%;
    min-height: 9rem;
    height: 9rem;

    padding: 0.25rem 1.5rem;

    background: ${(p) =>
        `${p.theme.containerBackgroundColor}${p.theme.opacity80}`};

    box-shadow: ${(p) => p.theme.shadowSm};

    cursor: pointer;
    user-select: none;

    &:hover {
        box-shadow: 5px 3.5px 0 0
            ${({ color, theme }) => `${color}${theme.themeHexOpacity}`};
        background: ${(p) => p.theme.containerBackgroundColor};
    }

    ${({ color }) => postLinkContainerStyle.middle(color)};
    ${({ isFirst, color }) => isFirst && postLinkContainerStyle.first(color)};
    ${({ isLast, color }) => isLast && postLinkContainerStyle.last(color)};

    ${media.widePhone} {
        position: relative;

        min-height: 8.5rem;
        height: 8.5rem;

        padding: 0.5rem 1rem;

        &:hover {
            box-shadow: none;
        }
    }
`
const PostContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    max-width: 75%;
    min-height: 80%;
    height: fit-content;

    gap: 0.75rem;

    ${media.widePhone} {
        gap: 0.8rem;
        max-width: unset;
        height: 100%;
        justify-content: center;
    }
`

const PostPreview = styled.div`
    font-size: ${(p) => p.theme.sm};
    color: ${(p) => p.theme.descriptionFontColor};
    font-weight: 400;
    line-height: 1.15rem;

    ${media.widePhone} {
        line-height: 1.05rem;
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
                {...usePointerInteraction({
                    pointerStateSetter: setIsHover,
                })}
            >
                <PostContentContainer>
                    <UnderscoreText
                        isHover={isHover}
                        fontSize="lg"
                        fontWeight={400}
                        underscoreColor={color}
                    >
                        <SizedText lineHeight={1.5} defaultLineNumber={1}>
                            {title}
                        </SizedText>
                    </UnderscoreText>

                    <PostPreview>
                        <SizedText
                            defaultLineNumber={3}
                            mediumPhone={2}
                            lineHeight={1.1}
                        >
                            {preview}
                        </SizedText>
                    </PostPreview>
                    <PostMeta
                        author={author}
                        category={category}
                        color={color}
                        update={update}
                        tags={tags}
                        isCategoryPage={isCategoryPage}
                    />
                </PostContentContainer>
                <PostOrderText order={order} color={color} isHover={isHover} />
            </PostLinkContainer>
        </Link>
    )
}

export default PostLink
