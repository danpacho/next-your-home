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
    bxsm: ".5px",
    bsm: "1px",
    bmd: "1.5px",
    blg: "2px",
    bxlg: "2.5px",
    bxxlg: "5px",
    bxxxlg: "7.5px",
    bRound: "10px",
}

export default borderRadius
