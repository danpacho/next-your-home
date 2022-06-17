import styled from "styled-components"
import media from "@styles/utils/media"

import { useState } from "react"

import { IsLight } from "@typing/theme"

import { useClipboard, useTimeout } from "@hooks/index"

import { useAtoms, _slector } from "@lib/jotai"

const CodeContentBox = styled.div`
    position: absolute;

    top: 0rem;
    left: 0rem;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0.35rem 0.5rem;
    height: 1.75rem;

    background-color: ${({ theme }) => `${theme.blue5}${theme.opacity20}`};

    border-radius: ${({ theme }) => `${theme.bmd} 0 ${theme.bsm} 0`};

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

    min-width: 2rem;
    height: 2rem;
    padding: 0 0.25rem;

    background-color: ${(p) => p.theme.gray10};

    font-size: ${(props) => props.theme.sm};
    font-weight: 800;

    border-radius: ${({ theme }) => theme.bsm};
    border: 1.75px solid ${(props) => props.theme.blue6};

    &:hover {
        border-color: ${(props) => props.theme.blue5};
    }

    &:active {
        transform: scale(0.9);
    }

    ${media.widePhone} {
        font-size: ${(p) => p.theme.xsm};
        padding-top: 0;

        &:active {
            transform: none;
        }
    }
`

const SuccessP = styled.p`
    color: ${(p) => p.theme.teal7};
`

interface CopyContentProp {
    code: string
    isActivated: boolean
}
function CodeCopyButton({ code, isActivated }: CopyContentProp) {
    const { isLightState: isLight } = useAtoms(_slector("isLight"))

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
            <p>{!isCopySuccess && "📝"}</p>
            <SuccessP>{isCopySuccess && "Copied ✅"}</SuccessP>
        </CopyButton>
    )
}

export { CodeCopyButton, CodeContentBox }
