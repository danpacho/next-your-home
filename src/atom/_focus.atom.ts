import { atom } from "jotai"

import pallete from "@styles/utils/pallete"

const focusingTitle = atom("")
const focusingPageColor = atom(pallete.gray4)

export { focusingTitle, focusingPageColor }
