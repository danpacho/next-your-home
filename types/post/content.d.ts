import { MDXCompiledSourceType } from "../mdx"
import { PostMetaType } from "./meta"
export interface CategoryPostContentType {
    category: string
    postContentArray: PostContentType[]
}

//TODO: 이전 포스트 다음 포스트 들어가야 한다.
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
// export interface PostContent
