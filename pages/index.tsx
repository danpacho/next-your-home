import CategoryLink from "@/components/Post/Main/CategoryLink/CategoryLink"
import LatestPostLink from "@/components/Post/Main/LatestPostLink/LatestPostLink"
import { getCategoryInfoArray } from "@/utils/function/blog-contents-loader/category/getCategory"
import { getLatestPostMeta } from "@/utils/function/blog-contents-loader/category/post/getCategoryPost"
import { CategoryInfo } from "@/utils/types/category/category"
import { PostMeta } from "@/utils/types/main/meta"
import { GetStaticProps } from "next"
import styled from "styled-components"

const MainContainer = styled.div`
    width: 80%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;

    gap: 1.5rem;
`

const CategoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    gap: 1.75rem;
`

const LatestPostContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    gap: 1.75rem;

    /* background-color: whitesmoke; */
`

interface MainPageProps {
    latestPostArray: PostMeta[]
    categoryInfoArray: CategoryInfo[]
}

//TODO 메인페이지 피그마 시안 컴포넌트 제작
function MainPage({ latestPostArray, categoryInfoArray }: MainPageProps) {
    return (
        <MainContainer>
            <CategoryContainer>
                {categoryInfoArray.map((categoryInfo) => (
                    <CategoryLink
                        {...categoryInfo}
                        key={categoryInfo.category}
                    />
                ))}
            </CategoryContainer>

            <LatestPostContainer>
                {latestPostArray.map((latestPost, order) => (
                    <LatestPostLink
                        {...latestPost}
                        order={order}
                        isFirst={order === 0}
                        isLast={order === latestPostArray.length - 1}
                        key={latestPost.title}
                    />
                ))}
            </LatestPostContainer>
        </MainContainer>
    )
}

export default MainPage

export const getStaticProps: GetStaticProps = async () => {
    const latestPostArray = await getLatestPostMeta(3)
    const categoryInfoArray = await getCategoryInfoArray()
    return {
        props: {
            latestPostArray,
            categoryInfoArray,
        },
    }
}
