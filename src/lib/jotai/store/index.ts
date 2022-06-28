import { atom } from "jotai"

import pallete from "@styles/utils/pallete"
import { ThemeMode } from "@typing/theme"

const AtomStore = {
    theme: atom<ThemeMode>("dark"),
    focusTitle: atom(""),
    focusingPageColor: atom(pallete.gray4),
    windowWidth: atom(0),
} as const

const SlectorAtomStore = {
    isLight: atom((get) => get(AtomStore.theme) === "light"),
} as const

export { AtomStore, SlectorAtomStore }
