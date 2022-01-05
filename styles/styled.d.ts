import "styled-components"
import { CommonThemeProperty } from "@styles/utils/CustomeTheme"

declare module "styled-components" {
    export interface DefaultTheme extends CommonThemeProperty {
        //* 색 설정
        background: string
        color: string

        //* border 속성
        borderRadius: string
        borderWidth: string
        borderColor: string

        //* shadow
    }
}
