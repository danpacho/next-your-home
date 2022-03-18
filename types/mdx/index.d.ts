import { MDXRemoteSerializeResult } from "next-mdx-remote"

export type MDXCompiledSourceType = MDXRemoteSerializeResult<
    Record<string, unknown>
>
