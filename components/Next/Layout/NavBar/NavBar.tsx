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
`

const LogoContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    gap: 1rem;
`

const LOGO_TEXT_COLOR = "#776350"

const LogoTitle = styled.h1`
    font-size: ${(p) => p.theme.md};
    font-weight: 400;
    color: ${LOGO_TEXT_COLOR};
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
