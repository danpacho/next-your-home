import { useState } from "react"
import styled from "styled-components"

const HellowContainer = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 1.5rem;
`
const HellowTitle = styled.h1`
    font-size: ${(props) => props.theme.xxlg};
    font-weight: 700;
`

const HellowNumber = styled.h2`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 50px;
    height: 50px;

    font-size: ${(props) => props.theme.xlg};
    background-color: ${(props) => props.theme.teal7};
    color: ${(props) => props.theme.white};
    font-weight: 900;

    align-self: center;
    border-radius: 35%;
`

const CustomeButton = styled.button`
    transition: background-color ease-in-out 0.25s;

    background-color: ${(props) => props.theme.blue3};
    width: 100px;
    height: 50px;
    padding: 5px;
    border-radius: 2.5px;

    &:hover {
        background-color: aliceblue;
    }

    &:active {
        border: 2px solid ${(props) => props.theme.blue3};
    }
`

const CustomeInput = styled.input`
    transition: background-color, border ease-in-out 0.25s;

    width: 100px;
    height: 35px;
    background-color: ${(props) => props.theme.white};
    border: 2px solid skyblue;
    border-radius: 2.5px;

    &:focus {
        border: 3px solid ${(props) => props.theme.teal6};
    }
`

function Home() {
    const [number, setNumber] = useState(0)
    return (
        <HellowContainer>
            <HellowTitle>Hola Blog 😊!</HellowTitle>
            <CustomeButton onClick={() => setNumber((num) => num + 1)}>
                Click Me!
            </CustomeButton>
            <HellowNumber>{number}</HellowNumber>
            <CustomeInput placeholder="Text!" />
        </HellowContainer>
    )
}

export default Home
