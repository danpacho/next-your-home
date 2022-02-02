import { MDXCompiledSource } from "../mdx/mdx"

export interface Href {
    previous: string
    current: string
    next: string
}

export interface Post {
    href: Href
    content: MDXCompiledSource
    meta: Meta
}

export interface Meta {
    title: string
    content: string
    date: string
    tag: string

    backdrop_image_path?: string
    link?: string
}
