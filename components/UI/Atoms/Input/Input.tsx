import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import Box from "../Box/Box"
import Button from "../Button/Button"

interface InputProps {
    inputTitle: string
    placeholder: string
    minLength: number
    maxLength: number
    defaultValue?: string
    onSubmit: () => void
    //* useState hook required
    setText: (text?: string) => void
}

const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    width: fit-content;
    height: fit-content;
    padding: 0.15rem;
`

const InputStyled = styled.input`
    width: 100%;
    height: 100%;

    ::placeholder {
        color: ${(p) => p.theme.gray3};
        font-weight: 400;
    }

    background-color: transparent;
`

function Input({
    inputTitle,
    placeholder,
    minLength,
    maxLength,
    defaultValue,
    onSubmit,
    setText,
}: InputProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    return (
        <Box
            innerContent={
                <InputContainer>
                    <InputStyled
                        type="text"
                        ref={inputRef}
                        title={inputTitle}
                        placeholder={placeholder}
                        minLength={minLength}
                        maxLength={maxLength}
                        defaultValue={defaultValue}
                        onSubmit={() => {
                            setText(inputRef.current?.value)
                            onSubmit()
                        }}
                    />
                    <Button
                        buttonStyleType="default"
                        innerContent={<p>{"->"}</p>}
                        onClick={onSubmit}
                    />
                </InputContainer>
            }
        />
    )
}

export default Input
