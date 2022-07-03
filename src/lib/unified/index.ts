import type { Node } from "unist"
import { visit } from "unist-util-visit"

export interface NodeChildrenType {
    type: string
    value: string
    position: any
}

type MarkdownElement =
    | "text"
    | "paragraph"
    | "heading"
    | "inlineCode"
    | "thematicBreak"
    | "image"

export interface MarkdownNodeType {
    type: MarkdownElement
    depth?: number
    children?: NodeChildrenType[]
    position: any
}

const findMarkdownElment = (tree: Node, mdElmentArray: MarkdownElement[]) => {
    const matchedNode: MarkdownNodeType[] = []

    visit(tree, (node: any) => {
        const { type } = node as MarkdownNodeType
        if (mdElmentArray.includes(type)) {
            matchedNode.push(node)
        }
    })

    return {
        matchedNode,
        notFound: matchedNode.length === 0,
    }
}

export { findMarkdownElment }
