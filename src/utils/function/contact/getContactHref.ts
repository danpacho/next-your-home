const contactPlatformList = [
    "twitter",
    "github",
    "email",
    "linkedin",
    "instagram",
    "facebook",
    "youtube",
] as const

export type ContactPlatformType = typeof contactPlatformList[number]

const getAuthorContactHref = (
    contactPlatform: ContactPlatformType,
    contact: string
) => {
    let href: string

    switch (contactPlatform) {
        case "email":
            href = `mailto:${contact}`
            break
        case "twitter":
            href = `https://twitter.com/${contact}`
            break
        case "github":
            href = `https://github.com/${contact}`
            break
        case "linkedin":
            href = `https://www.linkedin.com/in/${contact}`
            break
        case "instagram":
            href = `https://www.instagram.com/${contact}`
            break
        case "facebook":
            href = `https://www.facebook.com/${contact}`
            break
        case "youtube":
            href = `https://www.youtube.com/${contact}`
            break
        default:
            href = contact
            break
    }

    return href
}

export default getAuthorContactHref
