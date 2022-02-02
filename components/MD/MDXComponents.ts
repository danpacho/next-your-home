import { MDXProviderProps } from "@mdx-js/react"

import { H1, H2, H3 } from "./MDXComponents/Headers/Headers"
import { LI, OL, UL } from "./MDXComponents/List/List"
import Divider from "./MDXComponents/Divider/Divider"
import Image from "./MDXComponents/Image/Image"
import Link from "./MDXComponents/Link/Link"
import Quote from "./MDXComponents/Quote/Quote"
import Bold from "./MDXComponents/Text/TextHightlight/Bold"
import Italic from "./MDXComponents/Text/TextHightlight/Italic"
import Code from "./MDXComponents/Code/Code"
import InlineCode from "./MDXComponents/Code/InlineCode"
import P from "./MDXComponents/Text/P"
import Pre from "./MDXComponents/Code/Pre"

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
    // delete,
    // table,
    // td,
    // th,
    // tr,
    // thematicBreak,
    // wrapper,
}

export default MDXAtoms
