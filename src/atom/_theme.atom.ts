import { atom } from "jotai"
import { ThemeMode } from "@typing/theme"

const theme = atom<ThemeMode>("dark")
const isLight = atom((get) => get(theme) === "light")

export { theme, isLight }
