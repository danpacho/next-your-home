import { SVGProps } from "react"

interface SVGBackgroundProps extends SVGProps<SVGSVGElement> {
    mainColor: string
    isLight: boolean
}

export default SVGBackgroundProps
