import React from "react"
import NextImage from "next/image"
import styled from "styled-components"

interface ImageProps {
    src: string
    alt: string
    title: string
}

interface ImageContainerSize {
    width: string
    height: string
}

const ImageContainer = styled.div<ImageContainerSize>`
    position: relative;

    transition: transform 0.25s ease-out;

    width: max(30vw, 15rem);
    max-width: 30rem;
    aspect-ratio: ${({ width, height }) => Number(width) / Number(height)};

    border-radius: ${(props) => props.theme.bmd};

    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px,
        rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px;

    user-select: none;
    margin-bottom: 1rem;

    &:hover {
        transform: scale(1.025);
    }
`

const NextImageStyled = styled(NextImage)`
    border-radius: ${(props) => props.theme.bmd};
`

const ImageTitle = styled.div`
    color: ${(props) => props.theme.gray6};
`
const ImageSource = styled.a`
    transition: font-weight 0.15s ease-in;

    font-size: ${(props) => props.theme.md};
    font-weight: 700;
    color: ${(props) => props.theme.teal7};
    text-decoration: none;

    border-bottom: 0.15rem solid ${(props) => props.theme.teal7};

    &:active {
        color: ${(props) => props.theme.teal10};
    }

    &:hover {
        font-weight: 1000;
    }
`

function Image({ src, alt, title }: ImageProps) {
    const [filteredAlt, width, height]: string[] = alt.split(":")
    const isSrcIncluded = title.includes("src:")
    return (
        <>
            <ImageContainer width={width} height={height}>
                <NextImageStyled
                    layout="fill"
                    src={src}
                    alt={filteredAlt}
                    quality={100}
                    onContextMenu={(e) => e.preventDefault()}
                />
            </ImageContainer>
            {!isSrcIncluded && <ImageTitle>{title}</ImageTitle>}
            {isSrcIncluded && (
                <ImageSource href={title.replace("src:", "")}>
                    {title.replace("src:", "")}
                </ImageSource>
            )}
        </>
    )
}

export default Image
