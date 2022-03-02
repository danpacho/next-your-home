import MainBackground from "@/components/UI/Atoms/Background/Mainbackground"
import { PageType } from "@/pages"
import media from "@/styles/utils/media"
import { ReactElement } from "react"

import styled from "styled-components"

import Footer from "./Footer/Footer"
import Main from "./Main/Main"
import NavBar from "./NavBar/NavBar"
interface LayoutProp {
    children: ReactElement
    pageType: PageType
}

const Layout = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    height: 100%;
    min-height: 100vh;

    ${media.small} {
        min-height: auto;
        height: auto;
        padding: 3.5rem 0;
    }
`

function MainLayout({ children, pageType }: LayoutProp) {
    // const isLight = useThemeMode()
    return (
        <>
            <Layout>
                <NavBar />
                <Main>{children}</Main>
            </Layout>
            <MainBackground pageType={pageType} isLight />
        </>
    )
}

export default MainLayout
