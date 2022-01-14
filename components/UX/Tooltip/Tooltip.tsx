import React, { ReactElement } from "react"
import styled from "styled-components"

const TooltipButtonArea = styled.div`
    position: relative;

    width: max-content;
    height: max-content;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
`

interface TooltipElementPostion {}

const TooltipElement = styled.div`
    position: absolute;
    top: -10px;
    right: -50px;

    min-width: 35px;
    min-height: 35px;
    max-width: max-content;
    max-height: max-content;

    display: flex;
    align-items: center;
    justify-content: center;
`

interface TooltipProps {
    children: ReactElement
    tooltipElement: ReactElement
    active: boolean
    setActive: (active: boolean) => void
}

function Tooltip({
    children,
    tooltipElement,
    active,
    setActive,
}: TooltipProps) {
    return (
        <TooltipButtonArea
            onMouseOver={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
        >
            <TooltipElement
                onMouseEnter={() => setActive(true)}
                onMouseLeave={() => setActive(false)}
            >
                {active && tooltipElement}
            </TooltipElement>
            {children}
        </TooltipButtonArea>
    )
}

export default Tooltip
