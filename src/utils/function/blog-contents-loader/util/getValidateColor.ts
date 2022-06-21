import { BlogPropertyError } from "@utils/function/blog-error-handler/blogError"

const isColorHEX = (testColor: string) => {
    const HEX_REGEX = /^#[a-z|A-Z|0-9]{5}[a-z|A-Z|0-9]{1}$/g
    return HEX_REGEX.test(testColor)
}

const validateRGBA = (
    testColor: string
):
    | {
          rgbaArray: RegExpExecArray
      }
    | { error: boolean } => {
    const RGBA_REGEX =
        /rgba?\(\s*?([0-9]{1,3})\s*?,\s*?([0-9]{1,3})\s*?,\s*?([0-9]{1,3})\s*?(,\s*?([0].[0-9]+|.[0-9]+|[1])\s*?)?\)/g

    const splited = testColor.replace(/\s/g, "")
    const rgbaArray = RGBA_REGEX.exec(splited)

    if (rgbaArray === null) {
        return {
            error: true,
        }
    } else {
        return {
            rgbaArray,
        }
    }
}

const HEX_BIANARY = 16
const transformRGBAToHEX = (rgbaArray: RegExpExecArray) => {
    const addZeroToOneLengthString = (text: string) =>
        text.length === 1 ? `0${text}` : text

    const hexR = addZeroToOneLengthString(
        Number(rgbaArray[1]).toString(HEX_BIANARY)
    )
    const hexG = addZeroToOneLengthString(
        Number(rgbaArray[2]).toString(HEX_BIANARY)
    )
    const hexB = addZeroToOneLengthString(
        Number(rgbaArray[3]).toString(HEX_BIANARY)
    )

    const convertedHEX = `#${hexR}${hexG}${hexB}`
    return convertedHEX
}

const getValidateColor = (color: string) => {
    if (!color)
        throw new BlogPropertyError({
            errorNameDescription: "Format Error Occured",
            propertyName: "color",
            propertyType: "string",
            propertyDescription: "input color is Null",
            errorPropertyValue: color,
            customeErrorMessage:
                'color wrapping with ✅colon or ✅semi-colon, "| your-color |" \n\n            CORRECT INPUT   ex) color: "#FFFFFF"\n\n            INCORRECT INPUT ex) color: #FFFFFF',
        })
    if (isColorHEX(color)) return color

    const validationResult = validateRGBA(color)

    if ("error" in validationResult)
        throw new BlogPropertyError({
            errorNameDescription: "Format Error Occured",
            propertyName: "rgba or rgb or HEX",
            propertyType: "string",
            propertyDescription:
                "input color is Not proper rgba or rgb or HEX format",
            errorPropertyValue: color,
            customeErrorMessage:
                "rgba or rgb or HEX format And Use HEX, if you want faster💨 building process.",
        })
    else return transformRGBAToHEX(validationResult.rgbaArray)
}

export default getValidateColor
