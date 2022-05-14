import styled from "styled-components"

import { useMemo } from "react"

import {
    SVGContainer,
    SVGBackgroundProps,
    SVGPath,
    SvgGradientStyle,
    getColorSet,
} from "../common"
import { IsLight } from "@typing/theme"

const CategorySVGContainer = styled(SVGContainer)<IsLight>`
    transition: background-color ease-out 0.5s;
    background-color: ${(p) => !p.isLight && p.theme.backgroundDark};
`
const GRADIENT_ID = {
    top: {
        small: "CATEGORY_TOP_SMALL_PATH_GRADIENT_ID",
        big: "CATEGORY_TOP_BIG_PATH_GRADIENT_ID",
    },
    bottom: {
        small: "CATEGORY_BOTTOM_SMALL_PATH_GRADIENT_ID",
        big: "CATEGORY_BOTTOM_BIG_PATH_GRADIENT_ID",
    },
}

const CategoryBackground = (props: SVGBackgroundProps) => {
    const { isLight, mainColor } = props
    const { light, dark } = useMemo(() => getColorSet(mainColor), [mainColor])

    return (
        <CategorySVGContainer
            viewBox="0 0 1440 1024"
            preserveAspectRatio="xMinYMin slice"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            isLight={isLight}
        >
            <g>
                <SVGPath
                    //* top left - big
                    d="M1476 323.072c-44.37-3.243-88.92-6.315-123.05-25.771-34.3-19.626-58.37-55.637-88.75-85.504-30.38-29.866-67.07-53.93-86.7-88.234-19.62-34.304-22.01-78.848-24.57-123.563H1476v323.072Z"
                    fill={`url(#${GRADIENT_ID.top.big})`}
                />
                <SVGPath
                    //* top left - small
                    d="M1476 646.144c-88.92-6.315-177.66-12.629-246.27-51.712-68.44-39.083-116.57-110.933-177.32-170.837-60.762-59.904-134.149-107.691-173.402-176.299C839.925 178.688 834.805 89.259 829.856 0H1476v646.144Z"
                    fill={`url(#${GRADIENT_ID.top.small})`}
                />

                <SVGPath
                    //* bottm right - big
                    d="M-60 377.856c84.48 9.557 168.96 19.115 247.296 49.152 78.336 30.208 150.528 80.896 206.507 143.189 55.808 62.464 95.573 136.534 124.928 214.187 29.354 77.483 48.298 158.549 67.413 239.616H-60V377.856Z"
                    fill={`url(#${GRADIENT_ID.bottom.big})`}
                />
                {/* <SVGPath
                    //* bottom right -small
                    //* conditional option
                    d="M-60 700.928c42.155 4.779 84.48 9.557 123.563 24.576 39.253 15.019 75.264 40.448 103.253 71.68 27.989 31.061 47.787 68.096 62.464 107.008 14.677 38.741 24.235 79.36 33.792 119.808H-60V700.928Z"
                    fill={`url(#${GRADIENT_ID.bottom.small})`}
                /> */}
            </g>
            <defs>
                <SvgGradientStyle
                    ID={GRADIENT_ID.top.big}
                    startColor={light.low}
                    endColor={light.high}
                    position={{
                        x1: 1,
                        y1: 0,
                        x2: 0,
                        y2: 1,
                    }}
                />
                <SvgGradientStyle
                    ID={GRADIENT_ID.top.small}
                    startColor={light.middle}
                    endColor={light.high}
                    position={{
                        x1: 1,
                        y1: 0,
                        x2: 0,
                        y2: 1,
                    }}
                />
                <SvgGradientStyle
                    ID={GRADIENT_ID.bottom.big}
                    startColor={light.low}
                    endColor={light.middle}
                    position={{
                        x1: 1,
                        y1: 0,
                        x2: 0,
                        y2: 1,
                    }}
                />
                <SvgGradientStyle
                    ID={GRADIENT_ID.bottom.small}
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
        </CategorySVGContainer>
    )
}

export default CategoryBackground
