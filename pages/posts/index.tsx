import styled from "styled-components"

const Container = styled.div`
    width: 90%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

export default function Post(props: any) {
    return (
        <Container>
            <h1> 이것은 포스트</h1>
        </Container>
    )
}
