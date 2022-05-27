import { useMemo } from "react"
import { getMDXComponent } from "mdx-bundler/client"

import { MDXComponents } from "mdx/types"

import MDXAtoms from "@components/MDXAtoms"

interface MDXBundlerProp {
    mdxSource: string
}

function MDXBundler({ mdxSource }: MDXBundlerProp) {
    const BundledComponent = useMemo(
        () => getMDXComponent(mdxSource),
        [mdxSource]
    )
    return <BundledComponent components={MDXAtoms as MDXComponents} />
}

export default MDXBundler
