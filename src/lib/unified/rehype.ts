import { visit } from "unist-util-visit"
import type { Node } from "unist"

type NodeTagName =
    | "p"
    | "br"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "img"
    | "div"
    | "span"
    | "quote"
    | "code"
    | "pre"
    | "tr"
    | "td"
    | "th"

interface NodeType {
    type: string
    tagName: NodeTagName
    properties: {
        [key: string]: string | number
    }
    children: NodeType[]
    position: any
}

interface HeaderNodeType extends NodeType {
    value: string
    children: HeaderNodeType[]
}

const TARGET_HEADER = ["h1", "h2"]
const rehypeHeaderId = () => (tree: Node) => {
    visit(tree, "element", (node: NodeType) => {
        if (TARGET_HEADER.includes(node.tagName))
            node.properties.id = (node as HeaderNodeType).children[0].value
    })
}

export { rehypeHeaderId }
