import styled from "styled-components"

import { useCallback, useRef, useState } from "react"

import { useTimeout } from "@hooks/index"

import { CodeCopyButton } from "./Code/CodeCopyButton"
import media from "@styles/utils/media"

const CodeWrapper = styled.div`
    position: relative;
    width: fit-content;
    min-width: 50%;
    max-width: 95%;

    margin: 2rem 0;

    ${media.widePhone} {
        min-width: 9rem;
        max-width: 100%;
    }
`

const CodeParentContainer = styled.pre`
    overflow-x: auto;
    padding: 2rem 0 1rem 0;

    border-radius: ${(p) => p.theme.bmd};
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

    return (
        <CodeWrapper
            ref={codeRef}
            onMouseEnter={showButton}
            onTouchStart={showButton}
            onMouseLeave={() => setIsHover(false)}
            onTouchEnd={() => setIsHover(false)}
        >
            <CodeParentContainer {...props} />
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
