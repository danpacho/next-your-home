function useClipboard() {
    const copyTextToUser = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            return {
                isCopySucess: true,
                copiedText: text,
            }
        } catch (e) {
            return {
                isCopySucess: false,
                copiedText: text,
            }
        }
    }

    return {
        copyTextToUser,
    }
}

export default useClipboard
