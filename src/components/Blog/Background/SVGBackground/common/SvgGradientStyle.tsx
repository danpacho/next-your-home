interface GradientStyleProps {
    startColor: string
    endColor: string
    ID: string
    position?: {
        x1: number
        y1: number
        x2: number
        y2: number
    }
}

function SvgGradientStyle({
    ID,
    startColor,
    endColor,
    position,
}: GradientStyleProps) {
    return (
        <linearGradient
            id={ID}
            x1={position?.x1 ?? 0}
            y1={position?.y1 ?? 0}
            x2={position?.x2 ?? 1}
            y2={position?.y2 ?? 1}
        >
            <stop offset="0%" stopColor={startColor} />
            <stop offset="100%" stopColor={endColor} />
        </linearGradient>
    )
}

export default SvgGradientStyle
