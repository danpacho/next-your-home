import pallete from "@/styles/utils/pallete"
import { atom, useRecoilState, useRecoilValue } from "recoil"

const DEFAULT_COLOR = pallete.gray4
const focusingPageColor = atom<string>({
    key: "focusingPageColor",
    default: DEFAULT_COLOR,
})

export const useStateFocusingPageColor = () => useRecoilState(focusingPageColor)

export const useFocusingPageColor = () => useRecoilValue(focusingPageColor)
