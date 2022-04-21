import styled, { css } from "styled-components"
import shadow from "@/styles/utils/shadow"
import media from "@/styles/utils/media"

import { useEffect } from "react"

import { GetStaticPaths, GetStaticProps } from "next"
import Link from "next/link"

import { ParsedUrlQuery } from "querystring"

import { SpecificPostContentType } from "@/types/post/content"
import { PostMetaType } from "@/types/post/meta"
import { PageType } from "@/types/page/type"

import { useStateFocusingPageColor } from "@/lib/atoms/pageColor/pageColor.state"

import {
    getSpecificPostContent,
    getCategoryPostContentPathArray,
} from "@/utils/function/blog-contents-loader/contents/getCategoryPost"

import { IsLight } from "@/types/theme"
import { useThemeIsLight } from "@/hooks"

import {
    ArrowUpIcon,
    EditIcon,
    FlagFillIcon,
    LeafIcon,
    QuoteIcon,
} from "@/components/UI/Atoms/Icons"

import {
    PostController,
    PostMDXCompiler,
    PostTableOfContent,
} from "@/components/Blog/Post"

const PostContainer = styled.div<IsLight>`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;

    width: 69.5%;

    background-color: ${(p) =>
        `${p.theme.containerBackgroundColor}${p.theme.opacity40}`};
    backdrop-filter: blur(25px);

    box-shadow: ${(p) =>
        p.isLight ? shadow.shadowSm : `0px 0px 2px 0px ${p.theme.gray7}`};

    border-radius: ${(p) => p.theme.blg};

    padding: 0.25rem 0.5rem;

    margin-bottom: 1.5rem;

    ${media.wideTablet} {
        padding-right: 1.5rem;
    }

    ${media.mediumTablet} {
        width: 83.5%;
        padding-right: 0;
        justify-content: center;
    }

    ${media.widePhone} {
        width: 95%;

        background-color: transparent;
        backdrop-filter: unset;

        padding: 0 0.25rem;
        box-shadow: none;
    }
`

const PostContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-direction: column;

    min-width: 60%;
    max-width: 67.5%;

    min-height: max-content;
    height: fit-content;
    margin: 2.5rem 2rem;

    ${media.wideTablet} {
        max-width: 57.5%;
    }

    ${media.mediumTablet} {
        min-width: unset;
        max-width: unset;
        width: 85%;
    }

    ${media.widePhone} {
        flex: none;
        width: 100%;
        margin-top: 1.5rem;
        margin-bottom: 3.5rem;
    }
`

const TableOfContentPositionContainer = styled.div`
    position: sticky;
    top: 6rem;

    margin-right: 2rem;

    margin-top: 6rem;
    ${media.smallScreen} {
        margin-right: 0.5rem;
    }

    ${media.mediumTablet} {
        display: none;
    }
`

interface PostProps extends SpecificPostContentType {}
function Post({ postController, postMeta, postSource }: PostProps) {
    const [_, setFocusingPageColor] = useStateFocusingPageColor()
    useEffect(
        () => setFocusingPageColor(postMeta.color),
        [setFocusingPageColor, postMeta.color]
    )

    return (
        <>
            <PostContainer isLight={useThemeIsLight()}>
                <PostContentContainer>
                    <PostHeader {...postMeta} />
                    {typeof postSource !== "string" && (
                        <PostMDXCompiler serializedSource={postSource} />
                    )}
                    <PostInfo {...postMeta} />
                </PostContentContainer>

                <TableOfContentPositionContainer>
                    <PostTableOfContent title={postMeta.title} />
                </TableOfContentPositionContainer>
            </PostContainer>

            <PostController
                categoryURL={`/${postMeta.category}`}
                nextPost={postController.nextPost}
                prevPost={postController.prevPost}
            />
        </>
    )
}

Post.displayName = "Post" as PageType
export default Post

const PostMetaContainer = styled.div<IsLight>`
    width: 100%;
    height: fit-content;
    padding: 1.5rem 0;
    margin-bottom: 6.5rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    gap: 1.75rem;

    ${media.widePhone} {
        background-color: ${({ theme, isLight }) =>
            `${theme.containerBackgroundColor}${
                isLight ? theme.opacity20 : theme.opacity40
            }`};
        backdrop-filter: blur(25px);
        box-shadow: ${(p) =>
            p.isLight ? shadow.shadowSm : `0px 0px 2px 0px ${p.theme.gray7}`};
        border-radius: ${(p) =>
            `${p.theme.bxsm} ${p.theme.bxxxlg} ${p.theme.bxsm} ${p.theme.bxxxlg}`};
        margin: 0 0 1.5rem 0;
        padding: 1.5rem 0 2.75rem 0;
        gap: 1.25rem;
    }
`
const PostTitle = styled.header`
    font-size: 2.5rem;
    font-weight: 200;
    color: ${(p) => p.theme.headerFontColor};
    margin: 2rem 0;

    ${media.smallScreen} {
        font-size: 2.2rem;
    }

    ${media.mediumTablet} {
        font-size: 2.1rem;
    }

    ${media.widePhone} {
        font-size: ${(p) => p.theme.xlg};
        margin: 1.25rem 0;
        max-width: 80%;
    }
`

const PostTagContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    gap: 0.5rem;

    ${media.widePhone} {
        flex-wrap: wrap;
        max-width: 80%;
        justify-content: flex-start;
    }
`
const tagStyle = {
    info: (color: string) => css`
        background-color: ${color}${(p) => p.theme.opacity20};

        border-left-color: ${color};
        border-radius: ${(p) =>
            `${p.theme.bxxsm} ${p.theme.bxsm} ${p.theme.bsm} ${p.theme.bxxsm}`};

        cursor: pointer;
    `,
    tag: (color: string) => css`
        background-color: ${color}${(p) => p.theme.opacity10};

        border-left-color: ${color};
        border-radius: ${(p) =>
            `${p.theme.bxxsm} ${p.theme.bxsm} ${p.theme.bxsm} ${p.theme.bxxsm}`};

        padding-right: 0.75rem;

        font-style: italic;

        ${media.widePhone} {
            padding: 0.25rem;
            padding-right: 0.65rem;
        }
    `,
    category: (color: string) => css`
        color: white;

        border-radius: ${(p) => p.theme.bxsm};
        border-left: none;

        background-color: ${color};

        cursor: pointer;
    `,
}

interface TagStyle {
    color: string
    tagType: keyof typeof tagStyle
}

const PostTag = styled.div<TagStyle>`
    transition: background-color ease-out 0.2s;

    display: flex;
    padding: 0.25rem 0.5rem;
    border-left-width: 0.2rem;
    border-left-style: solid;

    color: ${(p) => p.theme.fontColor};
    font-weight: 300;

    gap: 0.25rem;

    user-select: none;

    &:hover {
        background-color: ${({ theme, color }) => `${color}${theme.opacity40}`};
    }

    ${media.widePhone} {
        font-size: ${(p) => p.theme.sm};
    }

    ${({ tagType, color }) => tagStyle[tagType](color)};
`

interface QuoteStyle {
    type: "start" | "end"
}
const TitleQuote = styled(QuoteIcon)<QuoteStyle>`
    width: 1.5rem;
    height: 1.5rem;

    ${({ type }) =>
        type === "start" &&
        css`
            margin-right: 0.75rem;
            margin-bottom: 1rem;
            transform: rotate(180deg);

            ${media.widePhone} {
                margin-right: 0.5rem;
                margin-bottom: 0.75rem;
            }
        `}

    ${({ type }) =>
        type === "end" &&
        css`
            margin-left: 0.75rem;
            margin-bottom: -1rem;

            ${media.widePhone} {
                margin-left: 0.5rem;
                margin-bottom: -0.75rem;
            }
        `}

    ${media.smallScreen} {
        width: 1.25rem;
        height: 1.25rem;
    }

    ${media.widePhone} {
        width: 1rem;
        height: 1rem;
    }
`
const PostInfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;

    width: 100%;
    padding: 1.25rem 0 5rem 0;
    margin-top: 1.25rem;
    border-top: 1.5px solid ${(p) => p.theme.gray3};

    gap: 0.25rem;

    ${media.widePhone} {
        padding-bottom: 2.5rem;
    }
`
const TagDivider = styled.p<{ color: string }>`
    color: ${({ color }) => color};
    font-weight: 300;
`
const PostInfo = ({
    color,
    author,
    update,
}: Pick<PostMetaType, "color" | "author" | "update">) => {
    const replaceUpateDate = `${update
        .replace("/", "년 ")
        .replace("/", "월 ")}일`

    //TODO: /about 페이지 만들기
    //* const authorUrl = "/about"
    return (
        <PostInfoContainer>
            <Link href="/" passHref>
                <PostTag color={color} tagType="tag">
                    <EditIcon fill={color} />
                    <p>{author}</p>
                </PostTag>
            </Link>
            <TagDivider color={color}>•</TagDivider>
            <PostTag color={color} tagType="tag">
                <ArrowUpIcon fill={color} />
                <p>{replaceUpateDate}</p>
            </PostTag>
            <TagDivider color={color}>•</TagDivider>
            <PostTag color={color} tagType="tag">
                <LeafIcon fill={color} />
                <p>Thanks For Reading !</p>
            </PostTag>
        </PostInfoContainer>
    )
}

const PostHeader = ({
    color,
    tags,
    title,
    category,
}: Pick<PostMetaType, "color" | "tags" | "title" | "category">) => {
    return (
        <PostMetaContainer isLight={useThemeIsLight()}>
            <PostTitle>
                <TitleQuote type="start" fill={color} />
                {title}
                <TitleQuote type="end" fill={color} />
            </PostTitle>

            <Link href={`/${category}`} passHref>
                <PostTag color={color} tagType="category">
                    <p>{category}</p>
                </PostTag>
            </Link>

            <PostTagContainer>
                {tags.map((tag) => (
                    <PostTag key={tag} color={color} tagType="tag">
                        <FlagFillIcon fill={color} />
                        <p>{tag}</p>
                    </PostTag>
                ))}
            </PostTagContainer>
        </PostMetaContainer>
    )
}

interface ParamQuery extends ParsedUrlQuery {
    category: string
    postTitle: string
}

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
    const { category, postTitle } = params as ParamQuery

    const specificPostContent = await getSpecificPostContent(
        category,
        postTitle
    )

    return {
        props: {
            ...specificPostContent,
        },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getCategoryPostContentPathArray()

    return {
        paths,
        fallback: false,
    }
}
