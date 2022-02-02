import MDXPostLink from "@/components/MD/MDXPost/MDXPostLink/MDXPostLink"
import {
    getAllPostContent,
    getPurePostPath,
} from "@/utils/types/mdx/post/getMDXPost"
import { Post } from "@/utils/types/post/post"
import { GetStaticProps, InferGetStaticPropsType } from "next"

type PostGalleryProps = InferGetStaticPropsType<typeof getStaticProps>

export default function PostGallery({ AllPost }: PostGalleryProps) {
    return <MDXPostLink AllPost={AllPost} />
}

interface GetStaticPostGallery {
    AllPost: Post[]
}

//@ts-ignore
export const getStaticProps: GetStaticProps<
    GetStaticPostGallery
> = async () => {
    const allPostPathArray = await getPurePostPath()
    const allPost = await getAllPostContent(allPostPathArray)

    return {
        props: {
            AllPost: allPost,
        },
    }
}
