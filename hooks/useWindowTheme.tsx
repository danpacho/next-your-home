import { useEffect, useState } from "react"

import { ThemeMode } from "@/types/theme"

const useWindowTheme = () => {
    const [theme, setTheme] = useState<ThemeMode>("dark")
    useEffect(() => {
        const initialTheme: ThemeMode = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches
            ? "dark"
            : "light"
        setTheme(initialTheme)
    }, [setTheme])

    useEffect(() => {
        const toggleTheme = (e: MediaQueryListEvent) => {
            const theme: ThemeMode = e.matches ? "dark" : "light"
            setTheme(theme)
        }
        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", toggleTheme)

        return () =>
            window
                .matchMedia("(prefers-color-scheme: dark)")
                .removeEventListener("change", toggleTheme)
    }, [setTheme])

    return theme
}

export default useWindowTheme
