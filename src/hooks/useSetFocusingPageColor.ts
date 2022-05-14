import { useStateFocusingPageColor } from "@lib/atoms/pageColor/pageColor.state"
import { useEffect } from "react"

function useSetFocusingPageColor(color: string) {
    const [_, setFocusingPageColor] = useStateFocusingPageColor()

    useEffect(() => setFocusingPageColor(color), [setFocusingPageColor, color])
}

export default useSetFocusingPageColor
