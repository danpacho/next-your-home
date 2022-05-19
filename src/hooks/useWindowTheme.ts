import { useEffect, useState } from "react"

import { ThemeMode } from "@typing/theme"

function useWindowTheme() {
    const [windowTheme, setWindowTheme] = useState<ThemeMode>("dark")
    useEffect(() => {
        const initialTheme: ThemeMode = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches
            ? "dark"
            : "light"
        setWindowTheme(initialTheme)
    }, [setWindowTheme])

    useEffect(() => {
        const toggleTheme = (e: MediaQueryListEvent) => {
            const theme: ThemeMode = e.matches ? "dark" : "light"
            setWindowTheme(theme)
        }
        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", toggleTheme)

        return () =>
            window
                .matchMedia("(prefers-color-scheme: dark)")
                .removeEventListener("change", toggleTheme)
    }, [setWindowTheme])

    return windowTheme
}

export default useWindowTheme
