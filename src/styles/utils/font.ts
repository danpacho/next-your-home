export type FontSize = typeof fontSize
export type FontSizeType = keyof FontSize

const fontSize = {
    xsm: ".75rem",
    sm: ".85rem",
    md: "1rem",
    lg: "1.25rem",
    xlg: "1.5rem",
    xxlg: "1.75rem",
    title: "2rem",
    xtitle: "2.25rem",
}

export default fontSize
