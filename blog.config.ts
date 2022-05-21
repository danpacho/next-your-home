import getAuthorContactHref, {
    ContactPlatformType,
} from "@utils/function/contact/getContactHref"

export interface UserPalleteType {
    primary1: string
    primary2: string
    primary3: string
    primary4: string
}
const userPallete: UserPalleteType = {
    primary1: "#776350",
    primary2: "#A68A68",
    primary3: "#D9BD9C",
    primary4: "#F2E2CE",
}

export interface AuthorInfoType {
    name: string
    bannerImageUrl: string
    avatarImageUrl: string
    currentGoal: string
    currentState: string
    contacts: {
        [key in ContactPlatformType]: string
    }
}
const authorInfo: AuthorInfoType = {
    name: "danpacho",
    bannerImageUrl: "/banner.png",
    avatarImageUrl: "/logo.png",
    currentState: "frontend-physics student",
    currentGoal: "make people move",
    contacts: {
        email: getAuthorContactHref("email", "danpa725@cau.ac.kr"),
        github: getAuthorContactHref("github", "danpa725"),
        youtube: getAuthorContactHref("youtube", "danpa725"),
        facebook: "",
        instagram: "",
        linkedin: "",
        twitter: "",
    },
}

interface BlogInfoType {
    url: string
    siteName: string
    subtitle: string
    copyright: string
}
const blogInfo: BlogInfoType = {
    url: "https://danpacho.vercel.app",
    siteName: "danpacho blog",
    subtitle: "learn✏️ and create🛠 beautiful things",
    copyright: `${
        authorInfo.name
    }© All rights reserved ${new Date().getFullYear()}.`,
}

const blogContentsDirectoryName = "blog-contents"
interface ConfigType extends BlogInfoType {
    blogContentsDirectoryName: `${typeof blogContentsDirectoryName}`
    useTXT: boolean
    useKatex: boolean
    useMemo: boolean
    userPallete: UserPalleteType
    author: AuthorInfoType
    postPerCategoryPage: number
    numberOfLatestPost: number
}
const config: ConfigType = {
    blogContentsDirectoryName: "blog-contents", // blog contents directory name
    useTXT: false, // description file format
    useKatex: true, // katex option
    useMemo: true, // memo imporoves dev speed
    userPallete, // personal pallete
    postPerCategoryPage: 4,
    numberOfLatestPost: 5,
    author: {
        ...authorInfo,
    },
    ...blogInfo,
}

export { config }
