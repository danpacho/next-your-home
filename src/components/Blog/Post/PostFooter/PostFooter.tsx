import styled from "styled-components"
import media from "@styles/utils/media"

import React from "react"

import Link from "next/link"

import { PostMetaType } from "@typing/post/meta"

import { ArrowUpIcon, EditIcon, LeafIcon } from "@components/UI/Atoms/Icons"
import PostTag from "../PostTag/PostTag"

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
const TagDivider = styled.p<{ color: string }>`
    color: ${({ color }) => color};
    font-weight: 300;
`

function PostFooter({
    color,
    author,
    update,
    reference: referenceArray,
}: Pick<PostMetaType, "color" | "author" | "update" | "reference">) {
    const replaceUpateDate = `${update
        .replace("/", "년 ")
        .replace("/", "월 ")}일`

    return (
        <FooterContainer>
            <TagContainer>
                <Link href="/profile" passHref>
                    <PostTag color={color} tagType="tag">
                        <EditIcon />
                        <p>{author}</p>
                    </PostTag>
                </Link>
                <TagDivider color={color}>•</TagDivider>
                <PostTag color={color} tagType="tag">
                    <ArrowUpIcon />
                    <p>{replaceUpateDate}</p>
                </PostTag>
                <TagDivider color={color}>•</TagDivider>
                <PostTag color={color} tagType="tag">
                    <LeafIcon />
                    <p>Thanks For Reading !</p>
                </PostTag>
            </TagContainer>

            <TagContainer>
                {referenceArray?.map((reference, order) => (
                    <React.Fragment key={reference}>
                        <PostTag color={color} tagType="info">
                            <EditIcon />
                            <ReferenceLink
                                href={reference}
                                visitedColor={color}
                            >
                                참고 {order + 1}
                            </ReferenceLink>
                        </PostTag>
                        {order !== referenceArray.length - 1 && (
                            <TagDivider color={color}>•</TagDivider>
                        )}
                    </React.Fragment>
                ))}
            </TagContainer>
        </FooterContainer>
    )
}

export default PostFooter
