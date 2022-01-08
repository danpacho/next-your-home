import { ReactElement } from "react"
import Footer from "./Footer/Footer"
import NavBar from "./NavBar/NavBar"

interface LayoutProps {
    children: ReactElement
}

function Layout({ children }: LayoutProps) {
    return (
        <>
            <NavBar />
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default Layout
