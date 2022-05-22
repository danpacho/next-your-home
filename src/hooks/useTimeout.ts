import { useEffect } from "react"

interface UseTimeoutProps {
    timeoutFunction: () => void
    timeoutCondition: boolean
    time?: number
}
function useTimeout({
    timeoutFunction,
    timeoutCondition,
    time,
}: UseTimeoutProps) {
    useEffect(() => {
        let timeoutToken: NodeJS.Timeout
        if (timeoutCondition === true)
            timeoutToken = setTimeout(timeoutFunction, time ?? 2000)

        return () => clearTimeout(timeoutToken)
    }, [timeoutFunction, timeoutCondition, time])
}

export default useTimeout
