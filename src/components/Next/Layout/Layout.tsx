import styled, { ThemeProvider } from "styled-components"

import Main from "./Main/Main"
import NavBar from "./NavBar/NavBar"

import media from "@styles/utils/media"
import { darkTheme, lightTheme } from "@styles/utils/CustomeTheme"

import { PageType } from "@typing/page/type"

import { useThemeIsLight } from "@lib/atoms/theme/theme.state"

import Background from "@components/Blog/Background/Background"

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
    children: React.ReactElement
    pageType: PageType
}

function MainLayout({ children, pageType }: LayoutProp) {
    const isLight = useThemeIsLight()
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
