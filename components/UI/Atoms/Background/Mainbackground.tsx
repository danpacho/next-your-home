import { PageType } from "@/utils/types/pageType"
import styled from "styled-components"

type BackgroundImgaeURLType = {
    [type in PageType]: {
        light: string
        dark: string
    }
}

const BACKGROUND_IMAGE_URL: BackgroundImgaeURLType = {
    Home: {
        light: "/assets/images/background/home/light.svg",
        dark: "/assets/images/background/home/dark.svg",
    },
    Category: {
        light: "/assets/images/background/category/light.svg",
        dark: "/assets/images/background/category/dark.svg",
    },
    Post: {
        light: "/assets/images/background/post/light.svg",
        dark: "/assets/images/background/post/dark.svg",
    },
    ErrorPage: {
        light: "/assets/images/background/home/light.svg",
        dark: "/assets/images/background/home/dark.svg",
    },
}
const getBackgroundimageURL = (pageType: PageType, isLight: boolean) =>
    isLight
        ? BACKGROUND_IMAGE_URL[pageType].light
        : BACKGROUND_IMAGE_URL[pageType].dark

const BackgrounSVG = styled.div<MainbackgroundProps>`
    position: fixed;
    top: 0;
    right: 0;

    width: 100%;
    height: 100%;

    z-index: ${(p) => p.theme.zBackground};
    user-select: none;

    background-image: ${({ isLight, pageType }) =>
        `url(${getBackgroundimageURL(pageType, isLight)})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`

interface MainbackgroundProps {
    pageType: PageType
    isLight: boolean
}
function MainBackground({ isLight, pageType }: MainbackgroundProps) {
    return <BackgrounSVG isLight={isLight} pageType={pageType} />
}

export default MainBackground
