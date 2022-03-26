import { BLOG_POST_CONTENTS_LOCATION } from "@/constants/blog-content"
import { join as pathJoin } from "path"
import { BlogPropertyError } from "../../blog-error-handler/blogError"

const blogContentsDirectory = pathJoin(
    process.cwd(),
    BLOG_POST_CONTENTS_LOCATION
)

type FileFormat = "txt" | "mdx" | "md" | "json"
const removeFileFormat = (fileName: string, fileFormat: FileFormat): string =>
    fileName.replace(`.${fileFormat}`, "")

const addPathNotation = (fileName: string): string => `/${fileName}`

const addZeroToOneLengthString = (text: string) =>
    text.length === 1 ? `0${text}` : text

const transformRGBAToHEX = (rgba: string) => {
    const HEX_BIANARY = 16
    const RGBA_REGEX =
        /rgba?\(\s*?([0-9]{1,3})\s*?,\s*?([0-9]{1,3})\s*?,\s*?([0-9]{1,3})\s*?(,\s*?([0].[0-9]+|.[0-9]+|[1])\s*?)?\)/g

    const splited = rgba.replace(/\s/g, "")
    const rgbaArray = RGBA_REGEX.exec(splited)

    if (!rgbaArray)
        throw new BlogPropertyError({
            errorNameDescription: "",
            propertyName: "rgba or rgb",
            propertyType: "string",
            propertyDescription: "input color is Not proper rgba or rgb format",
            errorPropertyValue: rgba,
            customeErrorMessage: "rgba or rgb format",
        })
    const hexR = addZeroToOneLengthString(
        Number(rgbaArray[1]).toString(HEX_BIANARY)
    )
    const hexG = addZeroToOneLengthString(
        Number(rgbaArray[2]).toString(HEX_BIANARY)
    )
    const hexB = addZeroToOneLengthString(
        Number(rgbaArray[3]).toString(HEX_BIANARY)
    )

    const isRGBA = typeof rgbaArray[5] === "string"
    const hexA = isRGBA
        ? addZeroToOneLengthString(
              Math.round(Number(rgbaArray[5]) * 255).toString(HEX_BIANARY)
          )
        : ""

    const convertedHEX = `#${hexR}${hexG}${hexB}${hexA}`

    return convertedHEX
}

export {
    blogContentsDirectory,
    removeFileFormat,
    addPathNotation,
    transformRGBAToHEX,
}
