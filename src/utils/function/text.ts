const sliceTextByMaxLength = (text: string, max: number) =>
    text.length <= max ? text : `${text.slice(0, max)}...`

export { sliceTextByMaxLength }
