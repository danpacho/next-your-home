import styled from "styled-components"
import media from "@styles/utils/media"

import { useState } from "react"

import { IsLight } from "@typing/theme"

import { useClipboard, useTimeout, useThemeMode } from "@hooks/index"

const CodeContentBox = styled.div`
    position: absolute;

    top: 0rem;
    left: 0rem;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0.1rem 0.5rem;

    background-color: ${({ theme }) => `${theme.blue5}${theme.opacity20}`};

    border-radius: ${({ theme }) => `${theme.bxsm} 0 ${theme.bsm} 0`};

    color: ${(props) => props.theme.white};
    font-weight: 800;
    font-size: ${(props) => props.theme.sm};
    letter-spacing: 0.05rem;

    user-select: none;

    ${media.widePhone} {
        font-size: ${(p) => p.theme.xsm};
    }
`

const CopyButton = styled.button<IsLight & { isActivated: boolean }>`
    transition: all cubic-bezier(0.19, 1, 0.22, 1) 0.275s;

    visibility: ${(p) => (p.isActivated ? "visible" : "hidden")};
    opacity: ${(p) => (p.isActivated ? 1 : 0)};

    position: absolute;
    top: 0.5rem;
    right: 0.5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 2rem;
    height: 2rem;
    padding: 0.25rem;

    background-color: ${(p) => p.theme.gray10};

    font-size: ${(props) => props.theme.sm};

    border-radius: ${({ theme }) => theme.bxsm};
    border: 0.1rem solid ${(props) => props.theme.blue6};

    &:hover {
        border-color: ${(props) => props.theme.blue5};
    }

    &:active {
        transform: scale(0.9);
    }

    ${media.widePhone} {
        &:active {
            transform: none;
        }
    }
`

interface CopyContentProp {
    code: string
    isActivated: boolean
}
function CodeCopyButton({ code, isActivated }: CopyContentProp) {
    const { isLight } = useThemeMode()
    const { copyTextToUser } = useClipboard()
    const [isCopySuccess, setIsCopySuccess] = useState(false)

    useTimeout({
        timeoutCondition: isCopySuccess,
        timeoutFunction: () => setIsCopySuccess(false),
    })

    return (
        <CopyButton
            onClick={async () => {
                if (!isCopySuccess) {
                    const { isCopySuccess } = await copyTextToUser(code)
                    setIsCopySuccess(isCopySuccess)
                }
            }}
            isLight={isLight}
            isActivated={isActivated}
        >
            <p>{isCopySuccess ? "✅" : "📝"}</p>
        </CopyButton>
    )
}

export { CodeCopyButton, CodeContentBox }
