import media from "@/styles/utils/media"
import Link from "next/link"
import styled from "styled-components"
import MainLogo from "./MainLogo/MainLogo"

const NavContainer = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 70%;
    height: 5rem;
    cursor: pointer;

    ${media.widePhone} {
        width: 85%;
        height: fit-content;
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
`

const LOGO_TEXT_COLOR = "#776350"

const LogoTitle = styled.h1`
    font-size: ${(p) => p.theme.md};
    font-weight: 400;
    color: ${LOGO_TEXT_COLOR};

    ${media.widePhone} {
        font-weight: 800;
    }
`

function NavBar() {
    return (
        <Link href="/" passHref>
            <NavContainer>
                <LogoContainer>
                    <MainLogo />
                    <LogoTitle>Danpacho</LogoTitle>
                </LogoContainer>
            </NavContainer>
        </Link>
    )
}

export default NavBar
