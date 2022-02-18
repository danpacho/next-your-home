import BASE_URL from "@/constants/blog-content"
import { join as pathJoin } from "path"

const blogContentsDirectory = pathJoin(process.cwd(), BASE_URL)

type FileFormat = "txt" | "mdx" | "md"
const removeFileFormat = (fileName: string, fileFormat: FileFormat): string =>
    fileName.replace(`.${fileFormat}`, "")

const addPathNotation = (fileName: string): string => `/${fileName}`
export { blogContentsDirectory, removeFileFormat, addPathNotation }
