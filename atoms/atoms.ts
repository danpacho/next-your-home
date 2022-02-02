import { atom, useRecoilState } from "recoil"

const focusTitle = atom<string>({
    key: "focusTitle",
    default: "",
})

export const useFocusTitle = () => useRecoilState(focusTitle)
