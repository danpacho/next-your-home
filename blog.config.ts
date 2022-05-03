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

interface AuthorInfoType {
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
    bannerImageUrl: "/profile.png",
    avatarImageUrl: "/",
    currentState: "frontend-physics student",
    currentGoal: "make people move",
    contacts: {
        email: getAuthorContactHref("email", "danpa725@cau.ac.kr"),
        github: getAuthorContactHref("github", "danpa725"),
        facebook: "",
        instagram: "",
        linkedin: "",
        youtube: "",
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
    url: "https://test-blog-danpacho.vercel.app",
    siteName: "danpacho blog",
    subtitle: "learn 🛠 and create 🎹 something",
    copyright: `${
        authorInfo.name
    }© All rights reserved ${new Date().getFullYear()}.`,
}

interface ConfigType extends BlogInfoType {
    blogContentsDirectoryName: string
    useTXT: boolean
    useKatex: boolean
    userPallete: UserPalleteType
    author: AuthorInfoType
}
const config: ConfigType = {
    blogContentsDirectoryName: "blog-contents", // blog contents directory name
    useTXT: false, // description file format
    useKatex: false, // katex option
    userPallete, // personal pallete
    author: {
        ...authorInfo,
    },
    ...blogInfo,
}

export { config }
