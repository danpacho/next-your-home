import { useEffect, useMemo, useState } from "react"
import type { MediaType } from "@styles/utils/media"
import { sliceTextByMaxLength } from "@utils/function/text"

type OptionType = {
    [key in MediaType]?: number
} & {
    max?: number
}

interface UseTextLengthByWindowWidth {
    text: string
    option: OptionType
    mediaWidth: MediaType
}
/**
 * @param text
 * @param option length options by `mediaWidth` state
 * @param mediaWidth along with `useWindowWidth`
 * @returns sizedText
 */
function useTextLengthByWindowWidth({
    text,
    option,
    mediaWidth,
}: UseTextLengthByWindowWidth) {
    const [sizedText, setSizedText] = useState(text)
    const textSizeOptionList = useMemo(
        () => Object.keys(option) as MediaType[],
        [option]
    )

    useEffect(() => {
        if (textSizeOptionList.includes(mediaWidth)) {
            setSizedText(sliceTextByMaxLength(text, option[mediaWidth]!))
        } else
            setSizedText(
                option.max ? sliceTextByMaxLength(text, option.max) : text
            )
    }, [text, mediaWidth, option, textSizeOptionList])

    return sizedText
}

export default useTextLengthByWindowWidth
