import styled from "styled-components"
import media from "@styles/utils/media"

import Link from "next/link"

import { IsLight } from "@typing/theme"

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
        height: fit-content;
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
    font-weight: 400;
    text-transform: capitalize;

    cursor: pointer;

    ${media.widePhone} {
        font-size: ${(p) => p.theme.xsm};
        font-weight: 500;
        margin-left: 0.5rem;
    }
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    gap: 0.35rem;

    ${media.widePhone} {
        gap: 0.25rem;
    }
`
const AllCategoryLinkBtn = styled.button`
    transition: background-color cubic-bezier(0.075, 0.82, 0.165, 1) 0.35s;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 0.5rem;

    padding: 0.5rem 0.65rem;

    color: ${(p) => p.theme.fontColor};
    font-size: ${(p) => p.theme.sm};

    border-radius: ${({ theme }) => theme.bsm};

    background-color: transparent;
    &:hover {
        background-color: ${({ theme }) =>
            `${theme.containerBackgroundColor}${theme.opacity80}`};
    }

    ${media.widePhone} {
        font-weight: 500;
        font-size: ${(p) => p.theme.xsm};

        &:hover {
            background-color: transparent;
        }
    }
`
const RowDivider = styled.div`
    display: block;
    width: 1px;

    height: 12px;
    background-color: ${(p) => p.theme.fontColor};

    ${media.widePhone} {
        width: 1px;
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
                    <AllCategoryLinkBtn
                        type="button"
                        aria-label="all category button"
                    >
                        Category
                    </AllCategoryLinkBtn>
                </Link>
                <RowDivider />
                <ThemeButton />
            </ButtonContainer>
        </NavContainer>
    )
}

export default NavBar
