import CategoryLink from "@/components/Blog/Main/CategoryLink/CategoryLink"
import PostLink from "@/components/Blog/Common/PostLink/PostLink"
import media from "@/styles/utils/media"

import {
    getCategoryInfoArray,
    getCategoryInfoArrayByJson,
} from "@/utils/function/blog-contents-loader/category/getCategory"
import { getLatestPostMeta } from "@/utils/function/blog-contents-loader/category/getCategoryPost"
import { CategoryInfo } from "@/utils/types/category/categoryInfo"
import { PostMetaType } from "@/utils/types/main/postMeta"
import { GetStaticProps } from "next"
import styled from "styled-components"
import { PageType } from "@/utils/types/pageType"

//* Main
const MainPageContainer = styled.div`
    width: 70%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;

    gap: 1rem;

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

    flex: 6;

    gap: 1rem;

    ${media.widePhone} {
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
    height: 32.5rem;
    overflow-y: scroll;

    gap: 1.75rem;
    padding-right: 1rem;

    ::-webkit-scrollbar {
        width: 0.125rem;
        padding: 0.25rem;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${(p) => p.theme.primary1};
        border-radius: 0.2rem;
    }

    ::-webkit-scrollbar-track {
        background: ${(p) => p.theme.primary1}36;
        border-radius: 0.2rem;
    }

    ${media.widePhone} {
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

    flex: 4;

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

    overflow-y: scroll;

    gap: 1.75rem;

    ${media.widePhone} {
        height: fit-content;
        width: inherit;

        align-items: center;
        justify-content: center;

        gap: 1.5rem;

        overflow-y: auto;

        padding-bottom: 2.5rem;
    }
`

const ContainerTitle = styled.div`
    font-size: ${(p) => p.theme.sm};
    font-weight: 400;
    color: ${(p) => p.theme.primary1};
    background-color: ${(p) => p.theme.primary1}36;
    border-radius: ${(p) => `0 0 ${p.theme.bsm} ${p.theme.bsm}`};
    padding: 0.15rem 0.35rem;

    user-select: none;

    ${media.widePhone} {
        border-radius: ${(p) => `0 ${p.theme.bsm} ${p.theme.bsm} 0`};
        border-left: 0.25rem solid ${(p) => p.theme.primary1};
        margin-left: 5%;
    }
`
interface MainPageProps {
    latestPostArray: PostMetaType[]
    categoryInfoArray: CategoryInfo[]
}

function MainPage({ latestPostArray, categoryInfoArray }: MainPageProps) {
    return (
        <MainPageContainer>
            <CategoryContainer>
                <ContainerTitle>Category</ContainerTitle>
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
                <ContainerTitle>Latest Post</ContainerTitle>
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
    const latestPostArray = await getLatestPostMeta()
    const categoryInfoArray = await getCategoryInfoArrayByJson()
    return {
        props: {
            latestPostArray,
            categoryInfoArray,
        },
    }
}
