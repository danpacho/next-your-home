import { useMemo } from "react"

type Func = (...args: any[]) => any
type Argument<F> = F extends (...args: infer Type) => any ? Type : never

function throttle<F extends Func>({
    func,
    throttleTime,
}: {
    func: F
    throttleTime: number
}) {
    let waitForExecution = false

    return (...arg: Argument<F>) => {
        if (waitForExecution === false) {
            func(...arg)

            waitForExecution = true

            setTimeout(() => {
                waitForExecution = false
            }, throttleTime)
        }
    }
}

interface UseThrottleProps<F> {
    func: F
    throttleTime: number
}
function useThrottle<F extends Func>({
    func,
    throttleTime,
}: UseThrottleProps<F>) {
    const cachedThrottleFunc = useMemo(
        () =>
            throttle<F>({
                func,
                throttleTime,
            }),
        [func, throttleTime]
    )

    return cachedThrottleFunc
}

export default useThrottle
