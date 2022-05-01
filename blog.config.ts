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
interface BlogInfoType {
    url: string
    siteName: string
    subtitle: string
    blogKeywords: string
    copyright: string
}
const blogInfo: BlogInfoType = {
    url: "https://...",
    siteName: "danpacho blog",
    blogKeywords: "learn, create, happiness",
    subtitle: "learn🛠 - create🎹 something",
    copyright: `danpacho © All rights reserved ${new Date().getFullYear()}.`,
}

interface AuthorInfoType {
    name: string
    avatarImageUrl: string
    currentGoal: string
    currentState: string
    contacts: {
        [key in ContactPlatformType]?: string
    }
}
const authorInfo: AuthorInfoType = {
    name: "danpacho",
    avatarImageUrl: "/profile.png",
    currentState: "frontend-physics student",
    currentGoal: "",
    contacts: {
        email: getAuthorContactHref("email", "danpa725@cau.ac.kr"),
        github: getAuthorContactHref("github", "danpa725"),
    },
}

interface ConfigType extends BlogInfoType {
    useTXT: boolean
    useKatex: boolean
    userPallete: UserPalleteType
    author: AuthorInfoType
}
const config: ConfigType = {
    useTXT: false, // description file format
    useKatex: false, // katex option
    userPallete, // personal pallete
    author: {
        ...authorInfo,
    },
    ...blogInfo,
}

export { config }
