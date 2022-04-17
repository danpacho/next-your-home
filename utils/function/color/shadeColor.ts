const shadeColor = (color: string, percent: number) =>
    `#${color
        .replace(/^#/, "")
        .replace(/../g, (color) =>
            `0${Math.min(
                255,
                Math.max(0, parseInt(color, 16) + percent)
            ).toString(16)}`.slice(-2)
        )}`

export { shadeColor }
