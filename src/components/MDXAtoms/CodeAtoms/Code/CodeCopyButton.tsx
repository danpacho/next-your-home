import styled from "styled-components"
import media from "@styles/utils/media"

import { useState } from "react"

import { IsLight } from "@typing/theme"

import { useClipboard, useTimeout } from "@hooks/index"

import { useThemeIsLight } from "@lib/atoms/theme/theme.state"

const CodeContentBox = styled.div`
    position: absolute;

    top: 0rem;
    left: 0rem;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0.35rem 0.5rem;
    height: 1rem;

    background-color: ${({ theme }) => `${theme.blue5}${theme.opacity20}`};

    border-radius: ${({ theme }) => `${theme.bsm} 0 ${theme.bsm} 0`};

    color: ${(props) => props.theme.white};
    font-weight: 800;
    font-size: ${(props) => props.theme.sm};
    letter-spacing: 0.05rem;

    user-select: none;

    ${media.widePhone} {
        font-size: ${(p) => p.theme.xsm};
    }
`

const CopyButton = styled.button<IsLight>`
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
    border: 0.15rem solid ${(props) => props.theme.blue6};

    &:hover {
        border-color: ${(props) => props.theme.blue5};
    }

    ${media.widePhone} {
        font-size: ${(p) => p.theme.xsm};
        padding-top: 0;
    }
`

const SuccessP = styled.p`
    color: ${(p) => p.theme.teal7};
`

interface CopyContentProp {
    code: string
}
function CodeCopyButton({ code }: CopyContentProp) {
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
            isLight={useThemeIsLight()}
        >
            <p>{!isCopySuccess && "📝"}</p>
            <SuccessP>{isCopySuccess && "Copied ✅"}</SuccessP>
        </CopyButton>
    )
}

export { CodeCopyButton, CodeContentBox }
