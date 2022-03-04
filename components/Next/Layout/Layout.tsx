import { ReactElement } from "react"
import styled from "styled-components"

import media from "@/styles/utils/media"

import Main from "./Main/Main"
import NavBar from "./NavBar/NavBar"

const Layout = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    height: 100%;
    min-height: 100vh;

    ${media.widePhone} {
        min-height: auto;
        height: auto;
        padding-top: 2rem;
    }
`
interface LayoutProp {
    children: ReactElement
}

function MainLayout({ children }: LayoutProp) {
    return (
        <Layout>
            <NavBar />
            <Main>{children}</Main>
        </Layout>
    )
}

export default MainLayout
