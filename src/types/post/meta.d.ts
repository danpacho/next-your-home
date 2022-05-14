export interface MDXPostMetaType {
    title: string
    preview: string
    author: string
    update: string
    color: string
    tags: string
    postpone?: string
    reference?: string
}

export interface PostMetaType {
    title: string
    preview: string
    author: string
    update: string
    color: string
    tags: string[]
    category: string
    postUrl: string
    postpone: boolean
    reference: string[] | null
    postOrder: number
}
