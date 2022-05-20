import { useEffect } from "react"

import styled from "styled-components"
import animation from "@styles/utils/animation"
import media from "@styles/utils/media"

import { ThemeMode } from "@typing/theme"

import { useToggle, useWindowTheme } from "@hooks/index"
import { useStateTheme } from "@lib/atoms/theme/theme.state"

import { LightIcon, StarIcon } from "@components/UI/Atoms/Icons"

const ThemeButtonContainer = styled.button`
    transition: background-color cubic-bezier(0.075, 0.82, 0.165, 1) 0.35s;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    gap: 0.5rem;

    padding: 0.5rem 0.65rem;

    border-radius: ${({ theme }) => theme.bsm};

    font-size: ${(p) => p.theme.sm};
    color: ${(p) => p.theme.fontColor};

    background-color: transparent;
    &:hover {
        background-color: ${({ theme }) =>
            `${theme.containerBackgroundColor}${theme.opacity80}`};
    }

    svg {
        fill: ${(p) => p.theme.fontColor};
        stroke: ${(p) => p.theme.fontColor};
        animation: ${animation.boxZoom} 0.6s
            cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    p {
        animation: ${animation.boxZoom} 0.6s
            cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    ${media.widePhone} {
        padding: 0;
        padding-left: 0.5rem;
        margin-right: 0.45rem;
        font-weight: 500;

        font-size: ${(p) => p.theme.xsm};

        &:hover {
            background-color: transparent;
        }

        svg {
            fill: ${(p) => p.theme.fontColor};
        }
    }
`

function ThemeButton() {
    const windowTheme = useWindowTheme()
    const { toggleValue, setToggle } = useToggle<ThemeMode>(
        ["dark", "light"],
        windowTheme
    )

    const [theme, setTheme] = useStateTheme()

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
        >
            {theme === "light" && (
                <>
                    <p>Light</p>
                    <LightIcon width="16px" height="16px" />
                </>
            )}
            {theme === "dark" && (
                <>
                    <p>Dark</p>
                    <StarIcon width="16px" height="16px" />
                </>
            )}
        </ThemeButtonContainer>
    )
}

export default ThemeButton
