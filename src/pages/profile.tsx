import styled from "styled-components"
import media from "@styles/utils/media"
import { iconStyle } from "@styles/utils/icon.style"

import { GetStaticProps } from "next"
import Image from "next/image"

import { PageType } from "@typing/page/type"
import { IsLight } from "@typing/theme"

import { getProfileSource } from "@utils/function/blog-contents-loader/profile/getProfile"

import useSetFocusingPageColor from "@hooks/useSetFocusingPageColor"

import {
    FacebookIcon,
    GithubIcon,
    HeartIcon,
    InstagramIcon,
    LinkedinIcon,
    SendIcon,
    TwitterIcon,
    YoutubeIcon,
} from "@components/UI/Atoms/Icons"
import MDXBundler from "@components/MDXBundler"

import { useAtoms, _slector } from "@lib/jotai"

import { AuthorInfoType, config } from "blog.config"

export const getStaticProps: GetStaticProps<ProfileProps> = async () => {
    const profileSource = await getProfileSource()
    return {
        props: {
            profileSource,
        },
    }
}

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;

    gap: 1rem;
    width: 70%;
    min-height: 35rem;

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
    flex: 5;

    ${media.widePhone} {
        flex: unset;
    }
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
const ProfileImageContainer = styled.div`
    transition: all ease-out 0.1s;
    position: relative;
    width: 6rem;
    aspect-ratio: 1/1;
    filter: drop-shadow(rgba(0, 0, 0, 0.1) 0px 0px 25px -5px);

    &:hover {
        transform: scale(1.05);
        filter: drop-shadow(rgba(0, 0, 0, 0.2) 0px 0px 5px 5px);
    }

    ${media.widePhone} {
        width: 6.5rem;
    }
`

const ProfileState = styled.p`
    color: ${(p) => p.theme.fontColor};
    font-size: ${(p) => p.theme.md};
    font-weight: 400;
    line-height: 1.15rem;
    word-break: break-all;

    padding: 0.35rem 0.5rem;

    border-radius: ${(p) => p.theme.bmd};

    border: 1px solid transparent;

    &:hover {
        border-color: ${(p) => p.theme.containerBorderColor};
    }

    ${media.widePhone} {
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

const Copyright = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    margin-top: 3.5rem;
    margin-bottom: 2rem;

    color: ${(p) => p.theme.descriptionFontColor};
    font-size: ${(p) => p.theme.md};
    font-weight: 400;

    ${(p) => iconStyle.md({ color: p.theme.red4 })};
`

interface ProfileProps {
    profileSource: string
}

function Profile({ profileSource }: ProfileProps) {
    useSetFocusingPageColor(config.userPallete.primary4)

    return (
        <ProfileContainer>
            <ProfileInfoContainer>
                <ProfileImageContainer>
                    <Image
                        src={config.author.avatarImageUrl}
                        alt="profile image"
                        layout="fill"
                        loading="lazy"
                    />
                </ProfileImageContainer>
                <ProfileTextContainer>
                    <ProfileName>{config.author.name}</ProfileName>
                    <ProfileDivider />
                    <ProfileState>{config.author.currentState}</ProfileState>
                    <ProfileState>{config.author.currentGoal}</ProfileState>
                    <ProfileDivider />
                    <ProfileContact contacts={config.author.contacts} />
                </ProfileTextContainer>
            </ProfileInfoContainer>
            <ProfileContentContainer>
                <MDXBundler mdxSource={profileSource} />
                <Copyright>
                    {config.copyright}{" "}
                    <HeartIcon width=".75rem" height=".75rem" />
                </Copyright>
            </ProfileContentContainer>
        </ProfileContainer>
    )
}
Profile.displayName = "Profile" as PageType

export default Profile

const ProfileButtonContainer = styled.button<IsLight>`
    transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0.5rem;

    border-radius: ${(p) => p.theme.bmd};

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
    [key in
        | "twitter"
        | "github"
        | "email"
        | "linkedin"
        | "instagram"
        | "facebook"
        | "youtube"]: React.ReactNode
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

    margin-top: 1rem;
    width: 75%;
    gap: 0.5rem;

    ${media.widePhone} {
        width: 70%;
    }
`
const ProfileContactLink = styled.a`
    all: unset;
`
const ProfileContact = ({ contacts }: Pick<AuthorInfoType, "contacts">) => {
    const { isLightState: isLight } = useAtoms(_slector("isLight"))

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
