import { MDXCompiledSource } from "../mdx/mdx"
import { PostMeta } from "./meta"
export interface CategoryPostContent {
    category: string
    postContentArray: PostContent[]
}

//TODO: 이전 포스트 다음 포스트 들어가야 한다.
export interface PostContent {
    postMeta: PostMeta
    postSource: string | MDXCompiledSource
}

export interface SpecificPostContent extends PostContent {
    postController: PostController
}

interface PostControllerInfo {
    title: string
    postUrl: string
}
export interface PostController {
    prevPost: PostControllerInfo
    nextPost: PostControllerInfo
}
// export interface PostContent
