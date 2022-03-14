import media from "@/styles/utils/media"
import React, { Dispatch, ReactElement, SetStateAction } from "react"
import styled from "styled-components"

const TooltipButtonArea = styled.div`
    position: relative;

    width: fit-content;
    height: max-content;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
`

interface TooltipElementPostion {
    right?: number
    left?: number
    top?: number
    bottom?: number
}

const TooltipElement = styled.div<TooltipElementPostion>`
    position: absolute;
    top: ${({ top }) => top}px;
    bottom: ${({ bottom }) => bottom}px;
    left: ${({ left }) => left}px;
    right: ${({ right }) => right}px;

    width: fit-content;
    height: fit-content;
    min-width: 35px;
    min-height: 35px;

    display: flex;
    align-items: center;
    justify-content: center;

    ${media.widePhone} {
        display: none;
    }
`

export interface TooltipProps extends TooltipElementPostion {
    children: ReactElement
    tooltipElement: ReactElement
    active: boolean
    setActive: Dispatch<SetStateAction<boolean>>
    isUnvisibleElementClickAbled?: boolean
}

function Tooltip({
    children: parentContent,
    tooltipElement,
    active,
    setActive,
    top,
    bottom,
    left,
    right,
    isUnvisibleElementClickAbled = false,
}: TooltipProps) {
    return (
        <TooltipButtonArea
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            onTouchStart={() => setActive(true)}
            onTouchEnd={() => setActive(false)}
        >
            {parentContent}
            <TooltipElement
                onMouseEnter={(e) => {
                    e.stopPropagation()
                    setActive(isUnvisibleElementClickAbled)
                }}
                onMouseLeave={(e) => {
                    e.stopPropagation()
                    setActive(!isUnvisibleElementClickAbled)
                }}
                top={top}
                bottom={bottom}
                left={left}
                right={right}
            >
                {active && tooltipElement}
            </TooltipElement>
        </TooltipButtonArea>
    )
}

export default Tooltip
