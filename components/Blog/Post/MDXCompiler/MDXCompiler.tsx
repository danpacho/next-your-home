import { MDXProvider } from "@mdx-js/react"
import { MDXRemote } from "next-mdx-remote"

import { MDXCompiledSourceType } from "@/types/mdx"

import MDXAtoms from "../../../MDXAtoms"

interface MDXCompilerProp {
    comiledSource: MDXCompiledSourceType
}

function MDXCompiler({ comiledSource }: MDXCompilerProp) {
    return (
        <MDXProvider components={MDXAtoms}>
            <MDXRemote {...comiledSource} />
        </MDXProvider>
    )
}

export default MDXCompiler
