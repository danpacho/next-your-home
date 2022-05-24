import { atom, selector } from "recoil"

import pallete from "@styles/utils/pallete"
import { ThemeMode } from "@typing/theme"

const AtomStore = {
    theme: atom<ThemeMode>({
        key: "themes",
        default: "dark",
    }),
    focusTitle: atom({
        key: "focusTitles",
        default: "",
    }),
    focusingPageColor: atom({
        key: "focusingPageColors",
        default: pallete.gray4,
    }),
} as const

const SlectorAtomStore = {
    isLight: selector({
        key: "isLights",
        get: ({ get }) => get(AtomStore.theme) === "light",
    }),
} as const

export { AtomStore, SlectorAtomStore }
