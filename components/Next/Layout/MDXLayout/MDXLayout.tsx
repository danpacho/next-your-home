import { ReactElement } from "react"
import styled from "styled-components"
import MDXAtoms from "@components/MD/MDXComponents"
import { MDXProvider } from "@mdx-js/react"

interface Meta {
    title: string
    content: string
    date: string

    backdrop_image_path?: string
    link?: string
}

interface MDXLayoutProps extends MetaProps {
    children: any
}

function MDXLayout({ children, meta }: MDXLayoutProps) {
    console.log(
        children.forEach((props: any) => {
            if (props.props.originalType === "h1") console.log(props.props)
        })
    )
    // console.log(children)
    return (
        <Container>
            <Meta meta={meta} />
            <div>
                <MDXProvider components={MDXAtoms}>{children}</MDXProvider>
            </div>
        </Container>
    )
}

const Container = styled.div`
    width: 80%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
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
    width: max-content;
    height: max-content;
    padding: 0.5rem;
    border-radius: ${(props) => props.theme.blg};
    border: 2px solid ${(props) => props.theme.teal5};
`

function Meta({
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

export default MDXLayout
