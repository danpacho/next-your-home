import { getStore, useStore } from "jotaish"

import { theme, isLight } from "./_theme.atom"
import { focusingTitle, focusingPageColor } from "./_focus.atom"
import { windowWidth } from "./_window.atom"

const Store = {
    //* theme
    theme,
    isLight,
    //* focus
    focusingPageColor,
    focusingTitle,
    //* window
    windowWidth,
} as const

const $ = getStore(Store)

export { $, useStore }
