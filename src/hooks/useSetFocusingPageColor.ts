import { useEffect } from "react"

import { useAtoms, _atom } from "@lib/jotai"

function useSetFocusingPageColor(color: string) {
    const { focusingPageColorSetState } = useAtoms(_atom("focusingPageColor"))
    useEffect(
        () => focusingPageColorSetState(color),
        [focusingPageColorSetState, color]
    )
}

export default useSetFocusingPageColor
