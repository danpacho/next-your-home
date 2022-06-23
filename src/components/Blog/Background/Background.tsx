import { PageType } from "@typing/page/type"

import {
    CategoryBackground,
    PostBackground,
    HomeBackground,
    ProfileBackground,
} from "./SVGBackground/Assets"

import { useAtoms, _atom, _slector } from "@lib/jotai"

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
    const { isLightState } = useAtoms(_slector("isLight"))

    return <>{BACKGROUND_SVG[pageType](focusingPageColorState, isLightState)}</>
}

export default Background
