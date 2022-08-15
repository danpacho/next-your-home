import { useEffect } from "react"

import { useStore, $ } from "@atom/index"

function useSetFocusingPageColor(color: string) {
    const { setFocusingPageColor } = useStore($("focusingPageColor"))
    useEffect(() => setFocusingPageColor(color), [setFocusingPageColor, color])
}

export default useSetFocusingPageColor
