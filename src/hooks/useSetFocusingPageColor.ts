import { useEffect } from "react"

import { useAtom, _atom } from "@lib/recoil"

function useSetFocusingPageColor(color: string) {
    const { focusingPageColorSetState } = useAtom(_atom("focusingPageColor"))
    useEffect(
        () => focusingPageColorSetState(color),
        [focusingPageColorSetState, color]
    )
}

export default useSetFocusingPageColor
