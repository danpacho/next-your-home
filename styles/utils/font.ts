export type FontSize = typeof fontSize
export type FontSizeType = keyof FontSize

const fontSize = {
    xsm: ".5rem",
    sm: ".75rem",
    md: "1rem",
    lg: "1.25rem",
    xlg: "1.5rem",
    xxlg: "1.75rem",
    title: "2rem",
}

export default fontSize
