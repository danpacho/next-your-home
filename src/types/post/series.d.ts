import { PostSeriesMetaType } from "./meta"

export interface SeriesInfoObjectType extends PostSeriesMetaType {
    postTitle: string
    color: string
    url: string
    prevUrl: string | null
    nextUrl: string | null
}

export interface SeriesInfoType {
    seriesTitle: string
    seriesInfo: SeriesInfoObjectType[]
}
