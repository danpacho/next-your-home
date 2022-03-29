import SVGContainer from "../background.container"
import SVGBackgroundProps from "../background.props"

const HomeBackground = (props: SVGBackgroundProps) => {
    return (
        <SVGContainer
            viewBox="0 0 1194 834"
            preserveAspectRatio="xMinYMin slice"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g filter="url(#light_svg__a)">
                <path
                    d="m1208.52-43 13.87 248.074C973.898 355.397 480.409 655.235 287.213 774.622L-29-32.392 1208.52-43Z"
                    fill="url(#light_svg__b)"
                />
            </g>
            <path
                d="M61.172 915.84c6.983-5.153 175.397-109.922 226.041-141.218m0 0c193.196-119.387 686.685-419.225 935.177-569.548L1208.52-43-29-32.392l316.213 807.014Z"
                stroke="#EBEBEB"
                strokeWidth={1.224}
            />
            <defs>
                <linearGradient
                    id="light_svg__b"
                    x1={286.397}
                    y1={786.906}
                    x2={1261.15}
                    y2={57.372}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#F3ECDA" />
                    <stop offset={1} stopColor="#FAFAFA" />
                </linearGradient>
                <filter
                    id="light_svg__a"
                    x={-29.894}
                    y={-43.617}
                    width={1252.91}
                    height={959.949}
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feBlend
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feColorMatrix
                        in="SourceAlpha"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation={6.12} />
                    <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2={-1}
                        k3={1}
                    />
                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
                    <feBlend in2="shape" result="effect1_innerShadow_112_54" />
                </filter>
            </defs>
        </SVGContainer>
    )
}

export default HomeBackground
