import media from "@styles/utils/media"
import styled from "styled-components"

const MainLayout = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    flex: 1;

    width: 100%;

    ${media.widePhone} {
        min-width: auto;
        width: 85%;
    }
`

interface MainProp {
    children: React.ReactElement
}

function Main({ children }: MainProp) {
    return <MainLayout>{children}</MainLayout>
}

export default Main
