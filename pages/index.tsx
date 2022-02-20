import LatestPostLink from "@/components/Post/Main/LatestPostLink/LatestPostLink"
import { getCategoryInfoArray } from "@/utils/function/blog-contents-loader/category/getCategory"
import { getLatestPost } from "@/utils/function/blog-contents-loader/category/post/getCategoryPost"
import { CategoryInfo } from "@/utils/types/category/category"
import { PostMeta } from "@/utils/types/main/meta"
import { GetStaticProps } from "next"
import styled from "styled-components"

const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    gap: 2.5rem;
`

const CategoryContainer = styled.div`
    display: grid;
    grid-template-rows: repeat(2, 1fr);

    gap: 1.5rem;

    align-items: center;
    justify-items: center;
`

const LatestPostContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 1.75rem;

    /* background-color: whitesmoke; */

    padding: 5rem;
`

interface MainPageProps {
    latestPostArray: PostMeta[]
    categoryInfoArray: CategoryInfo[]
}
//TODO 메인페이지 피그마 시안 컴포넌트 제작
function MainPage({ latestPostArray, categoryInfoArray }: MainPageProps) {
    console.log(categoryInfoArray)
    return (
        <MainContainer>
            <CategoryContainer></CategoryContainer>
            <LatestPostContainer>
                {latestPostArray.map((latestPost, idx) => {
                    return (
                        <LatestPostLink
                            {...latestPost}
                            order={idx}
                            isFirst={idx === 0}
                            isLast={idx === latestPostArray.length - 1}
                            key={latestPost.title}
                        />
                    )
                })}
            </LatestPostContainer>
        </MainContainer>
    )
}

export default MainPage

export const getStaticProps: GetStaticProps = async () => {
    const latestPostArray = await getLatestPost(3)
    const categoryInfoArray = await getCategoryInfoArray()
    return {
        props: {
            latestPostArray,
            categoryInfoArray,
        },
    }
}
