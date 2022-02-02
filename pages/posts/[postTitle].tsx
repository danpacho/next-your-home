import MDXPost from "@/components/MD/MDXPost/MDXPost"
import {
    getFilteredPostPath,
    getPurePostPath,
    getSpecificPostContent,
} from "@/utils/types/mdx/post/getMDXPost"
import { Post } from "@/utils/types/post/post"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"

type PostProps = InferGetStaticPropsType<typeof getStaticProps>

function Post({ post: { content, meta, href }, error, notFound }: PostProps) {
    return <MDXPost href={href} content={content} meta={meta} />
}

interface GetStaticPost {
    post: Post
    notFound?: boolean
    error?: boolean
}

//@ts-ignore
export const getStaticProps: GetStaticProps<GetStaticPost> = async ({
    params,
}) => {
    const postTitle = params?.postTitle
    if (postTitle && typeof postTitle === "string") {
        try {
            const postContent = await getSpecificPostContent(`${postTitle}.mdx`)
            return {
                props: {
                    post: postContent,
                },
            }
        } catch (e) {
            return {
                props: { notFound: true },
            }
        }
    }

    return {
        props: {
            notFound: true,
        },
    }
}

export const getStaticPaths: GetStaticPaths = async (props) => {
    const postPathArray = await getFilteredPostPath(await getPurePostPath())
    return {
        paths: postPathArray,
        fallback: false,
    }
}

export default Post
