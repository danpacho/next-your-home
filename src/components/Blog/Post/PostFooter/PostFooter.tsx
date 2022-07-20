import styled from "styled-components"
import media from "@styles/utils/media"

import React from "react"

import Link from "next/link"

import { ColorProps } from "@typing/theme"
import { PostMetaType } from "@typing/post/meta"

import { useThemeMode } from "@hooks/index"

import { ArrowUpIcon, EditIcon, LeafIcon } from "@components/UI/Atoms/Icons"
import PostTag from "../PostTag/PostTag"

import { useAtoms, _slector } from "@lib/jotai"

const FooterContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    width: 100%;

    padding: 1.25rem 0 5rem 0;
    margin-top: 1.25rem;
    border-top: 1.5px solid ${(p) => p.theme.gray3};

    gap: 0.25rem;

    ${media.widePhone} {
        padding-bottom: 2.5rem;
    }
`
const TagContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;

    gap: 0.25rem;

    margin-top: 0.5rem;
`
const ReferenceLink = styled.a<{ visitedColor: string }>`
    color: ${(p) => p.theme.fontColor};
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }

    &:visited {
        color: ${(p) => p.visitedColor};
    }
`
const TagDivider = styled.p<ColorProps>`
    color: ${({ _color }) => _color};
    font-weight: 300;
`

function PostFooter({
    color,
    author,
    update,
    reference: referenceArray,
}: Pick<PostMetaType, "color" | "author" | "update" | "reference">) {
    const { isLight } = useThemeMode()
    const replaceUpateDate = `${update
        .replace("/", "년 ")
        .replace("/", "월 ")}일`

    return (
        <FooterContainer>
            <TagContainer>
                <Link href="/profile" passHref>
                    <PostTag _color={color} tagType="tag" isLight={isLight}>
                        <EditIcon />
                        <p>{author}</p>
                    </PostTag>
                </Link>
                <TagDivider _color={color}>•</TagDivider>
                <PostTag _color={color} tagType="tag" isLight={isLight}>
                    <ArrowUpIcon />
                    <p>{replaceUpateDate}</p>
                </PostTag>
                <TagDivider _color={color}>•</TagDivider>
                <PostTag _color={color} tagType="tag" isLight={isLight}>
                    <LeafIcon />
                    <p>Thanks For Reading !</p>
                </PostTag>
            </TagContainer>

            <TagContainer>
                {referenceArray?.map((reference, order) => (
                    <React.Fragment key={reference}>
                        <PostTag
                            _color={color}
                            tagType="info"
                            isLight={isLight}
                        >
                            <EditIcon />
                            <ReferenceLink
                                href={reference}
                                visitedColor={color}
                            >
                                참고 {order + 1}
                            </ReferenceLink>
                        </PostTag>
                        {order !== referenceArray.length - 1 && (
                            <TagDivider _color={color}>•</TagDivider>
                        )}
                    </React.Fragment>
                ))}
            </TagContainer>
        </FooterContainer>
    )
}

export default PostFooter
