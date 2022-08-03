import styled from "styled-components"

import { useCallback, useRef, useState } from "react"

import { useThemeMode, useTimeout } from "@hooks/index"

import { IsLight } from "@typing/theme"

import { CodeCopyButton } from "./Code/CodeUtil"

const CodeWrapper = styled.div`
    position: relative;
    width: 100%;

    margin: 1rem 0;
`

const CodeParentContainer = styled.pre<IsLight>`
    overflow-x: auto;
    padding: 2rem 0 1rem 0;

    border-radius: ${(p) => p.theme.bsm};
    background: ${(p) => (p.isLight ? "#192c3c" : "#011627")};
`

function Pre(props: any) {
    const codeRef = useRef<HTMLDivElement>(null)
    const [isHover, setIsHover] = useState(false)
    const [isCodeCopyVisible, setIsCodeCopyVisible] = useState(false)

    useTimeout({
        timeoutCondition: !isHover,
        timeoutFunction: () => setIsCodeCopyVisible(false),
        time: 1000,
    })

    const showButton = useCallback(() => {
        setIsHover(true)
        setIsCodeCopyVisible(true)
    }, [])

    const { isLight } = useThemeMode()
    return (
        <CodeWrapper
            ref={codeRef}
            onMouseEnter={showButton}
            onTouchStart={showButton}
            onMouseLeave={() => setIsHover(false)}
            onTouchEnd={() => setIsHover(false)}
        >
            <CodeParentContainer isLight={isLight} {...props} />
            {codeRef.current?.textContent && (
                <CodeCopyButton
                    code={codeRef.current.textContent}
                    isActivated={isCodeCopyVisible}
                />
            )}
        </CodeWrapper>
    )
}

export default Pre
