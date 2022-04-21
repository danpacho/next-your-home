import Toast from "@/components/UX/Toast/Toast"
import { useClipboard } from "@/hooks"
import media from "@/styles/utils/media"
import { useState } from "react"
import styled from "styled-components"

const CodeContentBox = styled.div`
    position: absolute;

    top: 1rem;
    right: 1rem;

    display: flex;
    align-items: center;
    justify-content: center;

    width: fit-content;
    min-width: 1.5rem;
    height: fit-content;

    padding: 0.25rem 0.5rem;

    background-color: ${(p) => p.theme.gray10};

    border: 0.15rem solid ${(props) => props.theme.blue7};
    border-radius: ${(props) => props.theme.bsm};

    color: ${(props) => props.theme.white};
    font-weight: 700;
    font-size: ${(props) => props.theme.sm};
    letter-spacing: 0.05rem;

    &:hover {
        border-color: ${(props) => props.theme.blue5};
    }

    user-select: none;

    ${media.widePhone} {
        top: 0.5rem;
        right: 0.5rem;

        padding: 0.25rem;

        font-size: ${(p) => p.theme.xsm};
    }
`

const CopyButton = styled.button`
    transition: transform 0.075s ease-in;

    position: absolute;
    bottom: 1rem;
    right: 1rem;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 2rem;
    height: 2rem;

    padding: 0.25rem;

    font-size: ${(props) => props.theme.sm};
    font-weight: 700;
    color: ${(props) => props.theme.teal6};

    background-color: ${(p) => p.theme.gray10};

    border-radius: ${(props) => props.theme.bsm};
    border: 0.15rem solid ${(props) => props.theme.blue7};

    &:hover {
        border-color: ${(props) => props.theme.blue5};
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.9);
    }

    ${media.widePhone} {
        bottom: 0.5rem;
        right: 0.5rem;

        padding: 0.75rem;
        width: 1.25rem;
        height: 1.25rem;

        &:hover {
            transform: none;
        }

        &:active {
            transform: none;
        }
    }
`

interface CopyContentProp {
    code: string
}

const CopyInfo = {
    success: {
        message: "Copied!✂️",
        left: 90,
    },
    fail: {
        message: "Copy Failed❗️",
        left: 124,
    },
}

function CodeCopyButton({ code }: CopyContentProp) {
    const { copyTextToUser } = useClipboard()
    const [isCopySuccess, setIsCopySuccess] = useState(false)
    return (
        <>
            <CopyButton
                onClick={async () => {
                    if (!isCopySuccess) {
                        const { isCopySuccess } = await copyTextToUser(code)
                        setIsCopySuccess(isCopySuccess)
                    }
                }}
            >
                {!isCopySuccess && "📝"}
                {isCopySuccess && "✅"}
            </CopyButton>
            <Toast
                tooltipElement={
                    <CodeContentBox>
                        {isCopySuccess && <>{CopyInfo.success.message}</>}
                        {!isCopySuccess && <>{CopyInfo.fail.message}</>}
                    </CodeContentBox>
                }
                active={isCopySuccess}
                setActive={setIsCopySuccess}
                left={
                    isCopySuccess ? CopyInfo.success.left : CopyInfo.fail.left
                }
                bottom={24}
                appearSecond={2}
            />
        </>
    )
}

export { CodeCopyButton, CodeContentBox }
