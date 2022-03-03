import CategoryLink from "@/components/Post/Main/CategoryLink/CategoryLink"
import LatestPostLink from "@/components/Post/Main/LatestPostLink/LatestPostLink"
import MainBackground from "@/components/UI/Atoms/Background/Mainbackground"
import media from "@/styles/utils/media"
import { getCategoryInfoArray } from "@/utils/function/blog-contents-loader/category/getCategory"
import { getLatestPostMeta } from "@/utils/function/blog-contents-loader/category/post/getCategoryPost"
import { CategoryInfo } from "@/utils/types/category/category"
import { PostMeta } from "@/utils/types/main/meta"
import { GetStaticProps } from "next"
import styled from "styled-components"

const CONTAINER_INFO_COLOR = "#776350"
const MainPageContainer = styled.div`
    width: 70%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;

    gap: 1rem;

    ${media.widePhone} {
        width: fit-content;
        flex-direction: column-reverse;
        align-items: center;
        justify-content: center;

        gap: 2rem;

        padding: 2.5rem 0;
    }
`

const CategoryLinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    height: 35rem;
    overflow-y: scroll;

    gap: 1.75rem;

    ${media.widePhone} {
        height: fit-content;
        width: fit-content;
        padding: 2.5rem;
        overflow: auto;
        gap: 1.5rem;
        padding-right: 0;
        align-items: center;
        justify-content: center;
    }
`

const LatestPostLinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;

    height: 35rem;
    overflow-y: scroll;

    gap: 1.75rem;
    padding-right: 1rem;

    ::-webkit-scrollbar {
        width: 0.125rem;
        padding: 0.25rem;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${CONTAINER_INFO_COLOR};
        border-radius: 0.2rem;
    }

    ::-webkit-scrollbar-track {
        background: ${CONTAINER_INFO_COLOR}36;
        border-radius: 0.2rem;
    }

    ${media.widePhone} {
        height: fit-content;
        overflow: auto;
        gap: 1.5rem;
        padding-right: 0;
        align-items: center;
        justify-content: center;
    }
`
const LatestPostContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;

    gap: 1rem;

    ${media.widePhone} {
        gap: 1.5rem;
        align-items: flex-start;
    }
`

const ContainerInfo = styled.div`
    font-size: ${(p) => p.theme.sm};
    font-weight: 400;
    color: ${CONTAINER_INFO_COLOR};
    background-color: ${CONTAINER_INFO_COLOR}36;
    border-radius: ${(p) => `0 0 ${p.theme.bsm} ${p.theme.bsm}`};
    padding: 0.15rem 0.35rem;

    user-select: none;

    ${media.widePhone} {
        margin-left: 10%;
    }
`
const CategoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    gap: 1rem;
`

export type PageType = "Home" | "Category" | "Post"
interface MainPageProps {
    latestPostArray: PostMeta[]
    categoryInfoArray: CategoryInfo[]
}

function MainPage({ latestPostArray, categoryInfoArray }: MainPageProps) {
    return (
        <>
            <MainPageContainer>
                <CategoryContainer>
                    <ContainerInfo>Category</ContainerInfo>
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
                    <ContainerInfo>Latest Post</ContainerInfo>
                    <LatestPostLinkContainer>
                        {latestPostArray.map((latestPost, order) => (
                            <LatestPostLink
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
            <MainBackground pageType={"Home"} isLight={true} />
        </>
    )
}

export default MainPage

export const getStaticProps: GetStaticProps = async () => {
    const latestPostArray = await getLatestPostMeta()
    const categoryInfoArray = await getCategoryInfoArray()
    return {
        props: {
            latestPostArray,
            categoryInfoArray,
        },
    }
}
