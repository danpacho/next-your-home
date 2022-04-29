import {
    css,
    DefaultTheme,
    FlattenInterpolation,
    ThemeProps,
} from "styled-components"

interface ContainerStyle {
    default: () => FlattenInterpolation<ThemeProps<DefaultTheme>>
    success: () => FlattenInterpolation<ThemeProps<DefaultTheme>>
    fail: () => FlattenInterpolation<ThemeProps<DefaultTheme>>
    custome: () => null
}

export type ContainerStyleType = keyof ContainerStyle

const containerStyle: ContainerStyle = {
    default: () => css`
        border-color: ${(p) => p.theme.gray3};
        background-color: ${(p) => p.theme.gray1};

        &:hover {
            background-color: ${(p) => p.theme.white};
        }

        &:active {
            border-color: ${(p) => p.theme.gray4};
        }
    `,
    success: () => css`
        border-color: ${(p) => p.theme.teal4};
        background-color: ${(p) => p.theme.teal2};

        &:hover {
            background-color: ${(p) => p.theme.teal1};
        }

        &:active {
            border-color: ${(p) => p.theme.teal3};
        }
    `,
    fail: () => css`
        border-color: ${(p) => p.theme.red4};
        background-color: ${(p) => p.theme.red2};

        &:hover {
            background-color: ${(p) => p.theme.red1};
        }

        &:active {
            border-color: ${(p) => p.theme.red3};
        }
    `,
    custome: () => null,
}

export { containerStyle }
