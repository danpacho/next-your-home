import { ReactElement } from "react"
import styled from "styled-components"

import media from "@/styles/utils/media"

import Main from "./Main/Main"
import NavBar from "./NavBar/NavBar"
import MainBackground from "@/components/UI/Atoms/Background/Mainbackground"
import { PageType } from "@/types/page/type"

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

        /* padding-top: 2rem; */
    }
`
interface LayoutProp {
    children: ReactElement
    pageType: PageType
}

function MainLayout({ children, pageType }: LayoutProp) {
    return (
        <>
            <Layout>
                <NavBar />
                <Main>{children}</Main>
            </Layout>
            <MainBackground pageType={pageType} isLight={true} />
        </>
    )
}

export default MainLayout
