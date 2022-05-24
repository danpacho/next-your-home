import { PageType } from "@typing/page/type"

import {
    CategoryBackground,
    PostBackground,
    HomeBackground,
    ProfileBackground,
} from "./SVGBackground/Assets"

import { useAtom, useSlector, _atom, _slector } from "@lib/recoil"

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
    const { focusingPageColorState } = useAtom(_atom("focusingPageColor"))
    const { isLightState } = useSlector(_slector("isLight"))
    return <>{BACKGROUND_SVG[pageType](focusingPageColorState, isLightState)}</>
}

export default Background
