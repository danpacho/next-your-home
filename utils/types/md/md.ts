import { MDXRemoteSerializeResult } from "next-mdx-remote"

export type MDXCompiledSource = MDXRemoteSerializeResult<
    Record<string, unknown>
>
