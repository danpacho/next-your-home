import styled from "styled-components"
import media from "@styles/utils/media"

import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"

import { IsLight } from "@typing/theme"
import { PageType } from "@typing/page/type"
import { SeriesInfoType } from "@typing/post/series"
import { SpecificPostContentType } from "@typing/post/content"

import {
    useSetFocusingPageColor,
    useWindowWidth,
    useThemeMode,
} from "@hooks/index"

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

    width: 70%;

    background-color: ${({ theme, isLight }) =>
        isLight
            ? `${theme.containerBackgroundColor}${theme.opacity70}`
            : `${theme.containerBackgroundColor}${theme.opacity90}`};

    box-shadow: ${(p) =>
        p.isLight ? p.theme.shadowSm : `0px 0px 0.1rem 0px ${p.theme.gray7}`};

    border-radius: ${(p) => p.theme.bsm};

    padding: 0.25rem 0.5rem;

    margin-bottom: 1.5rem;

    ${media.mediumTablet} {
        width: 85%;

        padding: 0;

        justify-content: center;
    }

    ${media.widePhone} {
        width: 100%;

        background-color: transparent;

        box-shadow: none;
    }
`

const PostContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-direction: column;

    width: 65%;
    min-width: 65%;
    min-height: max-content;

    margin: 2.5rem 2rem;

    ${media.wideTablet} {
        max-width: 55%;
    }

    ${media.mediumTablet} {
        width: 85%;
        min-width: unset;
        max-width: unset;
    }

    ${media.widePhone} {
        width: 100%;

        flex: none;

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

    const { isLight } = useThemeMode()
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
