import animation from "@/styles/utils/animation"
import { ReactElement } from "react"
import styled from "styled-components"
import Footer from "./Footer/Footer"
import NavBar from "./NavBar/NavBar"

interface LayoutProps {
    children: ReactElement
}

const MainLayout = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 2.5rem 0;

    animation: ${animation.fadeIn} 1s ease-out;
`

function Layout({ children }: LayoutProps) {
    return (
        <>
            <NavBar />
            <MainLayout>{children}</MainLayout>
            <Footer />
        </>
    )
}

export default Layout
