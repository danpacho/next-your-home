import { LayersAltIcon } from "@/components/UI/Atoms/Icons"
import media from "@/styles/utils/media"
import { PostMetaType } from "@/types/post/meta"
import styled, { css } from "styled-components"

const PostMetaTagContainer = styled.ul`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    gap: 0.35rem;
`
const postMetaTagStyle = {
    category: () => css`
        border-radius: 1px 1.5px 1.5px 10px;
        ${media.widePhone} {
            border-radius: 0.5px 1px 1px 4px;
        }
    `,
    update: () => css`
        border-radius: 1px;
        ${media.widePhone} {
            border-radius: 0.5px;
        }
    `,
    author: () => css`
        border-radius: 1px 10px 10px 1px;
        ${media.widePhone} {
            border-radius: 0.5px 4px 4px 0.5px;
        }
    `,
}

interface PostMetaTagStyle {
    type: keyof Omit<PostMetaProps, "color" | "tags" | "isCategoryPage">
    color: string
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

    ${media.mediumTablet} {
        font-size: ${(p) => p.theme.xsm};
        padding: 0.25rem 0.45rem;
    }

    ${media.widePhone} {
        font-size: ${(p) => p.theme.xsm};
        font-weight: 300;

        padding: 0.15rem 0.35rem;
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
    return (
        <PostMetaTagContainer>
            {isCategoryPage &&
                tags.slice(0, TAG_NUMBER).map((tag, order) => (
                    <PostMetaTag
                        key={tag}
                        type={order === LAST_TAG_ORDER ? "update" : "category"}
                        color={color}
                    >
                        <p>
                            # {tag}
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
                <PostMetaTag type="category" color={color}>
                    {category}
                </PostMetaTag>
            )}
            {!isCategoryPage && (
                <PostMetaTag type="update" color={color}>
                    {update}
                </PostMetaTag>
            )}
            <PostMetaTag type="author" color={color}>
                {author}
            </PostMetaTag>
        </PostMetaTagContainer>
    )
}

export default PostMeta
