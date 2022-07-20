import styled from "styled-components"
import media from "@styles/utils/media"
import { scrollBar } from "@styles/utils/scrollBar"

import { GetStaticProps } from "next"
import { NextSeo } from "next-seo"

import { CategoryInfoType } from "@typing/category/info"
import { PostMetaType } from "@typing/post/meta"
import { PageType } from "@typing/page/type"
import { IsLight } from "@typing/theme"

import { getLatestCategoryInfo } from "@utils/function/blog-contents-loader/contents/getCategory"
import { getLatestPostMeta } from "@utils/function/blog-contents-loader/contents/getCategoryPost"

import { useThemeMode } from "@hooks/index"

import { PostLink } from "@components/Blog/Post"
import { CategoryLink } from "@components/Blog/Category"

import { config } from "blog.config"

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

//* Main
const MainPageLayoutContainer = styled.div`
    width: 70%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;

    gap: 2rem;

    ${media.mediumTablet} {
        width: 85%;
        gap: 1rem;
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
    padding-bottom: 0.75rem;
    padding-right: 0.75rem;

    ${(p) => scrollBar.basic(p.theme.themePrimaryColor)};

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
    height: 31.25rem;

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
    color: ${({ theme }) => theme.themePrimaryColor};

    user-select: none;

    ${media.widePhone} {
        font-size: ${(p) => p.theme.sm};
        font-weight: 500;
    }
`

interface MainPageProps {
    latestPostArray: PostMetaType[]
    categoryInfoArray: CategoryInfoType[]
}

function MainPage({ latestPostArray, categoryInfoArray }: MainPageProps) {
    const { isLight } = useThemeMode()
    return (
        <MainPageLayoutContainer>
            <NextSeo
                title={config.siteName}
                canonical={config.url}
                description={config.subtitle}
            />
            <CategoryContainer>
                <ContainerTitle isLight={isLight}>Top Category</ContainerTitle>
                <CategoryLinkContainer>
                    {categoryInfoArray.map((categoryInfo) => (
                        <CategoryLink
                            {...categoryInfo}
                            _color={categoryInfo.color}
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
                            isLast={
                                order === latestPostArray.length - 1 &&
                                order !== 0
                            }
                            key={latestPost.title}
                        />
                    ))}
                </LatestPostLinkContainer>
            </LatestPostContainer>
        </MainPageLayoutContainer>
    )
}
MainPage.displayName = "Home" as PageType

export default MainPage
