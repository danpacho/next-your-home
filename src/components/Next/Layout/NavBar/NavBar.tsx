import styled from "styled-components"
import media from "@styles/utils/media"

import Link from "next/link"

import { IsLight } from "@typing/theme"

import { Button } from "@components/UI/Atoms/Button"
import { ThemeButton } from "@components/UX/ThemeButton"

import { useAtoms, _slector } from "@lib/jotai"

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
        position: static;
        height: 2.25rem;
        margin-top: 1.5rem;

        background-color: ${(p) =>
            `${p.theme.containerBackgroundColor}${p.theme.themeHexOpacity}`};
        backdrop-filter: blur(5px);

        border: 0.1rem solid ${({ theme }) => theme.themePrimaryColor};
        border-radius: ${(p) => p.theme.bsm};

        box-shadow: ${(p) => p.theme.shadowXxsm};

        z-index: ${(p) => p.theme.zContnet};
    }
`

const BlogTitle = styled.header<IsLight>`
    font-size: ${(p) => p.theme.md};
    text-transform: capitalize;

    cursor: pointer;

    ${media.widePhone} {
        font-size: ${(p) => p.theme.sm};
        font-weight: 500;
        margin-left: 0.5rem;
    }
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    gap: 0.5rem;

    ${media.widePhone} {
        gap: 0.25rem;
        margin-right: 0.25rem;
    }
`
const RowDivider = styled.div`
    display: block;

    width: 1px;
    height: 12px;

    background-color: ${(p) => p.theme.headerFontColor};

    ${media.widePhone} {
        height: 10px;
    }
`

function NavBar() {
    const { isLightState: isLight } = useAtoms(_slector("isLight"))

    return (
        <NavContainer>
            <Link href="/" passHref>
                <BlogTitle isLight={isLight}>{config.author.name}</BlogTitle>
            </Link>
            <ButtonContainer>
                <Link passHref href="/category">
                    <Button ariaLabel="all category button">Category</Button>
                </Link>
                <RowDivider />
                <ThemeButton />
            </ButtonContainer>
        </NavContainer>
    )
}

export default NavBar
