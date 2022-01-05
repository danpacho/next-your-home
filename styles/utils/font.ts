export interface FontSize {
    xsm: string
    sm: string
    md: string
    lg: string
    xlg: string
    xxlg: string
    title: string
}

export type FontSizeType = "xsm" | "sm" | "md" | "lg" | "xlg" | "xxlg" | "title"

const fontSize: FontSize = {
    xsm: ".5rem",
    sm: ".75rem",
    md: "1rem",
    lg: "1.25rem",
    xlg: "1.5rem",
    xxlg: "1.75rem",
    title: "2rem",
}

export default fontSize
