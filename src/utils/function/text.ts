const sliceTextByMaxLength = (text: string, max: number) =>
    text.length <= max ? text : `${text.slice(0, max + 1)}...`

const replaceUnderscoreToSpacing = (stringWithUnderscore: string) =>
    stringWithUnderscore.replace(/_/g, " ")

export { sliceTextByMaxLength, replaceUnderscoreToSpacing }
