export interface SeriesInfoObjectType {
    title: string
    order: number
    prevUrl: string
    nextUrl: string
    postTitle: string
}

export interface SeriesInfoType {
    seriesTitle: string
    seriesInfo: SeriesInfoObjectType[]
}
