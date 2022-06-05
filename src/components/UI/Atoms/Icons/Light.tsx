const SvgLight = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M23 12c.552 0 1.004-.448.958-.999A12.004 12.004 0 0 0 16.592.913 12 12 0 0 0 .042 11.001c-.046.55.406.999.958.999h22Z"
            fill={props.fill}
        />
        <path
            stroke={props.stroke}
            strokeWidth={1.25}
            strokeLinecap="round"
            d="M.625 14.375h22.75M6.625 17.375h10.75M10.625 20.375h2.75"
        />
    </svg>
)

export default SvgLight
