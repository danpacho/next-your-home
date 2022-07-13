import styled from "styled-components"
import media from "@styles/utils/media"

import React, { Dispatch, ReactElement, SetStateAction } from "react"

import { usePointerInteraction } from "@hooks/index"

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
    top: ${({ top }) => (top ? `${top}px` : "unset")};
    bottom: ${({ bottom }) => (bottom ? `${bottom}px` : "unset")};
    left: ${({ left }) => (left ? `${left}px` : "unset")};
    right: ${({ right }) => (right ? `${right}px` : "unset")};

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
            {...usePointerInteraction({
                pointerStateSetter: setActive,
            })}
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
