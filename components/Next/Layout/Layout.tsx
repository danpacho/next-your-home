import { ReactElement } from "react"
import styled, { ThemeProvider } from "styled-components"

import media from "@/styles/utils/media"

import Background from "@/components/UI/Atoms/Background/Background"
import Main from "./Main/Main"
import NavBar from "./NavBar/NavBar"

import { PageType } from "@/types/page/type"

import { useTheme } from "@/lib/atoms/theme/theme.state"
import { darkTheme, lightTheme } from "@/styles/utils/CustomeTheme"

const Layout = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    height: 100%;
    min-height: 100vh;

    ${media.widePhone} {
        height: auto;
        max-height: 70%;
        min-height: min-content;
    }
`
interface LayoutProp {
    children: ReactElement
    pageType: PageType
}

function MainLayout({ children, pageType }: LayoutProp) {
    const isLight = useTheme() === "light"
    return (
        <ThemeProvider theme={isLight ? lightTheme : darkTheme}>
            <Layout>
                <NavBar />
                <Main>{children}</Main>
            </Layout>
            <Background pageType={pageType} />
        </ThemeProvider>
    )
}

export default MainLayout
