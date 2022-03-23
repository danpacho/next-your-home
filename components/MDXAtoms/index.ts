import SvgDelete from "@/components/UI/Atoms/Icons/Delete"
import { H1, H2, H3 } from "./Headers/Headers"
import { LI, OL, UL } from "./List/List"
import Divider from "./Divider/Divider"
import Image from "./Image/Image"
import Link from "./Link/Link"
import Quote from "./Quote/Quote"
import Bold from "./Text/TextHightlight/Bold"
import Italic from "./Text/TextHightlight/Italic"
import Code from "./Code/Code"
import P from "./Text/P"
import Pre from "./Code/Pre"
import { Table, Td, Th, Tr } from "./Table/Table"
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
    th: Th,
    td: Td,
    tr: Tr,

    delete: SvgDelete,

    // thematicBreak,
    // wrapper,
}

export default MDXAtoms
