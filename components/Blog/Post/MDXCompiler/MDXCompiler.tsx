import { MDXRemote } from "next-mdx-remote"

import { MDXCompiledSourceType } from "@/types/mdx"

import MDXAtoms from "@/components/MDXAtoms/MDXAtoms"
import { MDXComponents } from "mdx/types"

interface MDXCompilerProp {
    serializedSource: MDXCompiledSourceType
}

function MDXCompiler({
    serializedSource: { compiledSource },
}: MDXCompilerProp) {
    return (
        <MDXRemote
            compiledSource={compiledSource}
            components={MDXAtoms as MDXComponents}
        />
    )
}

export default MDXCompiler
