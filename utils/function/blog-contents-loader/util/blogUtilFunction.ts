import { BLOG_POST_CONTENTS_LOCATION } from "@/constants/blog-content"
import { join as pathJoin } from "path"

const blogContentsDirectory = pathJoin(
    process.cwd(),
    BLOG_POST_CONTENTS_LOCATION
)

type FileFormat = "txt" | "mdx" | "md" | "json"
const removeFileFormat = (fileName: string, fileFormat: FileFormat): string =>
    fileName.replace(`.${fileFormat}`, "")

const addPathNotation = (fileName: string): string => `/${fileName}`

export { blogContentsDirectory, removeFileFormat, addPathNotation }
