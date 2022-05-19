import { BLOG_PROFILE_CONTENTS_LOCATION } from "@constants/blog.contents.directory"

import { readFile } from "fs/promises"

import {
    BlogErrorAdditionalInfo,
    BlogFileExtractionError,
} from "@utils/function/blog-error-handler/blogError"

import { transformPureContentToMDXCompileSource } from "./getCategoryPost"

const getProfileSource = async () => {
    try {
        const profileContent = await readFile(
            BLOG_PROFILE_CONTENTS_LOCATION,
            "utf-8"
        )
        if (!profileContent)
            throw new BlogFileExtractionError({
                errorNameDescription: "post file extraction error occured",
                readingFileFormat: ".mdx",
                readingFileLocation: BLOG_PROFILE_CONTENTS_LOCATION,
                readingFileName: "profile.mdx",
            })

        return transformPureContentToMDXCompileSource(profileContent)
    } catch (err) {
        throw new BlogErrorAdditionalInfo({
            passedError: err,
            errorNameDescription: "profile file reading error",
            message: "",
            customeErrorMessage: `your profile file at:\n\n   ${BLOG_PROFILE_CONTENTS_LOCATION}`,
        })
    }
}

export { getProfileSource }
