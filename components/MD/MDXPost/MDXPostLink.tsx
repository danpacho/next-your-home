import styled from "styled-components"

import { Href, Meta, Post } from "@/utils/types/post/post"

import Link from "@/components/Next/Link/Link"
import { getTagArray } from "@/utils/types/mdx/post/getTag"
import Button from "@/components/UI/Atoms/Button/Button"

interface MDXLayoutProps {
    AllPost: Post[]
}

const Container = styled.div`
    width: fit-content;
    max-width: 80%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-direction: column;

    gap: 1.5rem;
`

function MDXPostLink({ AllPost }: MDXLayoutProps) {
    return (
        <Container>
            {AllPost.map(({ meta, href }) => (
                <PostBox meta={meta} href={href} key={meta.title} />
            ))}
        </Container>
    )
}

interface PostBoxProps {
    meta: Meta
    href: Href
}

function PostBox({ href, meta }: PostBoxProps) {
    const { content, date, title, backdrop_image_path, link, tag } = meta
    const tagArray = getTagArray(tag)
    return (
        <PostBoxContainer>
            <Link
                href={href.current}
                innerContent={<PostTitle>{title}</PostTitle>}
            />
            <PostTagContainer>
                {tagArray.map((tag) => (
                    <Button
                        key={tag}
                        innerContent={<li>{tag}</li>}
                        buttonStyleType="default"
                    />
                ))}
            </PostTagContainer>
            <PostPreviewContent>{content}</PostPreviewContent>
        </PostBoxContainer>
    )
}

const PostTagContainer = styled.ul`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    gap: 1rem;

    width: fit-content;
    min-width: 7.5rem;
    height: fit-content;

    background-color: transparent;
`

const PostBoxContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;

    gap: 2rem;

    width: fit-content;
    min-width: 20rem;
    height: fit-content;
    min-height: 10rem;

    padding: 1rem 2.5rem;

    background-color: ${(p) => p.theme.white};
    border: 0.075rem solid ${(p) => p.theme.gray3};
    border-radius: ${(p) => p.theme.bmd};

    &:hover {
        border-color: ${(p) => p.theme.teal3};
    }
`

const PostTitle = styled.h1`
    font-size: ${(p) => p.theme.xlg};
    font-weight: 1000;
    color: ${(p) => p.theme.gray9};

    margin-top: 2rem;

    ::after {
        transition: transform 0.25s ease-in-out;
        content: "";
        display: block;
        background-color: ${(p) => p.theme.teal3};
        margin-top: 0.15rem;
        transform: scaleX(0);
        height: 0.5rem;
    }

    :hover::after {
        transform: scaleX(1);
    }
`

const PostPreviewContent = styled.span`
    width: fit-content;
    height: fit-content;

    font-size: ${(p) => p.theme.sm};
    font-weight: 500;
    color: ${(p) => p.theme.gray6};

    line-height: 1.25rem;
    margin-bottom: 1rem;
`

export default MDXPostLink
