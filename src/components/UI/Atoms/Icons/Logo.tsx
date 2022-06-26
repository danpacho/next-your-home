import * as React from "react"
import { SVGProps } from "react"

const SvgLogo = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width="1em"
        height="1em"
        viewBox="0 0 213 213"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <rect
            x={106.012}
            width={149.924}
            height={149.924}
            rx={35}
            transform="rotate(45 106.012 0)"
            fill="#776350"
        />
        <path
            d="M98.252 129.773v-8.281c0-2.114 1.727-3.828 3.856-3.828h7.784c1.023 0 2.003.404 2.727 1.121a3.815 3.815 0 0 1 1.129 2.707v8.281a3.287 3.287 0 0 0 .964 2.348 3.33 3.33 0 0 0 2.358.974h5.311a9.367 9.367 0 0 0 6.617-2.706 9.233 9.233 0 0 0 2.743-6.562v-23.592c0-1.99-.888-3.876-2.425-5.152L111.25 80.76a8.389 8.389 0 0 0-10.694.193L82.902 95.083a6.7 6.7 0 0 0-2.619 5.152v23.568c0 5.132 4.19 9.292 9.36 9.292h5.19c1.839.001 3.333-1.472 3.346-3.298l.073-.024Z"
            fill="#fff"
        />
    </svg>
)

export default SvgLogo
