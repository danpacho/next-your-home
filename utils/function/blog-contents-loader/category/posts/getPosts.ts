import { join as pathJoin } from "path"
import { readdirSync } from "fs"
import { readFile } from "fs/promises"

import matter from "gray-matter"
import { serialize } from "next-mdx-remote/serialize"
import { MDXCompiledSource } from "@/utils/types/mdx/mdx"
import { Href } from "@/utils/types/post/post"

const baseURL = "posts"
const getPostDirectoryURL = () => pathJoin(process.cwd(), baseURL)

const getPurePostPath = async () => await readdirSync(getPostDirectoryURL())

const getFilteredPostPath = (fileNames: string[]) =>
    fileNames
        .map((fileName) => fileName.replace(".mdx", ""))
        .map((fileName) => `/${baseURL}/${fileName}`)

const getAllPostContent = async (fileNames: string[]) => {
    const postInfo = await Promise.all(
        fileNames.map(
            async (fileName) => await getSpecificPostContent(fileName)
        )
    )

    return postInfo
}

const getHrefOfPost = async (fileName: string) => {
    const allPostPath = await getFilteredPostPath(await getPurePostPath())
    const mainPathIndex = allPostPath.findIndex((postPath) =>
        postPath.includes(fileName.replace(".mdx", ""))
    )

    const href: Href = {
        previous:
            mainPathIndex === 0
                ? `/${baseURL}`
                : allPostPath[mainPathIndex - 1],
        current: allPostPath[mainPathIndex],
        next:
            mainPathIndex === allPostPath.length - 1
                ? `/${baseURL}`
                : allPostPath[mainPathIndex + 1],
    }

    return href
}

const getSpecificPostContent = async (fileName: string) => {
    const filePath = pathJoin(getPostDirectoryURL(), fileName)
    const pureMdxContent = await readFile(filePath, "utf-8")

    const { content, data: meta } = matter(pureMdxContent)

    const mdxCompiledSource: MDXCompiledSource = await serialize(content)

    const hrefPostPathArray = await getHrefOfPost(fileName)

    return {
        content: mdxCompiledSource,
        meta,
        href: hrefPostPathArray,
    }
}

export {
    getPurePostPath,
    getFilteredPostPath,
    getAllPostContent,
    getSpecificPostContent,
}
