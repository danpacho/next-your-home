import { useEffect } from "react"
import Tooltip, { TooltipProps } from "@components/UX/Tooltip/Tooltip"

interface ToastProps
    extends Omit<TooltipProps, "isUnvisibleElementClickAbled" | "children"> {
    appearSecond: number
}

function Toast({
    tooltipElement,
    left,
    right,
    top,
    bottom,
    active: toastActive,
    setActive: setToastActive,
    appearSecond,
}: ToastProps) {
    const timeout = appearSecond * 1000

    useEffect(() => {
        let removeToast: NodeJS.Timeout
        if (toastActive) {
            removeToast = setTimeout(() => setToastActive(false), timeout)
        }

        return () => clearTimeout(removeToast)
    }, [toastActive, setToastActive, timeout])

    return (
        <Tooltip
            active={toastActive}
            setActive={() => 1}
            tooltipElement={tooltipElement}
            top={top}
            bottom={bottom}
            left={left}
            right={right}
        >
            <></>
        </Tooltip>
    )
}

export default Toast
