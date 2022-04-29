export const getBrightnessOfColor = (color: string) => {
    const rgbIntArray = color
        .replace(/ /g, "")
        .slice(4, -1)
        .split(",")
        .map((e) => parseInt(e))

    const highest = Math.max(...rgbIntArray)
    const lowest = Math.min(...rgbIntArray)

    return (highest + lowest) / 2 / 255
}
