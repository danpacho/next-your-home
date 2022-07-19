import type { Node } from "unist"
import { visit } from "unist-util-visit"
import { remark } from "remark"

import { findMarkdownElment, MarkdownNodeType } from "."
import { promisify } from "util"
import imageSize from "image-size"
import {
    BlogErrorAdditionalInfo,
    BlogFileExtractionError,
} from "@utils/function/blog-error-handler"

//* ------------------------------ remark automatic image size ------------------------------
const sizeOf = promisify(imageSize)
const getImageSize = async (unProcessedUrl: string) => {
    const STATIC_IMAGE_URL = `public/${unProcessedUrl}`
    try {
        const sizeResult = await sizeOf(STATIC_IMAGE_URL)
        if (sizeResult === undefined)
            throw new BlogFileExtractionError({
                errorNameDescription: "markdown invalid image url",
                readingFileFormat: "image",
                readingFileLocation: STATIC_IMAGE_URL,
                readingFileName: "public folder",
            })
        if (sizeResult.width === undefined || sizeResult.height === undefined) {
            throw new BlogFileExtractionError({
                errorNameDescription: "image size extraction error",
                readingFileFormat: "image",
                readingFileLocation: STATIC_IMAGE_URL,
                readingFileName: "public folder",
            })
        }
        return {
            width: sizeResult.width,
            height: sizeResult.height,
        }
    } catch (e: unknown) {
        throw new BlogErrorAdditionalInfo({
            passedError: e,
            errorNameDescription: "unknown markdown image error",
            message: "please check your image url or source",
        })
    }
}

type ImageAltType = `${string}:${number}:${number}`
const getImageSizedAlt = async ({
    inputAlt,
    url,
}: {
    inputAlt: string
    url: string
}): Promise<ImageAltType> => {
    const [alt, width, height] = inputAlt?.split(":").map((text) => text.trim())
    const sizeNotIncluded = width === undefined || height === undefined
    if (sizeNotIncluded) {
        const { width, height } = await getImageSize(url)
        return `${alt}:${width}:${height}`
    }

    return `${alt}:${Number(width)}:${Number(height)}`
}
interface ImageNodeType extends MarkdownNodeType {
    title?: string
    url: string
    alt: string | ImageAltType
}

const remarkAutomaticImageSize = () => async (tree: Node) => {
    const { matchedNode, notFound } = findMarkdownElment(tree, ["image"])

    if (!notFound) {
        const isExternalUrl = (url: string) => url.startsWith("http")

        const imageSizeAltArray = await (matchedNode as ImageNodeType[]).reduce<
            Promise<ImageAltType[]>
        >(async (acc, { alt, url }) => {
            const awaitedAcc = await acc
            if (!isExternalUrl(url)) {
                const imageSizeAlt = await getImageSizedAlt({
                    inputAlt: alt,
                    url,
                })
                return [...awaitedAcc, imageSizeAlt]
            }
            return awaitedAcc
        }, Promise.resolve([] as ImageAltType[]))

        let order = 0
        visit(tree, "image", (imageNode: ImageNodeType) => {
            if (!isExternalUrl(imageNode.url)) {
                imageNode.alt = imageSizeAltArray[order]
                order++
            }
        })
    }
}

//* ------------------------------ remark toc object ------------------------------
type Concrete<Type> = {
    [Property in keyof Type]-?: Type[Property]
}
type MarkdownHeader = Concrete<MarkdownNodeType>
const extractHeader = (pureMarkdownSource: string) => {
    let headerNode: MarkdownHeader[] = []
    remark()
        .use(() => (tree) => {
            const { matchedNode, notFound } = findMarkdownElment(tree, [
                "heading",
            ])
            if (notFound) headerNode = []
            if (!notFound) headerNode = matchedNode as MarkdownHeader[]
        })
        .process(pureMarkdownSource)
    return headerNode.filter(({ depth }) => depth === 1 || depth === 2)
}

type HeaderType = "H1" | "H2"
interface HeaderInfo {
    title: string
    href: string
    type: HeaderType
}

interface H2Children extends Omit<HeaderInfo, "type"> {}

export interface TableOfContents extends Omit<HeaderInfo, "type"> {
    children: H2Children[] | null
}
function transformTableOfContents(source: MarkdownHeader[]): TableOfContents[] {
    if (source.length === 0) return []

    const headerInfoArray: HeaderInfo[] = source.map(({ children, depth }) => {
        const text = children[0].value
        return {
            title: text,
            href: `#${text}`,
            type: `H${depth}` as HeaderType,
        }
    })

    const H1IndexArray = headerInfoArray.reduce<number[]>(
        (acc, { type }, idx) => (type === "H1" ? [...acc, idx] : acc),
        []
    )

    const tableOfContentsArray = headerInfoArray.reduce<TableOfContents[]>(
        (acc, { href, title, type }, index) => {
            if (type === "H2") return acc

            const nextHeaderIndex = index + 1
            const nextH1Index: number | undefined =
                H1IndexArray[H1IndexArray.indexOf(index) + 1]

            const isChildrenNotExsist = nextHeaderIndex === nextH1Index

            if (isChildrenNotExsist) {
                return [
                    ...acc,
                    {
                        href,
                        title,
                        children: null,
                    },
                ]
            }

            const H1Children = headerInfoArray
                .slice(nextHeaderIndex, nextH1Index)
                .map<H2Children>(({ href, title }) => ({
                    href,
                    title,
                }))

            return [
                ...acc,
                {
                    href,
                    title,
                    children: H1Children.length === 0 ? null : H1Children,
                },
            ]
        },
        []
    )

    return tableOfContentsArray
}

const getTableOfContents = (pureMarkdownSource: string) => {
    const sorce = extractHeader(pureMarkdownSource)
    const tableOfContent = transformTableOfContents(sorce)
    return tableOfContent
}

export { getTableOfContents, remarkAutomaticImageSize }
