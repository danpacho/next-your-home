import palleteOpacity from "@/styles/utils/palleteOpacity"

const getColorSet = (color: string) => ({
    middle: `${color}${palleteOpacity.opacity30}`,
    high: `${color}${palleteOpacity.opacity60}`,
})

export { getColorSet }
