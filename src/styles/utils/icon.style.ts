import { css } from "styled-components"
import media from "./media"

const iconHoverColor = (hoverColor: string) => `&:hover {
        fill: ${hoverColor};
}`

type IconColorOption = {
    color?: string
    hoverColor?: string
    strokeColor?: string
}

type IconCustomOption = {
    size: string
    mediaSize?: string
} & IconColorOption

const iconStyle = {
    md: (colorOption?: IconColorOption) => css`
        svg {
            fill: ${(p) => colorOption?.color ?? p.theme.fontColor};
            stroke: ${colorOption?.strokeColor ?? "transparent"};

            width: 1.15rem;
            height: 1.15rem;

            ${media.widePhone} {
                width: 1rem;
                height: 1rem;
            }

            ${colorOption?.hoverColor && iconHoverColor(colorOption.hoverColor)}
        }
    `,
    custom: (customOption: IconCustomOption) => css`
        svg {
            fill: ${(p) => customOption?.color ?? p.theme.fontColor};
            stroke: ${customOption?.strokeColor ?? "transparent"};

            width: ${customOption.size};
            height: ${customOption.size};

            ${customOption?.hoverColor &&
            iconHoverColor(customOption.hoverColor)}

            ${media.widePhone} {
                ${customOption?.mediaSize &&
                `width: ${customOption.mediaSize}; height: ${customOption.mediaSize};`}
            }
        }
    `,
}

export { iconStyle }
