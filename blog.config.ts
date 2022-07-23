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
    primary1: "#F2E2CE",
    primary2: "#D9BD9C",
    primary3: "#A68A68",
    primary4: "#776350",
}

export interface AuthorInfoType {
    name: string
    currentGoal: string
    currentState: string
    contacts: {
        [key in ContactPlatformType]: string
    }
    logoImageUrl: string
    bannerImageUrl: string
    faviconUrl: string
}
const authorInfo: AuthorInfoType = {
    name: "your name",
    currentState: "your current state",
    currentGoal: "your current goal",
    contacts: {
        email: getAuthorContactHref("email", "your@email"),
        github: getAuthorContactHref("github", "your@github"),
        youtube: getAuthorContactHref("youtube", "your@youtube"),
        facebook: getAuthorContactHref("facebook", "your@facebook"),
        instagram: getAuthorContactHref("instagram", "your@instagram"),
        linkedin: getAuthorContactHref("linkedin", "your@linkedin"),
        twitter: getAuthorContactHref("twitter", "your@twitter"),
    },
    logoImageUrl: "/logo.webp",
    bannerImageUrl: "/banner.png",
    faviconUrl: "/favicon.png",
}

interface BlogInfoType {
    url: string
    siteName: string
    subtitle: string
    copyright: string
    language: string
    googleAnalytics: {
        ID: string
        actiavte: true | false
    }
}
const blogInfo: BlogInfoType = {
    url: "your DEPLOY URL",
    siteName: "your site name",
    subtitle: "your site subtitle",
    copyright: `${
        authorInfo.name
    }© All rights reserved ${new Date().getFullYear()}.`,
    language: "ko",
    googleAnalytics: {
        actiavte: false,
        ID: "",
    },
}

const blogContentsDirectoryName = "blog" as const
interface ConfigType extends BlogInfoType {
    blogContentsDirectoryName: `${typeof blogContentsDirectoryName}`
    useTXT: boolean
    useKatex: boolean
    useMemo: boolean
    userPallete: UserPalleteType
    useMobileTOC: boolean
    author: AuthorInfoType
    postPerCategoryPage: number
    numberOfLatestPost: number
}
const config: ConfigType = {
    useTXT: false, // description file format to .txt, not .json
    useKatex: false, // katex option
    useMemo: true, // improves dev speed, but require manual refresh except posts
    useMobileTOC: true, // table of content on mobile
    blogContentsDirectoryName, // blog contents directory name
    userPallete, // personal pallete
    postPerCategoryPage: 4,
    numberOfLatestPost: 5,
    author: {
        ...authorInfo,
    },
    ...blogInfo,
}

export { config }
