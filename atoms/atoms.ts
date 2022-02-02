import { atom, selector, useRecoilState, useRecoilValue } from "recoil"

export interface CurrentFocusingArray {
    title: string
    isFocusing: boolean
}

export const currentFocusingTitleArray = atom<CurrentFocusingArray[]>({
    key: "currentFocusingTitleArray",
    default: [],
})

export const useCurrentFocusingTitleArray = () =>
    useRecoilState(currentFocusingTitleArray)

const focusingTitle = selector({
    key: "focusingTitle",
    get: ({ get }) => {
        const currentFocusingTitle = get(currentFocusingTitleArray)
            .filter(({ isFocusing }) => isFocusing === true)
            .at(0)?.title
        if (currentFocusingTitle) return currentFocusingTitle
        return ""
    },
})

export const useFocusingTitle = () => useRecoilValue(focusingTitle)
