import { Meta } from "@/utils/types/post/post"
import styled from "styled-components"

interface MetaProps {
    meta: Meta
}

const MetaContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;

    gap: 1.25rem;
`

const MetaTag = styled.div`
    width: fit-content;
    height: fit-content;
    padding: 0.5rem;
    border-radius: ${(props) => props.theme.blg};
    border: 0.125rem solid ${(props) => props.theme.teal5};
`

function MDXMeta({
    meta: { title, content, date, backdrop_image_path, link },
}: MetaProps) {
    return (
        <MetaContainer>
            <MetaTag>{title}</MetaTag>
            <MetaTag>{content}</MetaTag>
            <MetaTag>{date}</MetaTag>
        </MetaContainer>
    )
}

export default MDXMeta
