import styled from "styled-components"
import media from "@styles/utils/media"

import { useRef } from "react"

import { GetStaticPaths, GetStaticProps } from "next"

import { ParsedUrlQuery } from "querystring"

import { IsLight } from "@typing/theme"
import { PageType } from "@typing/page/type"
import { SeriesInfoType } from "@typing/post/series"
import { SpecificPostContentType } from "@typing/post/content"

import { useSetFocusingPageColor, useWindowWidth } from "@hooks/index"

import {
    getSpecificCategoryPostContent,
    getAllCategoryPostContentPath,
    getSpecificCategorySeriesInfo,
    getCategoryPostMeta,
} from "@utils/function/blog-contents-loader/contents/getCategoryPost"

import { PostSEO } from "@components/Next/SEO"
import {
    PostController,
    PostFooter,
    PostHeader,
    PostTableOfContentDesktop,
    PostTableOfContentMobile,
} from "@components/Blog/Post"
import KatexStyleLoader from "@components/Blog/Post/KatexStyleLoader"
import MDXBundler from "@components/MDXBundler"

import { useAtoms, _atom, _slector } from "@lib/jotai"

import { config } from "blog.config"

interface ParamQuery extends ParsedUrlQuery {
    category: string
    pageNumber: string
    postTitle: string
}
export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
    const { category, pageNumber, postTitle } = params as ParamQuery

    const { postController, postMeta, postSource, toc } =
        await getSpecificCategoryPostContent({
            categoryName: category,
            categoryPage: Number(pageNumber),
            postTitle,
        })

    const postSeriesInfo = postMeta.series
        ? await getSpecificCategorySeriesInfo(
              postMeta.series.seriesTitle,
              await getCategoryPostMeta(category)
          )
        : null

    return {
        props: {
            postController,
            postMeta,
            postSource,
            postSeriesInfo,
            toc,
        },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getAllCategoryPostContentPath()
    return {
        paths,
        fallback: false,
    }
}

const PostContainer = styled.div<IsLight>`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;

    width: 69.5%;

    background-color: ${({ theme, isLight }) =>
        isLight
            ? `${theme.containerBackgroundColor}${theme.opacity70}`
            : `${theme.containerBackgroundColor}${theme.opacity90}`};

    box-shadow: ${(p) =>
        p.isLight ? p.theme.shadowSm : `0px 0px 2px 0px ${p.theme.gray7}`};

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
        width: 100%;

        background-color: transparent;

        padding: 0;
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

interface PostSeriesInfo {
    postSeriesInfo: SeriesInfoType | null
}
interface PostProps extends SpecificPostContentType, PostSeriesInfo {}
function Post({
    postController,
    postMeta,
    postSource,
    postSeriesInfo,
    toc,
}: PostProps) {
    useSetFocusingPageColor(postMeta.color)

    const { isLightState: isLight } = useAtoms(_slector("isLight"))
    const { mediaWidth } = useWindowWidth()
    const tocMobileRender =
        mediaWidth === "widePhone" ||
        mediaWidth === "mediumPhone" ||
        mediaWidth === "mediumTablet"
    return (
        <>
            <PostContainer isLight={isLight}>
                <PostSEO {...postMeta} />

                <PostContentContainer>
                    <PostHeader {...postMeta} postSeriesInfo={postSeriesInfo} />
                    {config.useMobileTOC && tocMobileRender && (
                        <PostTableOfContentMobile toc={toc} />
                    )}
                    <MDXBundler mdxSource={postSource} />
                    <PostFooter {...postMeta} />
                </PostContentContainer>

                {!tocMobileRender && <PostTableOfContentDesktop toc={toc} />}

                <PostController
                    categoryURL={`/${postMeta.category}`}
                    nextPost={postController.nextPost}
                    prevPost={postController.prevPost}
                />
            </PostContainer>

            {config.useKatex && <KatexStyleLoader />}
        </>
    )
}

Post.displayName = "Post" as PageType
export default Post
