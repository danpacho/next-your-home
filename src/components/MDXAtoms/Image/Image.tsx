import React from "react"
import NextImage from "next/image"
import styled from "styled-components"
import shadow from "@styles/utils/shadow"

interface ImageProps {
    src: string
    alt: string
    title: string
}

const ImageWrap = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;

    & > span {
        transition: box-shadow ease-out 0.5s;
        box-shadow: ${shadow.shadowMd};
        border-radius: ${(p) => p.theme.bmd};

        &:hover {
            box-shadow: ${shadow.shadowLg};
        }
    }
`
const NextImageStyled = styled(NextImage)`
    transition: transform ease-out 0.25s;

    &:hover {
        transform: scale(1.05) !important;
    }
`
const ImageTitle = styled.span`
    color: ${(p) => p.theme.gray5};
    text-decoration: underline;
`
function Image({ src, alt, title }: ImageProps) {
    const [filteredAlt, width, height]: string[] = alt
        .split(":")
        .map((text) => text.trim())

    return (
        <>
            <ImageWrap>
                <NextImageStyled
                    width={width}
                    height={height}
                    src={src}
                    alt={filteredAlt}
                    quality={75}
                    priority
                    onContextMenu={(e) => e.preventDefault()}
                />
            </ImageWrap>
            <ImageTitle>{title}</ImageTitle>
        </>
    )
}

export default Image
