import { useEffect } from "react"

interface UseTimeoutProps {
    timeoutFunction: () => void
    timeoutCondition: boolean
}
function useTimeout({ timeoutFunction, timeoutCondition }: UseTimeoutProps) {
    useEffect(() => {
        let timeoutToken: NodeJS.Timeout
        if (timeoutCondition === true)
            timeoutToken = setTimeout(timeoutFunction, 2000)

        return () => clearTimeout(timeoutToken)
    }, [timeoutFunction, timeoutCondition])
}

export default useTimeout
