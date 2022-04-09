import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"

type ThemeMode = "light" | "dark"

const theme = atom<ThemeMode>({
    key: "theme",
    default: "light",
})

const useStateTheme = () => useRecoilState(theme)
const useTheme = () => useRecoilValue(theme)
const useSetTheme = () => useSetRecoilState(theme)

export { useStateTheme, useTheme, useSetTheme }
