import LatestPostLink from "@/components/Post/Main/LatestPostLink/LatestPostLink"
import { getLatestPost } from "@/utils/function/blog-contents-loader/category/post/getCategoryPost"
import { PostMeta } from "@/utils/types/main/meta"
import { GetStaticProps } from "next"
import styled from "styled-components"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 1.75rem;

    /* background-color: whitesmoke; */

    padding: 5rem;
`

//TODO 메인페이지 피그마 시안 컴포넌트 제작
function MainPage({ latestPostArray }: { latestPostArray: PostMeta[] }) {
    return (
        <Container>
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
        </Container>
    )
}

export default MainPage

export const getStaticProps: GetStaticProps = async () => {
    const latestPostArray = await getLatestPost(3)
    return {
        props: {
            latestPostArray,
        },
    }
}
