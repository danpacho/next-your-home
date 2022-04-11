import { useState } from "react"

function useToggle<ToggleValueType>(
    toggleArray: ToggleValueType[],
    initialValue?: ToggleValueType
): {
    toggleValue: ToggleValueType
    setToggle: (toggleTarget?: ToggleValueType) => void
} {
    const [toggleValue, setToggle] = useState<ToggleValueType>(
        initialValue
            ? toggleArray[toggleArray.indexOf(initialValue)]
            : toggleArray[0]
    )

    return {
        toggleValue,
        setToggle: (toggleTarget) =>
            setToggle((toggle) => {
                if (toggleTarget) return toggleTarget
                return toggleArray.indexOf(toggle) === 0
                    ? toggleArray[1]
                    : toggleArray[0]
            }),
    }
}

export default useToggle
