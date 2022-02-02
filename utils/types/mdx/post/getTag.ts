const getTagArray = (tag: string): string[] =>
    tag.split(",").map((tag) => tag.trim())

export { getTagArray }
