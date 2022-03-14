import { SVGProps } from "react"

const SvgMainLogo = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width="1em"
        height="1em"
        viewBox="0 0 391 394"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g filter="url(#mainLogo_svg__a)">
            <path
                d="M134.476 77.165C37.31 150.314 16.563 234.345 20.88 275.35l.008.073c.49 4.687 7.393 70.57 73.793 83.95 83.47 16.819 200.738-44.911 245.486-129.492 44.748-84.58 32.55-122.046 13.761-149.942-19.751-29.325-97.995-94.211-219.452-2.774Z"
                fill="#000"
            />
            <path
                d="M129.965 71.173C31.015 145.665 8.789 232.134 13.421 276.135l.008.07v.001c.28 2.683 2.259 21.477 13.036 41.488C37.362 337.926 57.346 359.5 93.2 366.725c43.969 8.86 95.944-3.033 142.242-27.438 46.37-24.444 88.127-61.996 111.354-105.898 22.672-42.852 31.368-74.585 31.577-99.673.212-25.392-8.278-43.199-18.225-57.967-10.752-15.965-36.764-40.846-76.144-49.796-39.768-9.039-91.908-1.555-154.039 45.22Z"
                stroke="#776350"
                strokeWidth={15}
            />
        </g>
        <path
            d="M266.206 64.478c1.404 5.184-17.13 4.753-37.223 10.194-20.094 5.442-38.552 18.583-39.956 13.4-1.404-5.184 18.161-17.686 38.255-23.127 20.093-5.442 37.521-5.651 38.924-.467Z"
            fill="url(#mainLogo_svg__b)"
        />
        <path
            d="M255.829 65.536c.396 1.93-9.388 1.964-20.391 4.218-11.004 2.253-21.658 7.378-22.053 5.448-.396-1.93 10.802-6.827 21.805-9.08 11.004-2.254 20.244-2.516 20.639-.586Z"
            fill="#EDEDEA"
        />
        <path
            d="M57 305c7.309-1.488 92.113-32.341 163.23-100.382 67.53-64.608 93.743-127.808 94.788-135.216"
            stroke="#776350"
            strokeWidth={15}
            strokeLinecap="round"
        />
        <defs>
            <linearGradient
                id="mainLogo_svg__b"
                x1={235.443}
                y1={67.426}
                x2={213.225}
                y2={-6.401}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#fff" />
                <stop offset={1} stopColor="#fff" stopOpacity={0} />
            </linearGradient>
            <filter
                id="mainLogo_svg__a"
                x={0.35}
                y={10.111}
                width={390.527}
                height={372.038}
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feColorMatrix
                    in="SourceAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation={2.5} />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix values="0 0 0 0 0.929167 0 0 0 0 0.929167 0 0 0 0 0.929167 0 0 0 0.81 0" />
                <feBlend
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_205_3"
                />
                <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow_205_3"
                    result="shape"
                />
            </filter>
        </defs>
    </svg>
)

export default SvgMainLogo
