import MDXCompiler from "@/components/Blog/Post/MDXCompiler/MDXCompiler"
import TableOfContent from "@/components/Blog/Post/TableOfContent/TableOfContent"
import PostController from "@/components/Blog/PostController/PostController"
import SvgArrowUp from "@/components/UI/Atoms/Icons/ArrowUp"
import SvgEdit from "@/components/UI/Atoms/Icons/Edit"
import SvgFlagFill from "@/components/UI/Atoms/Icons/FlagFill"
import SvgLeaf from "@/components/UI/Atoms/Icons/Leaf"
import SvgQuote from "@/components/UI/Atoms/Icons/Quote"
import media from "@/styles/utils/media"
import pallete from "@/styles/utils/pallete"
import { shadow } from "@/styles/utils/shadow"
import {
    getSpecificPostContent,
    getCategoryPostContentPathArray,
} from "@/utils/function/blog-contents-loader/contents/getCategoryPost"
import { SpecificPostContentType } from "@/types/post/content"
import { PostMetaType } from "@/types/post/meta"
import { PageType } from "@/types/page/type"
import { GetStaticPaths, GetStaticProps } from "next"
import Link from "next/link"
import { ParsedUrlQuery } from "querystring"
import styled, { css } from "styled-components"

const PositionContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.5rem;

    width: 68.5%;

    background-color: ${(p) => p.theme.white}3F;
    backdrop-filter: blur(25px);
    box-shadow: ${shadow.shadowSm};
    border-radius: ${(p) => p.theme.blg};

    padding: 0.25rem 0.5rem;

    margin-bottom: 1.5rem;

    ${media.widePhone} {
        gap: 0;
        width: 95%;
        background-color: transparent;
        backdrop-filter: unset;
        justify-content: center;
        box-shadow: none;
    }
`

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-direction: column;

    flex: 10;
    min-height: max-content;
    height: fit-content;
    margin: 2.5rem;

    ${media.widePhone} {
        flex: none;
        width: 100%;
        margin: 1.5rem 0;
    }
`

const TableOfContentPositionContainer = styled.div`
    position: sticky;
    top: 2.5rem;

    flex: 1;

    margin-top: 2.5rem;
    margin-right: 1rem;

    ${media.wideTablet} {
        display: none;
    }
`

interface PostProps extends SpecificPostContentType {}
function Post({ postController, postMeta, postSource }: PostProps) {
    return (
        <>
            <PositionContainer>
                <PostContainer>
                    <PostHeader {...postMeta} />
                    {typeof postSource !== "string" && (
                        <MDXCompiler comiledSource={postSource} />
                    )}
                    <PostInfo {...postMeta} />
                </PostContainer>

                <TableOfContentPositionContainer>
                    <TableOfContent title={postMeta.title} />
                </TableOfContentPositionContainer>
            </PositionContainer>

            <PostController
                homeUrl={`/${postMeta.category}`}
                nextPost={postController.nextPost}
                prevPost={postController.prevPost}
            />
        </>
    )
}

Post.displayName = "Post" as PageType
export default Post

const PostMetaContainer = styled.div`
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
        background-color: ${(p) => p.theme.white}3F;
        backdrop-filter: blur(25px);
        box-shadow: ${shadow.shadowSm};
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
    margin: 2rem 0;

    ${media.widePhone} {
        font-size: 1.75rem;
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
        border-left-color: ${color};
        background-color: ${color}26;
        border-radius: ${(p) => `0 ${p.theme.bxsm} ${p.theme.bsm} 0`};

        cursor: pointer;
    `,
    tag: (color: string) => css`
        border-left-color: ${color};
        background-color: ${color}26;
        border-radius: ${(p) => `0 ${p.theme.bxsm} ${p.theme.bsm} 0`};
        font-style: italic;
        padding-right: 0.75rem;

        ${media.widePhone} {
            padding: 0.25rem;
            padding-right: 0.5rem;
        }
    `,
    category: (color: string) => css`
        color: white;
        border-radius: ${(p) => p.theme.bxsm};
        border-left: none;
        background-color: ${color};
        /* background-image: linear-gradient(
            -45deg,
            ${color}66 -20%,
            ${color} 100%
        ); */
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
    font-weight: 300;

    gap: 0.25rem;

    user-select: none;

    &:hover {
        background-color: ${(p) => p.color}66;
    }

    ${({ tagType, color }) => tagStyle[tagType](color)};

    ${media.widePhone} {
        font-size: ${(p) => p.theme.sm};
    }
`

interface QuoteStyle {
    type: "start" | "end"
}
const TitleQuote = styled(SvgQuote)<QuoteStyle>`
    width: 1.5rem;
    height: 1.5rem;
    ${({ type }) =>
        type === "start" &&
        css`
            margin-right: 0.75rem;
            margin-bottom: 1rem;
            transform: rotate(180deg);
        `}
    ${({ type }) =>
        type === "end" &&
        css`
            margin-left: 0.75rem;
            margin-bottom: -1rem;
        `}

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
                    <SvgEdit fill={color} />
                    <p>{author}</p>
                </PostTag>
            </Link>
            <TagDivider color={color}>•</TagDivider>
            <PostTag color={color} tagType="tag">
                <SvgArrowUp fill={color} />
                <p>{replaceUpateDate}</p>
            </PostTag>
            <TagDivider color={color}>•</TagDivider>
            <PostTag color={color} tagType="tag">
                <SvgLeaf fill={color} />
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
        <PostMetaContainer>
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
                        <SvgFlagFill fill={color} />
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
