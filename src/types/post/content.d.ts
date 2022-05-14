import { MDXCompiledSourceType } from "../mdx"
import { PostMetaType } from "./meta"
export interface CategoryPostContentType {
    category: string
    postContentArray: PostContentType[]
    postNumber: number
}

export interface PostContentType {
    postMeta: PostMetaType
    postSource: MDXCompiledSourceType | string
}

export interface SpecificPostContentType extends PostContentType {
    postController: PostControllerType
}

interface PostControllerInfoType {
    title: string
    postUrl: string
}
export interface PostControllerType {
    prevPost: PostControllerInfoType
    nextPost: PostControllerInfoType
}
