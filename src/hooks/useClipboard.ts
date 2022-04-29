/**
 * @note `clipboard api`
 * @returns `copyTextToUser` function
 */
function useClipboard() {
    const copyTextToUser = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            return {
                isCopySuccess: true,
                copiedText: text,
            }
        } catch (e) {
            return {
                isCopySuccess: false,
                copiedText: text,
            }
        }
    }

    return {
        copyTextToUser,
    }
}

export default useClipboard
