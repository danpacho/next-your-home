import { useEffect } from "react"

import { ThemeMode } from "@typing/theme"

import { useToggle, useWindowTheme } from "@hooks/index"

import { Button } from "@components/UI/Atoms/Button"

import { useStore, $ } from "@atom/index"

function ThemeButton() {
    const windowTheme = useWindowTheme()
    const { toggleValue, setToggle } = useToggle<ThemeMode>(
        ["dark", "light"],
        windowTheme
    )

    const { Theme, setTheme } = useStore($("theme"))

    useEffect(() => {
        setTheme(toggleValue)
    }, [toggleValue, setTheme])

    useEffect(() => {
        setTheme(windowTheme)
    }, [windowTheme, setTheme])

    return (
        <Button ariaLabel="theme button" onClick={() => setToggle()}>
            {Theme === "light" && <p>Light</p>}
            {Theme === "dark" && <p>Dark</p>}
        </Button>
    )
}

export default ThemeButton
