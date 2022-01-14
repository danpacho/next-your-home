export interface BorderRadius {
    bxsm: string
    bsm: string
    bmd: string
    blg: string
    bxlg: string
    bxxlg: string
    bxxxlg: string
    bRound: string
}

export type BorderRadiusSize =
    | "bxsm"
    | "bsm"
    | "bmd"
    | "blg"
    | "bxlg"
    | "bxxlg"
    | "bxxxlg"
    | "bRound"

const borderRadius: BorderRadius = {
    bxsm: ".15rem",
    bsm: ".25rem",
    bmd: ".35rem",
    blg: ".5rem",
    bxlg: ".75rem",
    bxxlg: "1rem",
    bxxxlg: "1.25rem",
    bRound: "50%",
}

export default borderRadius
