import { MDXCompiledSource } from "@/utils/types/mdx/mdx"
import { MDXProvider } from "@mdx-js/react"
import { MDXRemote } from "next-mdx-remote"
import MDXAtoms from "../MDXComponents"

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
