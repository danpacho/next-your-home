import styled from "styled-components"
import media from "@styles/utils/media"

import { GetStaticProps } from "next"
import { NextSeo } from "next-seo"

import { CategoryInfoType } from "@typing/category/info"
import { PostMetaType } from "@typing/post/meta"
import { PageType } from "@typing/page/type"
import { IsLight } from "@typing/theme"

import { getLatestCategoryInfo } from "@utils/function/blog-contents-loader/contents/getCategory"
import { getLatestPostMeta } from "@utils/function/blog-contents-loader/contents/getCategoryPost"

import { useThemeIsLight } from "@lib/atoms/theme/theme.state"

import { PostLink } from "@components/Blog/Post"
import { CategoryLink } from "@components/Blog/Category"

import { config } from "blog.config"

//* Main
const MainPageContainer = styled.div`
    width: 70%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;

    gap: 1rem;

    ${media.mediumTablet} {
        width: 85%;
    }

    ${media.widePhone} {
        width: 100%;
        flex-direction: column-reverse;
        align-items: center;
        justify-content: center;

        padding: 2rem 0;
    }
`
//* Latest Post
const LatestPostContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;

    flex: 3;

    gap: 1rem;

    ${media.widePhone} {
        width: inherit;
        gap: 1.5rem;
        align-items: flex-start;
    }
`
const LatestPostLinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;

    width: 100%;
    height: 31.25rem;
    overflow-y: scroll;

    gap: 1.75rem;
    padding: 0.25rem 1rem 1rem 0;

    ::-webkit-scrollbar {
        width: 0.1rem;
        padding: 0.25rem;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.themePrimaryColor};
        border-radius: 0.2rem;
    }

    ::-webkit-scrollbar-track {
        background: ${({ theme }) =>
            `${theme.themePrimaryColor}${theme.opacity50}`};
        border-radius: 0.2rem;
    }

    ${media.widePhone} {
        width: inherit;
        height: fit-content;

        align-items: center;
        justify-content: center;

        gap: 1.5rem;

        padding-right: 0;
        padding-bottom: 2rem;
        overflow-y: auto;
    }
`

//* Category
const CategoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    flex: 2;

    gap: 1rem;

    ${media.widePhone} {
        width: inherit;
    }
`
const CategoryLinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    width: 100%;
    height: 32.5rem;
    padding: 0.25rem 1rem 1rem 0;

    gap: 1.75rem;

    ${media.widePhone} {
        height: fit-content;
        width: inherit;

        align-items: center;
        justify-content: center;

        gap: 1.5rem;

        padding-bottom: 2.5rem;
    }
`

const ContainerTitle = styled.div<IsLight>`
    font-size: ${(p) => p.theme.sm};
    font-weight: 300;
    color: ${({ theme }) => theme.themePrimaryColor};

    background-color: ${({ theme, isLight }) =>
        `${isLight ? theme.primary1 : "transparent"}${
            isLight && theme.opacity10
        }`};

    border-radius: ${(p) => p.theme.bxxsm};

    padding: 0.15rem 0.3rem;

    user-select: none;

    ${media.widePhone} {
        font-size: ${(p) => p.theme.sm};
        font-weight: 500;

        border-radius: ${(p) => `0 ${p.theme.bxsm} ${p.theme.bxsm} 0`};
        border-left: 0.15rem solid ${(p) => p.theme.primary1};
        margin-left: 2.5%;
    }
`
interface MainPageProps {
    latestPostArray: PostMetaType[]
    categoryInfoArray: CategoryInfoType[]
}

function MainPage({ latestPostArray, categoryInfoArray }: MainPageProps) {
    const isLight = useThemeIsLight()
    return (
        <MainPageContainer>
            <NextSeo
                title={config.siteName}
                description={config.subtitle}
                canonical={config.url}
            />
            <CategoryContainer>
                <ContainerTitle isLight={isLight}>Category</ContainerTitle>
                <CategoryLinkContainer>
                    {categoryInfoArray.map((categoryInfo) => (
                        <CategoryLink
                            {...categoryInfo}
                            key={categoryInfo.category}
                        />
                    ))}
                </CategoryLinkContainer>
            </CategoryContainer>

            <LatestPostContainer>
                <ContainerTitle isLight={isLight}>Latest Post</ContainerTitle>
                <LatestPostLinkContainer>
                    {latestPostArray.map((latestPost, order) => (
                        <PostLink
                            {...latestPost}
                            order={order}
                            isFirst={order === 0}
                            isLast={order === latestPostArray.length - 1}
                            key={latestPost.title}
                        />
                    ))}
                </LatestPostLinkContainer>
            </LatestPostContainer>
        </MainPageContainer>
    )
}
MainPage.displayName = "Home" as PageType

export default MainPage

export const getStaticProps: GetStaticProps<MainPageProps> = async () => {
    const latestPostMetaArray = await getLatestPostMeta()
    const latestCategoryInfoArray = await getLatestCategoryInfo({
        useTXT: config.useTXT,
    })

    return {
        props: {
            latestPostArray: latestPostMetaArray,
            categoryInfoArray: latestCategoryInfoArray,
        },
    }
}
