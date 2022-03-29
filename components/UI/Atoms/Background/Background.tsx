import { useFocusingPageColor } from "@/lib/pageColor/pageColor.state"
import { PageType } from "@/types/page/type"
import { ReactElement } from "react"
import {
    CategoryBackground,
    PostBackground,
    HomeBackground,
} from "./SVGBackground/Assets"

const BACKGROUND_SVG: {
    [key in PageType]: (color: string, isLight: boolean) => ReactElement
} = {
    Category: (color, isLight) => (
        <CategoryBackground mainColor={color} isLight={isLight} />
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
}

interface MainTransformBackgroundProps {
    pageType: PageType
}
function Background({ pageType }: MainTransformBackgroundProps) {
    const focusingPageColor = useFocusingPageColor()
    return <>{BACKGROUND_SVG[pageType](focusingPageColor, true)}</>
}

export default Background
