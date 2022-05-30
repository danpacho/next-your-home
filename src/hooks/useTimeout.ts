import { useEffect } from "react"

interface UseTimeoutProps {
    timeoutFunction: () => void
    timeoutCondition: boolean
    time?: number
    once?: boolean
}
function useTimeout({
    timeoutFunction,
    timeoutCondition,
    time,
    once,
}: UseTimeoutProps) {
    const deps = once ? [] : [timeoutFunction, timeoutCondition, time]
    useEffect(() => {
        if (timeoutCondition) {
            const timeoutToken: NodeJS.Timeout = setTimeout(
                timeoutFunction,
                time ?? 2000
            )
            return () => clearTimeout(timeoutToken)
        }
        /* eslint-disable */
    }, [...deps])
}

export default useTimeout
