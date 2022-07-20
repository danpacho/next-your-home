import { PageType } from "@typing/page/type"

import {
    CategoryBackground,
    PostBackground,
    HomeBackground,
    ProfileBackground,
} from "./SVGBackground/Assets"

import { useThemeMode } from "@hooks/index"
import { useAtoms, _atom } from "@lib/jotai"

const BACKGROUND_SVG: {
    [key in PageType]: (color: string, isLight: boolean) => React.ReactNode
} = {
    Category: (color, isLight) =>
        isLight ? (
            <CategoryBackground _color={color} isLight={isLight} />
        ) : (
            <HomeBackground _color={color} isLight={isLight} />
        ),

    Post: (color, isLight) => (
        <PostBackground _color={color} isLight={isLight} />
    ),
    Home: (color, isLight) => (
        <HomeBackground _color={color} isLight={isLight} />
    ),
    ErrorPage: (color, isLight) => (
        <HomeBackground _color={color} isLight={isLight} />
    ),
    Profile: (color, isLight) => (
        <ProfileBackground isLight={isLight} _color={color} />
    ),
}

interface MainTransformBackgroundProps {
    pageType: PageType
}
function Background({ pageType }: MainTransformBackgroundProps) {
    const { focusingPageColorState } = useAtoms(_atom("focusingPageColor"))
    const { isLight } = useThemeMode()
    return <>{BACKGROUND_SVG[pageType](focusingPageColorState, isLight)}</>
}

export default Background
