import { ReactElement } from "react"

import styled from "styled-components"

import Footer from "./Footer/Footer"
import Main from "./Main/Main"
import NavBar from "./NavBar/NavBar"
interface LayoutProp {
    children: ReactElement
}

const Layout = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    min-height: 100vh;
`

function MainLayout({ children }: LayoutProp) {
    return (
        <Layout>
            <NavBar />
            <Main>{children}</Main>
            {/* <Footer /> */}
        </Layout>
    )
}

export default MainLayout
