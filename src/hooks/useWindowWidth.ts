import { useEffect } from "react"

import { useStore, $ } from "@atom/index"

import {
    MediaType,
    MEDIA_WIDTH_KEY,
    MEDIA_WIDTH_VALUE,
} from "@styles/utils/media"

export const determineMediaWidth = (width: number): MediaType => {
    const mediaIndexLocation = MEDIA_WIDTH_VALUE.reduce(
        (mediaIndex, currentMediaWidthReference, idx) => {
            if (currentMediaWidthReference < width) return idx + 1
            return mediaIndex
        },
        0
    )
    return MEDIA_WIDTH_KEY[mediaIndexLocation]
}

function useWindowWidth(): {
    mediaWidth: MediaType
    windowWidth: number
} {
    const { WindowWidth, setWindowWidth } = useStore($("windowWidth"))
    useEffect(() => {
        setWindowWidth(window.innerWidth)
    }, [setWindowWidth])

    useEffect(() => {
        const updateWindowWidth = () => setWindowWidth(window.innerWidth)
        window.addEventListener("resize", updateWindowWidth)

        return () => window.removeEventListener("resize", updateWindowWidth)
    }, [setWindowWidth])

    return {
        mediaWidth: determineMediaWidth(WindowWidth),
        windowWidth: WindowWidth,
    }
}

export default useWindowWidth
