const mediaQuery = (maxWidth: number) => `
  @media (max-width: ${maxWidth}px)
`

export type MediaType = keyof typeof media

const media = {
    wideScreen: mediaQuery(2200),
    mediumScreen: mediaQuery(1920),
    smallScreen: mediaQuery(1440),
    wideTablet: mediaQuery(1200),
    mediumTablet: mediaQuery(1024),
    widePhone: mediaQuery(768),
    mediumPhone: mediaQuery(374),

    custom: mediaQuery,
}

export default media
