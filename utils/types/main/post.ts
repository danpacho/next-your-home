import { MDXCompiledSource } from "../mdx/mdx"

export interface PostContent {
    category: string
    contentsInfo: {
        postMeta: {
            title: any
            preview: any
            update: any
            author: any
            color: any
            category: string
        }
        postContent: string | MDXCompiledSource
        postUrl: string
    }[]
}
