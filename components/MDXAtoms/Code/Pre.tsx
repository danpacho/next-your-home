import media from "@/styles/utils/media"
import styled from "styled-components"

const PreStyled = styled.pre`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;

    margin: 1rem 0;
`

function Pre(props: any) {
    return <PreStyled {...props} />
}

export default Pre
