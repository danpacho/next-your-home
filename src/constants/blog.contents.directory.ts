import { config } from "blog.config"

const BLOG_CONTENTS_LOCATION = config.blogContentsDirectoryName
const BLOG_POST_CONTENTS_LOCATION =
    `${BLOG_CONTENTS_LOCATION}/contents` as const
const BLOG_AUTHOR_CONTENTS_LOCATION =
    `${BLOG_CONTENTS_LOCATION}/author` as const

const POST_DIRECTORY_NAME = "posts"

export {
    BLOG_POST_CONTENTS_LOCATION,
    BLOG_AUTHOR_CONTENTS_LOCATION,
    POST_DIRECTORY_NAME,
}
