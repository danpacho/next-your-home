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
        ZIndexes {}

const commonThemeProperty: CommonThemeProperty = {
    ...width,
    ...pallete,
    ...fontSize,
    ...borderRadius,
    ...shadow,
    ...zIndexes,
    ...palleteOpacity,

    //* common Theme property
}

const lightTheme: DefaultTheme = {
    //* common
    ...commonThemeProperty,
    containerBackgroundColor: pallete.white,
    containerBorderColor: pallete.gray2,
    headerFontColor: pallete.trueDeepDark,
    descriptionFontColor: pallete.gray6,
    tagFontColor: pallete.gray1,
    themeOpacity: 0.3,
    themePrimaryColor: pallete.primary1,
}

const darkTheme: DefaultTheme = {
    //* common
    ...commonThemeProperty,
    containerBackgroundColor: "#1F1F24",
    containerBorderColor: pallete.gray5,
    headerFontColor: pallete.gray1,
    descriptionFontColor: pallete.gray4,
    tagFontColor: pallete.trueDeepDark,
    themeOpacity: 0.6,
    themePrimaryColor: pallete.primary3,
}

export { lightTheme, darkTheme, commonThemeProperty }
