import styled from "styled-components"
import media from "@styles/utils/media"

import { useState } from "react"

import { useClipboard, useTimeout } from "@hooks/index"

import { IsLight } from "@typing/theme"
import { useThemeIsLight } from "@lib/atoms/theme/theme.state"

const CodeContentBox = styled.div`
    position: absolute;

    top: 0rem;
    left: 0rem;

    height: 1.85rem;
    padding-left: 0.5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    border-top: 0.15rem solid ${(props) => props.theme.blue7};
    border-left: 0.15rem solid ${(props) => props.theme.blue7};

    border-radius: ${({ theme }) => `${theme.bmd} 0 0 0`};

    color: ${(props) => props.theme.white};
    font-weight: 800;
    font-size: ${(props) => props.theme.sm};
    letter-spacing: 0.05rem;

    &:hover {
        border-color: ${(props) => props.theme.blue5};
    }

    user-select: none;

    ${media.widePhone} {
        font-size: ${(p) => p.theme.sm};
    }
`

const CopyButton = styled.button<IsLight>`
    position: absolute;
    top: 0rem;
    right: 0rem;

    display: flex;
    align-items: center;
    justify-content: center;

    width: fit-content;
    height: 2rem;

    font-size: ${(props) => props.theme.sm};
    font-weight: 800;
    color: ${(p) => p.theme.gray2};

    border-radius: ${({ theme }) => `0 ${theme.bmd} 0 0`};
    border-right: 0.15rem solid ${(props) => props.theme.blue7};
    border-top: 0.15rem solid ${(props) => props.theme.blue7};

    &:hover {
        border-color: ${(props) => props.theme.blue5};
    }

    ${media.widePhone} {
        top: 0rem;
        right: 0rem;
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
            <p>{!isCopySuccess && "Copy 📝"}</p>
            <SuccessP>{isCopySuccess && "Copied ✅ "}</SuccessP>
        </CopyButton>
    )
}

export { CodeCopyButton, CodeContentBox }
