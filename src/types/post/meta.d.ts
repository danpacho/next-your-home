/**
 * meta of pure mdx string
 */
export interface MDXPostMetaType {
    title: string
    preview: string
    author: string
    update: string
    color: string
    tags: string
    postpone?: string
    reference?: string
    series?: string
}

export interface PostSeriesMetaType {
    seriesTitle: string
    order: number
}
/**
 * total post meta property with {@link MDXPostMetaType} and {@link PostSeriesMetaType}
 */
export interface PostMetaType {
    title: string
    preview: string
    author: string
    update: string
    color: string
    tags: string[]
    category: string
    postUrl: string
    postFileName: string
    postpone: boolean
    reference: string[] | null
    postOrder: number
    series: PostSeriesMetaType | null
}
