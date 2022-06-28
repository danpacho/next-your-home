const mediaQuery = (maxWidth: number) => `
  @media (max-width: ${maxWidth}px)
`

export type MediaType =
    | "wideScreen"
    | "mediumScreen"
    | "smallScreen"
    | "wideTablet"
    | "mediumTablet"
    | "widePhone"
    | "mediumPhone"

const MEDIA_WIDTH = {
    mediumPhone: 374,
    widePhone: 768,
    mediumTablet: 1024,
    wideTablet: 1200,
    smallScreen: 1440,
    mediumScreen: 1920,
    wideScreen: 2200,
} as const

const MEDIA_WIDTH_VALUE = Object.values(MEDIA_WIDTH)
const MEDIA_WIDTH_KEY = Object.keys(MEDIA_WIDTH) as MediaType[]

const media = {
    wideScreen: mediaQuery(MEDIA_WIDTH.wideScreen),
    mediumScreen: mediaQuery(MEDIA_WIDTH.mediumScreen),
    smallScreen: mediaQuery(MEDIA_WIDTH.smallScreen),
    wideTablet: mediaQuery(MEDIA_WIDTH.wideTablet),
    mediumTablet: mediaQuery(MEDIA_WIDTH.mediumTablet),
    widePhone: mediaQuery(MEDIA_WIDTH.widePhone),
    mediumPhone: mediaQuery(MEDIA_WIDTH.mediumPhone),

    custom: mediaQuery,
}

export { MEDIA_WIDTH, MEDIA_WIDTH_KEY, MEDIA_WIDTH_VALUE }
export default media
