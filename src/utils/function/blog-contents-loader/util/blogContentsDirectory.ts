import { BLOG_POST_CONTENTS_LOCATION } from "@constants/index"
import { join as pathJoin } from "path"

const blogContentsDirectory = pathJoin(
    process.cwd(),
    BLOG_POST_CONTENTS_LOCATION
)

export default blogContentsDirectory
