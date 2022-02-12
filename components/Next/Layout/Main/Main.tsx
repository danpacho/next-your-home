import animation from "@/styles/utils/animation"
import { ReactElement } from "react"
import styled from "styled-components"

const MainLayout = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    min-width: 100%;

    padding: 2.5rem 0;

    animation: ${animation.fadeIn} 1s ease-out;
`

interface MainProp {
    children: ReactElement
}

function Main({ children }: MainProp) {
    return <MainLayout>{children}</MainLayout>
}

export default Main
