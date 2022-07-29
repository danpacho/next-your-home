import styled, { css } from "styled-components"
import media from "@styles/utils/media"

import NextImage from "next/image"

interface IsExternalImage {
    isExternalImage: boolean
}
const ImageContainer = styled.span<IsExternalImage>`
    display: flex;
    justify-content: center;
    align-items: center;

    max-width: max(85%, 25rem);

    ${(p) =>
        p.isExternalImage &&
        css`
            position: relative;
            width: 50vw;
            max-width: 30rem;
            aspect-ratio: 1/1;

            ${media.widePhone} {
                width: 75vw;
                max-width: unset;
            }
        `}

    & > span {
        border-radius: ${(p) => p.theme.bsm};
    }
`

const ImageTitle = styled.span`
    color: ${(p) => p.theme.gray5};
    font-size: ${(p) => p.theme.xsm};
    text-decoration: underline;

    ${media.widePhone} {
        display: none;
    }
`

interface ImageProps {
    alt: string
    src: string
}
function Image(props: ImageProps) {
    const { src, alt } = props
    const [pureAlt, width, height] = alt.split(":")?.map((text) => text.trim())
    const isExternalImage = src.startsWith("http")
    return (
        <>
            <ImageContainer isExternalImage={isExternalImage}>
                {isExternalImage ? (
                    <NextImage
                        {...props}
                        layout="fill"
                        quality={75}
                        loading="lazy"
                        crossOrigin="anonymous"
                        onContextMenu={(e) => e.preventDefault()}
                    />
                ) : (
                    <NextImage
                        {...props}
                        width={width}
                        height={height}
                        alt={pureAlt}
                        quality={75}
                        loading="lazy"
                        crossOrigin="anonymous"
                        onContextMenu={(e) => e.preventDefault()}
                    />
                )}
            </ImageContainer>
            <ImageTitle>{pureAlt}</ImageTitle>
        </>
    )
}

export default Image
