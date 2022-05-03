import Link from "next/link"

import styled from "styled-components"
import media from "@styles/utils/media"
import shadow from "@styles/utils/shadow"

import { IsLight } from "@typing/theme"
import { useThemeIsLight } from "@lib/atoms/theme/theme.state"

import ThemeButton from "@components/UI/Molecules/Button/ThemeButton"
import MainLogo from "./MainLogo"

import { config } from "blog.config"

const NavContainer = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 70%;
    height: 5rem;

    color: ${({ theme }) => theme.themePrimaryColor};

    ${media.mediumTablet} {
        width: 85%;
    }

    ${media.widePhone} {
        position: sticky;
        top: 1rem;

        width: 85%;
        height: fit-content;

        background-color: ${(p) =>
            `${p.theme.containerBackgroundColor}${p.theme.opacity70}`};
        backdrop-filter: blur(5px);

        border: 1.5px solid ${({ theme }) => theme.themePrimaryColor};
        border-radius: ${(p) => p.theme.blg};

        box-shadow: ${shadow.shadowXxsm};

        z-index: ${(p) => p.theme.zContnet};
    }
`

const LogoContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    gap: 1rem;

    ${media.widePhone} {
        gap: 0.35rem;
    }

    cursor: pointer;
`

const LogoTitle = styled.header<IsLight>`
    font-size: ${(p) => p.theme.md};
    font-weight: 400;
    text-transform: capitalize;

    ${media.widePhone} {
        font-size: ${(p) => p.theme.sm};
        font-weight: 700;
    }
`

const MainLogoStyled = styled(MainLogo)`
    width: 1.5rem;
    height: 1.5rem;

    ${media.widePhone} {
        padding: 0.25rem;
        margin-left: 0.25rem;
    }
`

function NavBar() {
    const isLight = useThemeIsLight()
    return (
        <NavContainer>
            <Link href="/" passHref>
                <LogoContainer>
                    <MainLogoStyled />
                    <LogoTitle isLight={isLight}>
                        {config.author.name}
                    </LogoTitle>
                </LogoContainer>
            </Link>
            <ThemeButton />
        </NavContainer>
    )
}

export default NavBar
