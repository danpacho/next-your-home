import "styled-components"
import { CommonThemeProperty } from "@styles/utils/CustomeTheme"

declare module "styled-components" {
    export interface DefaultTheme extends CommonThemeProperty {
        containerBackgroundColor: string
        containerBorderColor: string
        fontColor: string
        headerFontColor: string
        descriptionFontColor: string
        tagFontColor: string
        themeOpacity: number
        themeHexOpacity: string
        themePrimaryColor: string
    }
}
