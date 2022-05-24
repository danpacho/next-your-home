import styled, { css } from "styled-components"
import media from "@styles/utils/media"

import Link from "next/link"

import { IsLight } from "@typing/theme"
import { PostMetaType } from "@typing/post/meta"

import { sliceTextByMaxLength } from "@utils/function/text"

import { LayersAltIcon } from "@components/UI/Atoms/Icons"
import { useSlector, _slector } from "@lib/recoil"

const PostMetaTagContainer = styled.ul`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    gap: 0.35rem;
`
const postMetaTagStyle = {
    category: () => css`
        border-radius: ${({ theme }) =>
            `${theme.bxxsm} ${theme.bxxsm} ${theme.bxxsm} ${theme.blg}`};
        ${media.widePhone} {
            border-radius: ${({ theme }) =>
                `${theme.bxxsm} ${theme.bxxsm} ${theme.bxxsm} ${theme.bsm}`};
        }
    `,
    update: () => css`
        border-radius: ${(p) => p.theme.bxxsm};
    `,
    author: () => css`
        border-radius: ${({ theme }) =>
            `${theme.bxxsm} ${theme.blg} ${theme.blg} ${theme.bxxsm}`};
        ${media.widePhone} {
            border-radius: ${({ theme }) =>
                `${theme.bxxsm} ${theme.bsm} ${theme.bsm} ${theme.bxxsm}`};
        }
    `,
}

interface PostMetaTagStyle {
    type: keyof Omit<PostMetaProps, "color" | "tags" | "isCategoryPage">
    color: string
}
const PostMetaTag = styled.li<PostMetaTagStyle & IsLight>`
    transition: background-color 0.25s ease-out;

    display: flex;
    align-items: center;
    justify-content: center;

    width: max-content;

    padding: 0.15rem 0.65rem;

    background-color: ${({ color, isLight, theme }) =>
        isLight ? color : `${color}${theme.opacity60}`};

    color: ${(p) => p.theme.white};
    font-size: ${(p) => p.theme.sm};
    font-weight: 300;

    &:hover {
        background-color: ${({ color, isLight, theme }) =>
            isLight ? `${color}${theme.opacity60}` : color};
    }

    ${({ type }) => postMetaTagStyle[type]}

    ${media.mediumTablet} {
        font-size: ${(p) => p.theme.xsm};
        padding: 0.15rem 0.45rem;
    }

    ${media.widePhone} {
        font-size: ${(p) => p.theme.xsm};
        font-weight: 400;

        padding: 0.15rem 0.25rem;

        width: auto;
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
`

interface PostMetaProps
    extends Pick<
        PostMetaType,
        "category" | "author" | "update" | "color" | "tags"
    > {
    isCategoryPage?: boolean
}

const LAST_TAG_ORDER = 1
const TAG_NUMBER = 2

function PostMeta({
    author,
    category,
    update,
    color,
    tags,
    isCategoryPage,
}: PostMetaProps) {
    const isTagSizeOver = tags.length > 2
    const { isLightState: isLight } = useSlector(_slector("isLight"))
    return (
        <PostMetaTagContainer>
            {isCategoryPage &&
                tags.slice(0, TAG_NUMBER).map((tag, order) => (
                    <PostMetaTag
                        key={tag}
                        type={order === LAST_TAG_ORDER ? "update" : "category"}
                        color={color}
                        isLight={isLight}
                    >
                        <p>
                            #{tag}
                            {order === LAST_TAG_ORDER && isTagSizeOver && (
                                <LayersAltIcon
                                    fill={"white"}
                                    width=".65rem"
                                    height=".65rem"
                                />
                            )}
                        </p>
                    </PostMetaTag>
                ))}

            {!isCategoryPage && (
                <Link href={`/${category}`} passHref>
                    <PostMetaTag
                        type="category"
                        color={color}
                        isLight={isLight}
                    >
                        {sliceTextByMaxLength(category, 8)}
                    </PostMetaTag>
                </Link>
            )}
            {!isCategoryPage && (
                <PostMetaTag type="update" color={color} isLight={isLight}>
                    {update}
                </PostMetaTag>
            )}
            <Link href="/profile" passHref>
                <PostMetaTag type="author" color={color} isLight={isLight}>
                    {author}
                </PostMetaTag>
            </Link>
        </PostMetaTagContainer>
    )
}

export default PostMeta
