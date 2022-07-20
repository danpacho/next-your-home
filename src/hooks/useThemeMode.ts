import { useAtoms, _slector } from "@lib/jotai"

function useThemeMode() {
    const { isLightState } = useAtoms(_slector("isLight"))
    return { isLight: isLightState }
}

export default useThemeMode
