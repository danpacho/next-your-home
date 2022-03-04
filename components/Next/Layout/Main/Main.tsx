import animation from "@/styles/utils/animation"
import media from "@/styles/utils/media"
import { ReactElement } from "react"
import styled from "styled-components"

const MainLayout = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    flex: 1;
    min-width: 100%;

    animation: ${animation.fadeIn} 1.25s ease-out;

    ${media.widePhone} {
        min-width: auto;
        width: 90%;
    }
`

interface MainProp {
    children: ReactElement
}

function Main({ children }: MainProp) {
    return <MainLayout>{children}</MainLayout>
}

export default Main
