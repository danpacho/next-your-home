import { MDXProviderProps } from "@mdx-js/react"

import { H1, H2, H3 } from "./Headers/Headers"
import { LI, OL, UL } from "./List/List"
import Divider from "./Divider/Divider"
import Image from "./Image/Image"
import Link from "./Link/Link"
import Quote from "./Quote/Quote"
import Bold from "./Text/TextHightlight/Bold"
import Italic from "./Text/TextHightlight/Italic"
import Code from "./Code/Code"
import InlineCode from "./Code/InlineCode"
import P from "./Text/P"
import Pre from "./Code/Pre"
import { Table, Td, Th, Tr } from "./Table/Table"

const MDXAtoms: MDXProviderProps["components"] = {
    p: P,
    strong: Bold,
    em: Italic,

    h1: H1,
    h2: H2,
    h3: H3,

    ol: OL,
    ul: UL,
    li: LI,

    a: Link,

    blockquote: Quote,

    pre: Pre,
    code: Code,
    inlineCode: InlineCode,

    img: Image,

    hr: Divider,

    table: Table,
    th: Th,
    td: Td,
    tr: Tr,

    // thematicBreak,
    // wrapper,
}

export default MDXAtoms
