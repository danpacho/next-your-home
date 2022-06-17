import { useEffect, useState } from "react"

import useThrottle from "./useThrottle"

interface UseScrollDirectionProps {
    throttleTime: number
    responsivenessPixel: number
}
function useScrollDirection({
    throttleTime,
    responsivenessPixel,
}: UseScrollDirectionProps) {
    const [isScrollDown, setIsScrollDown] = useState(false)

    const updateScrollDirection = useThrottle({
        func: ({ currY, prevY }: { prevY: number; currY: number }) => {
            const scrollDiff = currY - prevY
            if (scrollDiff > responsivenessPixel) setIsScrollDown(true)
            if (scrollDiff < -responsivenessPixel) setIsScrollDown(false)
        },
        throttleTime,
    })

    useEffect(() => {
        let prevY = window.scrollY

        const scrollUpdater = () => {
            const currY = window.scrollY
            updateScrollDirection({ currY, prevY })
            prevY = window.scrollY
        }

        window.addEventListener("scroll", scrollUpdater, { passive: true })

        return () => window.removeEventListener("scroll", scrollUpdater)
    }, [updateScrollDirection, throttleTime, isScrollDown])

    return {
        isScrollDown,
    }
}

export default useScrollDirection
