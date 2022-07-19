import { useEffect } from "react"

import { ThemeMode } from "@typing/theme"

import { useToggle, useWindowTheme } from "@hooks/index"

import { Button } from "@components/UI/Atoms/Button"
import { useAtoms, _atom } from "@lib/jotai"

function ThemeButton() {
    const windowTheme = useWindowTheme()
    const { toggleValue, setToggle } = useToggle<ThemeMode>(
        ["dark", "light"],
        windowTheme
    )

    const { themeState, themeSetState } = useAtoms(_atom("theme"))

    useEffect(() => {
        themeSetState(toggleValue)
    }, [toggleValue, themeSetState])

    useEffect(() => {
        themeSetState(windowTheme)
    }, [windowTheme, themeSetState])

    return (
        <Button ariaLabel="theme button" onClick={() => setToggle()}>
            {themeState === "light" && <p>Light</p>}
            {themeState === "dark" && <p>Dark</p>}
        </Button>
    )
}

export default ThemeButton
