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
        transform: scale(0.65) translate(0, 55%);
    }
`

const GRADIENT_ID = "PROFILE_PATH_GRADIENT_ID"

const ProfileBackground = (props: SVGBackgroundProps) => {
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
            <LastPath
                d="M0 700.928c42.155 4.779 84.48 9.557 123.563 24.576 39.253 15.019 75.264 40.448 103.253 71.68 27.989 31.061 47.787 68.096 62.464 107.008 14.677 38.741 24.235 79.36 33.792 119.808H0V700.928Z"
                fill={`url(#${GRADIENT_ID})`}
            />
            <defs>
                <SvgGradientStyle
                    ID={GRADIENT_ID}
                    startColor={isLight ? light.low : dark.high}
                    endColor={isLight ? light.high : dark.low}
                    position={{
                        x1: 1,
                        y1: 0,
                        x2: 0,
                        y2: 1,
                    }}
                />
            </defs>
        </PostBackgroundContainer>
    )
}

export default ProfileBackground
