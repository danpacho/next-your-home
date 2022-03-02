import { PageType } from "@/pages"
import styled from "styled-components"

const MAIN_BACKGROUND_COLOR = {
    light: {
        from: "#FAFAFA",
        to: "#F3ECDA",
        strokeColor: "#EBEBEB",
        strokeWidth: 1.25,
    },
    dark: {
        from: "#FAFAFA",
        to: "#F3ECDA",
        strokeColor: "#EBEBEB",
        strokeWidth: 1.25,
    },
}

const switchTheme = (isLight: boolean) =>
    isLight ? MAIN_BACKGROUND_COLOR.light : MAIN_BACKGROUND_COLOR.dark

interface MainbackgroundProps extends BackgroundContainerStyle {}

type BackgroundImgaeType = {
    [type in PageType]: {
        light: string
        dark: string
    }
}

const BACKGROUND_IMAGE: BackgroundImgaeType = {
    Home: {
        light: "/assets/images/background/main/light.png",
        dark: "/assets/images/background/main/light.png",
    },
    Category: {
        light: "/assets/images/background/category/light.png",
        dark: "/assets/images/background/category/light.png",
    },
    Post: {
        light: "/assets/images/background/post/light.png",
        dark: "/assets/images/background/post/light.png",
    },
}
const getBackgroundimageURL = (pageType: PageType, isLight: boolean) =>
    isLight ? BACKGROUND_IMAGE[pageType].light : BACKGROUND_IMAGE[pageType].dark

interface BackgroundContainerStyle {
    pageType: PageType
    isLight: boolean
}
const BackgroundContainer = styled.div<BackgroundContainerStyle>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;

    background-repeat: no-repeat;
    background-size: cover;
    background-image: ${({ isLight, pageType }) =>
        `url(${getBackgroundimageURL(pageType, isLight)})`};
    z-index: ${(p) => p.theme.zBackground};
`

function MainBackground({ isLight, pageType }: MainbackgroundProps) {
    return <BackgroundContainer pageType={pageType} isLight={isLight} />
}

export default MainBackground
