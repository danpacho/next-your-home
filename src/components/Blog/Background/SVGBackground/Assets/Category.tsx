import {
    SVGContainer,
    SVGBackgroundProps,
    SVGPath,
    SvgGradientStyle,
} from "../common"

import { useColorSet } from "@hooks/index"

const GRADIENT_ID = {
    top: "CATEGORY_TOP",
    bottom: "CATEGORY_BOTTOM",
}

const CategoryBackground = (props: SVGBackgroundProps) => {
    const { isLight, _color } = props
    const { light } = useColorSet(_color)

    return (
        <SVGContainer
            viewBox="0 0 1440 1024"
            preserveAspectRatio="xMinYMin slice"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            isLight={isLight}
        >
            <g>
                <SVGPath
                    //* top right
                    d="M1476 323.072c-44.37-3.243-88.92-6.315-123.05-25.771-34.3-19.626-58.37-55.637-88.75-85.504-30.38-29.866-67.07-53.93-86.7-88.234-19.62-34.304-22.01-78.848-24.57-123.563H1476v323.072Z"
                    fill={`url(#${GRADIENT_ID.top})`}
                />
                <SVGPath
                    //* bottom left
                    d="M-60 700.928c42.155 4.779 84.48 9.557 123.563 24.576 39.253 15.019 75.264 40.448 103.253 71.68 27.989 31.061 47.787 68.096 62.464 107.008 14.677 38.741 24.235 79.36 33.792 119.808H-60V700.928Z"
                    fill={`url(#${GRADIENT_ID.bottom})`}
                />
            </g>
            <defs>
                <SvgGradientStyle
                    ID={GRADIENT_ID.top}
                    startColor={light.middle}
                    endColor={light.low}
                    position={{
                        x1: 1,
                        y1: 0,
                        x2: 0,
                        y2: 1,
                    }}
                />
                <SvgGradientStyle
                    ID={GRADIENT_ID.bottom}
                    startColor={light.high}
                    endColor={light.middle}
                    position={{
                        x1: 0,
                        y1: 1,
                        x2: 1,
                        y2: 0,
                    }}
                />
            </defs>
        </SVGContainer>
    )
}

export default CategoryBackground
