import { SVGProps } from "react"

export default interface SVGBackgroundProps extends SVGProps<SVGSVGElement> {
    mainColor: string
    isLight: boolean
}
