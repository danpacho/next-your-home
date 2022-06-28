import { useEffect } from "react"

import { useAtoms, _atom } from "@lib/jotai"

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
    const { windowWidthState, windowWidthSetState } = useAtoms(
        _atom("windowWidth")
    )
    useEffect(() => {
        windowWidthSetState(window.innerWidth)
    }, [windowWidthSetState])

    useEffect(() => {
        const updateWindowWidth = () => windowWidthSetState(window.innerWidth)
        window.addEventListener("resize", updateWindowWidth)

        return () => window.removeEventListener("resize", updateWindowWidth)
    }, [windowWidthSetState])

    return {
        mediaWidth: determineMediaWidth(windowWidthState),
        windowWidth: windowWidthState,
    }
}

export default useWindowWidth
