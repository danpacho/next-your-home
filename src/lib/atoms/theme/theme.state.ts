import { ThemeMode } from "@typing/theme"
import {
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
} from "recoil"

const $theme = atom<ThemeMode>({
    key: "theme",
    default: "dark",
})

const useStateTheme = () => useRecoilState($theme)
const useTheme = () => useRecoilValue($theme)
const useSetTheme = () => useSetRecoilState($theme)

const $isLight = selector<boolean>({
    key: "isLight",
    get: ({ get }) => get($theme) === "light",
})
const useThemeIsLight = () => useRecoilValue($isLight)

export { useStateTheme, useTheme, useSetTheme, useThemeIsLight }
