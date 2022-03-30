import { DefaultTheme } from "styled-components"

import pallete, { Pallete } from "./pallete"
import width, { Width } from "./width"
import fontSize, { FontSize } from "./font"
import borderRadius, { BorderRadius } from "./borderRadius"
import shadow, { Shadow } from "./shadow"
import zIndexes, { ZIndexes } from "./zIndex"
import palleteOpacity, { PalleteOpacity } from "./palleteOpacity"

export interface CommonThemeProperty
    extends Pallete,
        PalleteOpacity,
        Width,
        FontSize,
        BorderRadius,
        Shadow,
        ZIndexes {
    fontSize: string
}

export interface ThemeMode {
    isLight: boolean
}

const commonThemeProperty: CommonThemeProperty = {
    ...width,
    ...pallete,
    ...fontSize,
    ...borderRadius,
    ...shadow,
    ...zIndexes,
    ...palleteOpacity,

    //* common Theme property
    fontSize: fontSize.md,
}

const lightTheme: DefaultTheme = {
    //* common
    ...commonThemeProperty,

    background: pallete.gray1,
    color: pallete.deepDark,

    borderWidth: commonThemeProperty.w1,
    borderColor: pallete.gray3,
    borderRadius: commonThemeProperty.bsm,
}

const darkTheme: DefaultTheme = {
    //* common
    ...commonThemeProperty,

    background: pallete.gray10,
    color: pallete.gray2,

    borderWidth: commonThemeProperty.w2,
    borderColor: pallete.gray8,
    borderRadius: commonThemeProperty.bmd,
}

export { darkTheme, lightTheme }
