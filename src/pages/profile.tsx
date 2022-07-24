import styled from "styled-components"
import media from "@styles/utils/media"
import { iconStyle } from "@styles/utils/icon.style"

import { GetStaticProps } from "next"

import { PageType } from "@typing/page/type"
import { IsLight } from "@typing/theme"

import { getProfileSource } from "@utils/function/blog-contents-loader/profile/getProfile"

import { useSetFocusingPageColor, useThemeMode } from "@hooks/index"

import {
    FacebookIcon,
    GithubIcon,
    InstagramIcon,
    LinkedinIcon,
    SendIcon,
    TwitterIcon,
    YoutubeIcon,
} from "@components/UI/Atoms/Icons"
import MDXBundler from "@components/MDXBundler"

import { AuthorInfoType, config } from "blog.config"

export const getStaticProps: GetStaticProps<ProfileProps> = async () => {
    const profileSource = await getProfileSource()
    return {
        props: {
            profileSource,
        },
    }
}

const ProfileLogo = ({ width, height }: { width: number; height: number }) => {
    const [alt, fileType] = config.author.logoImageUrl.split(".")
    return (
        <picture>
            <source
                srcSet={config.author.logoImageUrl}
                type={`image/${fileType}`}
            />
            {/* eslint-disable-next-line @next/next/no-img-element*/}
            <img
                src={config.author.logoImageUrl}
                width={width}
                height={height}
                alt={alt}
                loading="lazy"
                decoding="async"
            />
        </picture>
    )
}

const ProfileButtonContainer = styled.button<IsLight>`
    transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0.5rem;

    border-radius: ${(p) => p.theme.bsm};

    background-color: ${(p) => p.theme.containerBackgroundColor};
    border: 1.25px solid ${(p) => p.theme.containerBorderColor};

    ${(p) =>
        iconStyle.md({
            color: p.theme.headerFontColor,
        })};

    &:hover {
        background-color: ${(p) => p.theme.headerFontColor};
        svg {
            fill: ${(p) => p.theme.containerBackgroundColor};
        }
    }

    &:active {
        transform: translateY(2px);
    }

    ${media.widePhone} {
        padding: 0.35rem;
        border-radius: ${(p) => p.theme.bmd};
    }
`
const PROFILE_BUTTON = (
    width: string,
    height: string
): {
    [key in keyof typeof config.author.contacts]: React.ReactNode
} => ({
    email: <SendIcon width={width} height={height} />,
    facebook: <FacebookIcon width={width} height={height} />,
    github: <GithubIcon width={width} height={height} />,
    instagram: <InstagramIcon width={width} height={height} />,
    linkedin: <LinkedinIcon width={width} height={height} />,
    twitter: <TwitterIcon width={width} height={height} />,
    youtube: <YoutubeIcon width={width} height={height} />,
})

const ProfileContactContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    gap: 0.5rem;

    width: 75%;

    margin-top: 1rem;

    ${media.widePhone} {
        width: 70%;
    }
`
const ProfileContactLink = styled.a`
    all: unset;
`
const ProfileContact = ({ contacts }: Pick<AuthorInfoType, "contacts">) => {
    const { isLight } = useThemeMode()
    return (
        <ProfileContactContainer>
            {Object.entries(contacts).map((contact) => {
                const key = contact[0] as keyof typeof contacts
                const contactInfo = contact[1]

                const isContactInfoExsist = contactInfo !== ""
                return (
                    isContactInfoExsist && (
                        <ProfileContactLink key={key} href={contactInfo}>
                            <ProfileButtonContainer
                                type="button"
                                aria-label={`${config.author.name} ${key} link`}
                                isLight={isLight}
                            >
                                {PROFILE_BUTTON("1.1rem", "1.1rem")[key]}
                            </ProfileButtonContainer>
                        </ProfileContactLink>
                    )
                )
            })}
        </ProfileContactContainer>
    )
}

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;

    gap: 1rem;

    width: 70%;
    height: 100%;
    min-height: 80vh;

    margin-bottom: 3rem;

    ${media.mediumTablet} {
        width: 85%;
    }

    ${media.widePhone} {
        flex-direction: column;
        align-items: center;
        justify-content: center;

        margin-top: 2rem;

        width: 100%;
    }
`

const ProfileContentContainer = styled.div`
    width: 100%;
    height: 100%;
    min-height: inherit;

    flex: 5;

    ${media.widePhone} {
        flex: unset;
    }
`

const ColumnFlex = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 100%;
    min-height: inherit;
`

const ProfileInfoContainer = styled.div`
    position: sticky;
    top: 6rem;

    flex: 2;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 1rem;

    ${media.widePhone} {
        position: static;
        flex: unset;

        gap: 0.5rem;
    }
`

const ProfileName = styled.p`
    font-size: ${(p) => p.theme.xlg};
    font-weight: 800;
    color: ${(p) => p.theme.headerFontColor};
    text-transform: capitalize;

    margin-bottom: 0.5rem;

    ${media.widePhone} {
        margin-top: 0.5rem;
        font-size: ${(p) => p.theme.lg};
    }
`
const ProfileDivider = styled.div`
    height: 1.25px;
    width: 1rem;
    background-color: ${(p) => p.theme.containerBorderColor};

    margin: 0.25rem 0;
    border-radius: ${(p) => p.theme.bxsm};

    ${media.widePhone} {
        margin: 0;
        width: 0.75rem;
        height: 1px;
    }
`
const ProfileState = styled.p`
    color: ${(p) => p.theme.descriptionFontColor};
    font-size: ${(p) => p.theme.md};
    font-weight: 400;
    line-height: 1.15rem;
    word-break: break-word;

    padding: 0.35rem 0.5rem;

    border-radius: ${(p) => p.theme.bmd};

    border: 1px solid transparent;

    &:hover {
        border-color: ${(p) => p.theme.containerBorderColor};
    }

    ${media.widePhone} {
        font-size: ${(p) => p.theme.sm};
    }
`
const ProfileTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    ${media.widePhone} {
        gap: 0.25rem;
    }
`

const FooterContainer = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    gap: 0.5rem;

    width: 100%;

    padding-top: 1rem;
    border-top: 1px solid ${(p) => p.theme.containerBorderColor};
    margin-top: 2rem;

    color: ${(p) => p.theme.descriptionFontColor};
    font-size: ${(p) => p.theme.sm};
`

const Copyright = styled.a`
    all: unset;

    font-weight: 700;
    font-style: italic;

    &:hover {
        color: ${(p) => p.theme.fontColor};
        text-decoration: underline;
    }

    cursor: pointer;
`

interface ProfileProps {
    profileSource: string
}

function Profile({ profileSource }: ProfileProps) {
    useSetFocusingPageColor(config.userPallete.primary4)

    return (
        <ProfileContainer>
            <ProfileInfoContainer>
                <ProfileTextContainer>
                    <ProfileLogo width={100} height={100} />

                    <ProfileName>{config.author.name}</ProfileName>

                    <ProfileDivider />

                    <ProfileState>{config.author.currentState}</ProfileState>
                    <ProfileState>{config.author.currentGoal}</ProfileState>

                    <ProfileDivider />

                    <ProfileContact contacts={config.author.contacts} />
                </ProfileTextContainer>
            </ProfileInfoContainer>

            <ProfileContentContainer>
                <ColumnFlex>
                    <div>
                        <MDXBundler mdxSource={profileSource} />
                    </div>

                    <FooterContainer>
                        <p>{config.copyright}</p>
                        <p>
                            This Blog is powered by{" "}
                            <Copyright href="https://github.com/danpa725/next-your-home">
                                next your home 🏠
                            </Copyright>
                        </p>
                    </FooterContainer>
                </ColumnFlex>
            </ProfileContentContainer>
        </ProfileContainer>
    )
}
Profile.displayName = "Profile" as PageType

export default Profile
