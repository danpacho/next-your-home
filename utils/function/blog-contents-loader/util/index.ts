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

const isColorHEX = (testColor: string) => {
    const HEX_REGEX = /^#[a-z|A-Z|0-9]{5}[a-z|A-Z|0-9]{1}$/g
    return HEX_REGEX.test(testColor)
}

const validateRGBA = (testColor: string) => {
    const RGBA_REGEX =
        /rgba?\(\s*?([0-9]{1,3})\s*?,\s*?([0-9]{1,3})\s*?,\s*?([0-9]{1,3})\s*?(,\s*?([0].[0-9]+|.[0-9]+|[1])\s*?)?\)/g

    const splited = testColor.replace(/\s/g, "")
    const rgbaArray = RGBA_REGEX.exec(splited)

    if (rgbaArray === null)
        throw new BlogPropertyError({
            errorNameDescription: "Format Error Occured",
            propertyName: "rgba or rgb or HEX",
            propertyType: "string",
            propertyDescription:
                "input color is Not proper rgba or rgb or HEX format",
            errorPropertyValue: testColor,
            customeErrorMessage:
                "rgba or rgb or HEX format And Use HEX, if you want fast💨 building process.",
        })
    else {
        return rgbaArray
    }
}

const HEX_BIANARY = 16
const transformRGBAToHEX = (testColor: string) => {
    const rgbaArray = validateRGBA(testColor)
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

const getValidateColor = (color: string) =>
    isColorHEX(color) ? color : transformRGBAToHEX(color)

export {
    blogContentsDirectory,
    removeFileFormat,
    addPathNotation,
    getValidateColor,
}
