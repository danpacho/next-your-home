import { PageType } from "@/pages"
import Image from "next/image"
import styled from "styled-components"

type BackgroundImgaeURLType = {
    [type in PageType]: {
        light: string
        dark: string
    }
}

const BACKGROUND_IMAGE_URL: BackgroundImgaeURLType = {
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
    isLight
        ? BACKGROUND_IMAGE_URL[pageType].light
        : BACKGROUND_IMAGE_URL[pageType].dark

const BackgrounContainerPosition = styled.div`
    position: fixed;
    top: 0;
    right: 0;

    width: 100%;
    height: 100%;

    z-index: ${(p) => p.theme.zBackground};
    user-select: none;
`

const BackgroundContainer = styled.div`
    position: relative;
    width: inherit;
    height: inherit;
`

const BackgroundImage = styled(Image)``

interface MainbackgroundProps {
    pageType: PageType
    isLight: boolean
}
function MainBackground({ isLight, pageType }: MainbackgroundProps) {
    return (
        <BackgrounContainerPosition>
            <BackgroundContainer>
                <BackgroundImage
                    src={getBackgroundimageURL(pageType, isLight)}
                    layout="fill"
                    priority
                    objectFit="cover"
                    objectPosition="center"
                    quality={100}
                    alt="background-image"
                />
            </BackgroundContainer>
        </BackgrounContainerPosition>
    )
}

export default MainBackground
