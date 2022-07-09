import styled from "styled-components"
import media from "@styles/utils/media"

import { useColorSet } from "@hooks/index"

import {
    SVGContainer,
    SVGBackgroundProps,
    SVGPath,
    SvgGradientStyle,
} from "../common"

const PostBackgroundContainer = styled(SVGContainer)`
    ${media.widePhone} {
        transform: rotate(180deg);
    }
`
const LastPath = styled(SVGPath)`
    ${media.widePhone} {
        transform: scale(0.6) translate(0, 70%);
    }
`

const GRADIENT_ID = {
    top: "POST_TOP",
    bottom: "POST_BOTTOM",
}

const PostBackground = (props: SVGBackgroundProps) => {
    const { isLight, _color } = props
    const { light, dark } = useColorSet(_color)
    return (
        <PostBackgroundContainer
            viewBox="0 0 1440 1024"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMinYMin slice"
            isLight={isLight}
        >
            <g>
                <SVGPath
                    d="M1536 646.144c-88.92-6.315-177.66-12.629-246.27-51.712-68.44-39.083-116.57-110.933-177.33-170.837-60.75-59.904-134.139-107.691-173.393-176.299C899.925 178.688 894.805 89.259 889.855 0H1536v646.144Z"
                    fill={`url(#${GRADIENT_ID.top})`}
                />
                <LastPath
                    d="M0 700.928c42.155 4.779 84.48 9.557 123.563 24.576 39.253 15.019 75.264 40.448 103.253 71.68 27.989 31.061 47.787 68.096 62.464 107.008 14.677 38.741 24.235 79.36 33.792 119.808H0V700.928Z"
                    fill={`url(#${GRADIENT_ID.bottom})`}
                />
            </g>
            <defs>
                <SvgGradientStyle
                    ID={GRADIENT_ID.top}
                    startColor={isLight ? light.low : dark.low}
                    endColor={isLight ? light.high : dark.high}
                />
                <SvgGradientStyle
                    ID={GRADIENT_ID.bottom}
                    startColor={isLight ? light.low : dark.high}
                    endColor={isLight ? light.high : dark.low}
                    position={{
                        x1: 0,
                        x2: 0,
                        y1: 0,
                        y2: 1,
                    }}
                />
            </defs>
        </PostBackgroundContainer>
    )
}

export default PostBackground
