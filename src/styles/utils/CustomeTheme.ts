import { DefaultTheme } from "styled-components"

import pallete, { Pallete } from "./pallete"
import fontSize, { FontSize } from "./font"
import borderRadius, { BorderRadius } from "./borderRadius"
import shadow, { Shadow } from "./shadow"
import zIndexes, { ZIndexes } from "./zIndex"
import palleteOpacity, { PalleteOpacity } from "./palleteOpacity"

export interface CommonThemeProperty
    extends Pallete,
        PalleteOpacity,
        FontSize,
        BorderRadius,
        Shadow,
        ZIndexes {}

const commonThemeProperty: CommonThemeProperty = {
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
    fontColor: pallete.gray9,
    headerFontColor: pallete.trueDeepDark,
    descriptionFontColor: pallete.gray6,
    tagFontColor: pallete.gray1,
    themeOpacity: 0.2,
    themeHexOpacity: palleteOpacity.opacity20,
    themePrimaryColor: pallete.primary4,
}

const darkTheme: DefaultTheme = {
    //* common
    ...commonThemeProperty,
    containerBackgroundColor: "#1F1F24",
    containerBorderColor: pallete.gray7,
    fontColor: pallete.gray3,
    headerFontColor: pallete.gray1,
    descriptionFontColor: pallete.gray4,
    tagFontColor: pallete.trueDeepDark,
    themeOpacity: 0.5,
    themeHexOpacity: palleteOpacity.opacity50,
    themePrimaryColor: pallete.primary2,
}

export { lightTheme, darkTheme, commonThemeProperty }
