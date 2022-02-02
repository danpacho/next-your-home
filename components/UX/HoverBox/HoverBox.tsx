import { MouseEvent, ReactElement, useRef, useState } from "react"
import styled from "styled-components"

import { throttle } from "lodash-es"

interface CoordinateBoxStyle {
    coordWidth: number
    coordHeight: number
}

const CoodinateBox = styled.div<CoordinateBoxStyle>`
    position: relative;
    background-color: whitesmoke;

    width: ${({ coordWidth }) => `${coordWidth}px`};
    height: ${({ coordHeight }) => `${coordHeight}px`};
`

const HoverBoxContainer = styled.div`
    background-color: transparent;
`

interface HoverBoxProps extends CoordinateBoxStyle {
    onClick?: () => void
    hoverContent: ReactElement
}

interface Coord {
    x: number
    y: number
}
function HoverBox({
    coordWidth,
    coordHeight,
    onClick,
    hoverContent,
}: HoverBoxProps) {
    const coordRef = useRef<HTMLDivElement>(null)

    const [isMouseMove, setIsMouseMove] = useState<boolean>(false)

    const [hoverBoxContainerCoord, setHoverBoxContainerCoord] = useState<Coord>(
        {
            x: coordWidth / 2,
            y: coordHeight / 2,
        }
    )

    const onMouseMove = throttle(
        (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
            const { offsetX, offsetY } = e.nativeEvent
            // if (Math.abs(offsetX - hoverBoxContainerCoord.x) <= 25) return
            // if (Math.abs(offsetY - hoverBoxContainerCoord.y) <= 25) return

            setHoverBoxContainerCoord({ x: offsetX, y: offsetY })
            console.log(offsetX, offsetY)
        },
        1000
    )

    return (
        <CoodinateBox
            ref={coordRef}
            coordWidth={coordWidth}
            coordHeight={coordHeight}
            onClick={onClick}
            onMouseMove={onMouseMove}
            onMouseLeave={() => {
                setIsMouseMove(false)
                setHoverBoxContainerCoord({
                    x: coordWidth / 2,
                    y: coordHeight / 2,
                })
            }}
            onMouseEnter={() => setIsMouseMove(true)}
        >
            <HoverBoxContainer
                // style={{
                //     position: "absolute",
                //     top: hoverBoxContainerCoord.y,
                //     left: hoverBoxContainerCoord.x,
                // }}
                onMouseEnter={() => {
                    setHoverBoxContainerCoord({
                        x: coordWidth / 2,
                        y: coordHeight / 2,
                    })
                }}
                onMouseLeave={() => setIsMouseMove(false)}
            >
                {hoverContent}
            </HoverBoxContainer>
        </CoodinateBox>
    )
}

export default HoverBox
