import { visit } from "unist-util-visit"
import { remark } from "remark"
import type { Node } from "unist"

import { findMarkdownElment, MarkdownNodeType, NodeChildrenType } from "."

interface NodeType {
    type: string
    tagName: string
    properties: {
        [key: string]: string
    }
    children: NodeChildrenType[]
    position: any
}

const TARGET_HEADER = ["h1", "h2"]
const rehypeHeaderId = () => {
    return (tree: Node) => {
        visit(tree, "element", (node: NodeType) => {
            if (TARGET_HEADER.includes(node.tagName))
                node.properties.id = node.children[0].value
        })
    }
}

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
    return headerNode
}

type HeaderType = "H1" | "H2"
interface HeaderInfo {
    title: string
    href: string
    type: HeaderType
}

interface H2Children extends Omit<HeaderInfo, "type"> {}

export interface TableOfContents extends Omit<HeaderInfo, "type"> {
    children: H2Children[]
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
            const nextH1Index = H1IndexArray[H1IndexArray.indexOf(index) + 1]

            const isChildrenNotExsist = nextHeaderIndex === nextH1Index

            const H1Children = isChildrenNotExsist
                ? []
                : headerInfoArray
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
                    children: H1Children,
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

export { rehypeHeaderId, getTableOfContents }
