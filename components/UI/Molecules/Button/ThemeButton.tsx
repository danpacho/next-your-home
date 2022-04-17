import { useEffect } from "react"

import styled from "styled-components"
import animation from "@/styles/utils/animation"
import media from "@/styles/utils/media"
import shadow from "@/styles/utils/shadow"

import { IsLight, ThemeMode } from "@/types/theme"

import { useToggle, useWindowTheme } from "@/hooks"
import { useSetTheme, useTheme } from "@/lib/atoms/theme/theme.state"

import { LightIcon, StarIcon } from "../../Atoms/Icons"

const ThemeButtonContainer = styled.button<IsLight>`
    transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.35s;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    gap: 0.5rem;

    width: fit-content;
    height: fit-content;

    padding: 0.5rem 0.65rem;

    background-color: ${({ theme }) =>
        `${theme.containerBackgroundColor}${theme.opacity60}`};
    backdrop-filter: blur(15px);

    box-shadow: ${shadow.shadowXxsm};
    border-radius: ${({ theme, isLight }) =>
        isLight
            ? `${theme.blg} ${theme.bsm} ${theme.blg} ${theme.bsm}`
            : `${theme.bsm} ${theme.blg} ${theme.bsm} ${theme.blg}`};
    color: ${(p) => (!p.isLight ? p.theme.gray1 : p.theme.gray10)};

    svg {
        fill: ${(p) => (!p.isLight ? p.theme.gray1 : p.theme.trueDeepDark)};
        stroke: ${(p) => (!p.isLight ? p.theme.gray1 : p.theme.trueDeepDark)};
        animation: ${animation.scaleRotation} 0.65s
            cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    p {
        font-size: ${(p) => p.theme.xsm};
        animation: ${animation.boxZoom} 0.6s
            cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    ${media.widePhone} {
        padding: 0.05rem 0.25rem 0.05rem 0.5rem;
        margin-right: 0.45rem;

        background-color: transparent;
        border-left: 1px solid
            ${({ theme, isLight }) =>
                !isLight ? theme.gray1 : theme.trueDeepDark};

        border-radius: unset;
        backdrop-filter: unset;
        box-shadow: unset;

        svg {
            fill: ${(p) => (!p.isLight ? p.theme.gray1 : p.theme.trueDeepDark)};
            stroke: ${(p) => !p.isLight && p.theme.trueDeepDark};
        }
    }
`

function ThemeButton() {
    const windowTheme = useWindowTheme()
    const { toggleValue, setToggle } = useToggle<ThemeMode>(
        ["dark", "light"],
        windowTheme
    )

    const setTheme = useSetTheme()

    useEffect(() => {
        setTheme(toggleValue)
    }, [toggleValue, setTheme])

    useEffect(() => {
        setTheme(windowTheme)
    }, [windowTheme, setTheme])

    return (
        <ThemeButtonContainer
            type="button"
            aria-label="theme button"
            onClick={() => setToggle()}
            isLight={useTheme() === "light"}
        >
            {toggleValue === "light" && (
                <>
                    <LightIcon
                        width="16px"
                        height="16px"
                        shapeRendering="geometricPrecision"
                    />
                    <p>Light</p>
                </>
            )}
            {toggleValue === "dark" && (
                <>
                    <StarIcon
                        width="16px"
                        height="16px"
                        shapeRendering="geometricPrecision"
                    />
                    <p>Dark</p>
                </>
            )}
        </ThemeButtonContainer>
    )
}

export default ThemeButton
