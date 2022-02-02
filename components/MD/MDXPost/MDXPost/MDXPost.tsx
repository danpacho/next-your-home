import Link from "@/components/Next/Link/Link"
import Button from "@/components/UI/Atoms/Button/Button"
import { Post } from "@/utils/types/post/post"
import styled from "styled-components"
import TableOfContent from "../TableOfContent/TableOfContent"
import MDXCompiler from "../MDXCompiler/MDXCompiler"

const PostContainer = styled.div`
    width: fit-content;
    max-width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-direction: column;

    scroll-behavior: smooth;
`

interface MDXPostProps extends Post {}

const PreviousPostBtn = styled.div`
    position: fixed;
    top: 50%;
    left: 7.5%;
    transform: translate(-7.5%, -50%);
`

const NextPostBtn = styled.div`
    position: fixed;
    top: 50%;
    right: 7.5%;

    transform: translate(7.5%, -50%);
`

const CursorBtn = styled.p`
    font-size: ${(p) => p.theme.lg};
    font-weight: 200;
    padding: 0 0.25rem;
`

function MDXPost({ content: comiledSource, meta, href }: MDXPostProps) {
    return (
        <>
            <PostContainer>
                <TableOfContent title={meta.title} />
                <MDXCompiler comiledSource={comiledSource} />
            </PostContainer>
            <Link
                href={href.previous}
                innerContent={
                    <PreviousPostBtn>
                        <Button
                            innerContent={<CursorBtn>{"<"}</CursorBtn>}
                            buttonStyleType="default"
                        />
                    </PreviousPostBtn>
                }
            />
            <Link
                href={href.next}
                innerContent={
                    <NextPostBtn>
                        <Button
                            innerContent={<CursorBtn>{">"}</CursorBtn>}
                            buttonStyleType="success"
                        />
                    </NextPostBtn>
                }
            />
        </>
    )
}

export default MDXPost
