import { PageType } from "@typing/page/type"

import { useFocusingPageColor } from "@lib/atoms/pageColor/pageColor.state"
import { useThemeIsLight } from "@lib/atoms/theme/theme.state"

import {
    CategoryBackground,
    PostBackground,
    HomeBackground,
    ProfileBackground,
} from "./SVGBackground/Assets"

const BACKGROUND_SVG: {
    [key in PageType]: (color: string, isLight: boolean) => React.ReactNode
} = {
    Category: (color, isLight) =>
        isLight ? (
            <CategoryBackground mainColor={color} isLight={isLight} />
        ) : (
            <HomeBackground mainColor={color} isLight={isLight} />
        ),

    Post: (color, isLight) => (
        <PostBackground mainColor={color} isLight={isLight} />
    ),
    Home: (color, isLight) => (
        <HomeBackground mainColor={color} isLight={isLight} />
    ),
    ErrorPage: (color, isLight) => (
        <HomeBackground mainColor={color} isLight={isLight} />
    ),
    Profile: (color, isLight) => (
        <ProfileBackground isLight={isLight} mainColor={color} />
    ),
}

interface MainTransformBackgroundProps {
    pageType: PageType
}
function Background({ pageType }: MainTransformBackgroundProps) {
    const focusingPageColor = useFocusingPageColor()
    const isLight = useThemeIsLight()
    return <>{BACKGROUND_SVG[pageType](focusingPageColor, isLight)}</>
}

export default Background
