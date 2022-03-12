import { MDXProvider } from "@mdx-js/react"
import { MDXRemote } from "next-mdx-remote"

import { MDXCompiledSource } from "@/utils/types/md/md"

import MDXAtoms from "../../../MDXAtoms"

interface MDXCompilerProp {
    comiledSource: MDXCompiledSource
}

function MDXCompiler({ comiledSource }: MDXCompilerProp) {
    return (
        <MDXProvider components={MDXAtoms}>
            <MDXRemote {...comiledSource} />
        </MDXProvider>
    )
}

export default MDXCompiler
