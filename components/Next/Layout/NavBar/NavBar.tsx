import media from "@/styles/utils/media"
import shadow from "@/styles/utils/shadow"
import Link from "next/link"
import styled from "styled-components"
import SvgMainLogo from "./MainLogo/MainLogo"

const NavContainer = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 70%;
    height: 5rem;

    ${media.mediumTablet} {
        width: 85%;
    }

    ${media.widePhone} {
        position: sticky;
        top: 1rem;

        width: 85%;
        height: fit-content;

        background-color: ${(p) => `${p.theme.white}${p.theme.opacity70}`};
        backdrop-filter: blur(5px);

        border: 1.5px solid ${(p) => p.theme.primary2};
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

const LogoTitle = styled.header`
    font-size: ${(p) => p.theme.md};
    font-weight: 400;
    color: ${(p) => p.theme.primary1};

    ${media.widePhone} {
        font-size: ${(p) => p.theme.sm};
        font-weight: 700;
    }
`

const MainLogo = styled(SvgMainLogo)`
    width: 1.5rem;
    height: 1.5rem;

    ${media.widePhone} {
        padding: 0.25rem;
        margin-left: 0.25rem;
    }
`

function NavBar() {
    return (
        <NavContainer>
            <Link href="/" passHref>
                <LogoContainer>
                    <MainLogo />
                    <LogoTitle>Danpacho</LogoTitle>
                </LogoContainer>
            </Link>
        </NavContainer>
    )
}

export default NavBar
