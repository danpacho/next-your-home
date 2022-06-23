import { ColorProps, IsLight } from "@typing/theme"
import { SVGProps } from "react"

export default interface SVGBackgroundProps
    extends SVGProps<SVGSVGElement>,
        IsLight,
        ColorProps {}
