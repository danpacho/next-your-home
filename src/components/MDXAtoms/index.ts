import {
    P,
    Bold,
    Italic,
    H1,
    H2,
    H3,
    OL,
    UL,
    LI,
    Link,
    Quote,
    Pre,
    Code,
    Image,
    Divider,
    Table,
    TD,
    TH,
    TR,
} from "./MDXAtoms"
import { MDXComponents } from "mdx/types"

const MDXAtoms = {
    p: P,
    strong: Bold,
    em: Italic,

    h1: H1 as MDXComponents["h1"],
    h2: H2,
    h3: H3,

    ol: OL,
    ul: UL,
    li: LI,

    a: Link as MDXComponents["a"],

    blockquote: Quote as MDXComponents["blockquote"],

    pre: Pre,
    code: Code as MDXComponents["code"],

    img: Image as MDXComponents["img"],

    hr: Divider,

    table: Table,
    th: TH,
    td: TD,
    tr: TR,

    // thematicBreak,
    // wrapper,
}

export default MDXAtoms
