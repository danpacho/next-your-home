import { SVGBackgroundProps, SVGContainer } from "../common"

const HomeBackground = (props: SVGBackgroundProps) => {
    const { isLight } = props
    return (
        <SVGContainer
            viewBox="0 0 1194 834"
            preserveAspectRatio="xMinYMin slice"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            isLight={isLight}
        >
            <path
                d="m1208.52-43 13.87 248.074C973.898 355.397 480.409 655.235 287.213 774.622L-29-32.392 1208.52-43Z"
                fill="url(#light_svg__b)"
            />
            <path
                d="M61.172 915.84c6.983-5.153 175.397-109.922 226.041-141.218m0 0c193.196-119.387 686.685-419.225 935.177-569.548L1208.52-43-29-32.392l316.213 807.014Z"
                stroke={isLight ? "#EBEBEB" : "#E5E5E5"}
                strokeWidth={1.25}
            />
            <defs>
                <linearGradient
                    id="light_svg__b"
                    x1={285}
                    y1={785}
                    x2={1260}
                    y2={60}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor={isLight ? "#F3ECDA" : "#25242A"} />
                    <stop
                        offset={1}
                        stopColor={isLight ? "#FAFAFA" : "#4E4B5B"}
                    />
                </linearGradient>
            </defs>
        </SVGContainer>
    )
}

export default HomeBackground
