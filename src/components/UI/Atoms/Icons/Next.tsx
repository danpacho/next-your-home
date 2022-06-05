const SvgNext = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M12.142 6.59a.715.715 0 0 0-.38.627v4.066H3.734A.726.726 0 0 0 3 12c0 .396.329.717.734.717h8.028v4.066c0 .262.146.502.38.627.234.127.52.119.745-.02l7.77-4.783A.714.714 0 0 0 21 12a.714.714 0 0 0-.343-.607l-7.77-4.783a.754.754 0 0 0-.745-.02Z"
            fill={props?.fill}
        />
    </svg>
)

export default SvgNext
