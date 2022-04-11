import { useStateTheme } from "@/lib/atoms/theme/theme.state"
import { useEffect } from "react"

const useWindowTheme = () => {
    const [theme, setTheme] = useStateTheme()
    useEffect(() => {
        const toggleTheme = (e: MediaQueryListEvent) => {
            const theme = e.matches ? "dark" : "light"
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
