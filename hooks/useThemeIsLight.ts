import { useTheme } from "@/lib/atoms/theme/theme.state"

/**
 * @returns is theme state is `"light"`
 */
const useThemeIsLight = (): boolean => useTheme() === "light"

export default useThemeIsLight
