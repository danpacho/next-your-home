import styled, { css } from "styled-components"
import media from "@styles/utils/media"

import Link from "next/link"

import { PostMetaType } from "@typing/post/meta"
import { SeriesInfoType } from "@typing/post/series"
import { IsLight } from "@typing/theme"

import { FlagFillIcon, QuoteIcon } from "@components/UI/Atoms/Icons"
import PostSeries from "../PostSeries/PostSeries"
import PostTag from "../PostTag/PostTag"

import { useThemeMode } from "@hooks/index"

const HeaderContainer = styled.div<IsLight>`
    width: 100%;
    height: fit-content;
    padding: 1.5rem 0;
    margin-bottom: 2.5rem;

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

        box-shadow: ${(p) =>
            p.isLight ? p.theme.shadowSm : `0px 0px 2px 0px ${p.theme.gray7}`};
        backdrop-filter: blur(25px);

        border-radius: ${(p) =>
            `${p.theme.bxsm} ${p.theme.bxxxlg} ${p.theme.bxsm} ${p.theme.bxxxlg}`};

        margin: 0.5rem 0 1.5rem 0;
        padding: 1.5rem 0 2.75rem 0;
        gap: 1.25rem;
    }
`
const Title = styled.header`
    font-size: ${(p) => p.theme.xtitle};
    font-weight: 400;
    color: ${(p) => p.theme.headerFontColor};

    margin: 2rem 0;

    ${media.smallScreen} {
        font-size: ${(p) => p.theme.title};
    }

    ${media.widePhone} {
        font-size: ${(p) => p.theme.xlg};
        margin: 1.25rem 0;
        max-width: 80%;
        word-break: break-all;
    }
`
const TagContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    gap: 0.5rem;

    ${media.widePhone} {
        flex-wrap: wrap;
        max-width: 80%;
        justify-content: center;
    }
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

interface PostHeaderProps
    extends Pick<PostMetaType, "color" | "tags" | "title" | "category"> {
    postSeriesInfo: SeriesInfoType | null
}
function PostHeader({
    color,
    tags,
    title,
    category,
    postSeriesInfo,
}: PostHeaderProps) {
    const { isLight } = useThemeMode()
    return (
        <HeaderContainer isLight={isLight}>
            <Title>
                <TitleQuote type="start" fill={color} />
                {title}
                <TitleQuote type="end" fill={color} />
            </Title>

            <Link href={`/${category}`} passHref>
                <PostTag _color={color} tagType="category" isLight={isLight}>
                    <p>{category}</p>
                </PostTag>
            </Link>

            <TagContainer>
                {tags.map((tag) => (
                    <PostTag
                        key={tag}
                        _color={color}
                        tagType="tag"
                        isLight={isLight}
                    >
                        <FlagFillIcon />
                        <p>{tag}</p>
                    </PostTag>
                ))}
            </TagContainer>

            {postSeriesInfo && (
                <PostSeries {...postSeriesInfo} currentTitle={title} />
            )}
        </HeaderContainer>
    )
}

export default PostHeader
