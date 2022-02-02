import { useCallback, useEffect, useState } from "react"
import { Meta } from "@utils/types/post/post"
import styled from "styled-components"
import animation from "@/styles/utils/animation"
import { useCurrentFocusingTitleArray, useFocusingTitle } from "@/atoms/atoms"
import media from "@/styles/utils/media"

const TOCPosition = styled.nav`
    position: fixed;

    top: 15%;
    right: 5%;

    width: 200px;
    height: fit-content;

    z-index: 100;

    ${media.xlarge} {
        display: none;
    }
`

const TOCContainer = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    padding-left: 0.5rem;
`

interface LinkStyle {
    isFocusing: boolean
}

const HeaderLinkCommon = styled.div<LinkStyle>`
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

    width: 100%;

    padding: 0.75rem 0.25rem;
    border-left: 0.15rem solid ${(p) => p.theme.gray2};

    font-size: ${({ theme }) => theme.sm};
    text-decoration: none;

    animation: ${animation.fadeIn} 3s cubic-bezier(0.19, 1, 0.22, 1);

    &:hover {
        font-size: 0.825rem;
    }

    cursor: pointer;
`

const H1Link = styled(HeaderLinkCommon)<{ index: number }>`
    font-weight: 700;

    border-color: ${({ theme, isFocusing }) => isFocusing && theme.yellow3};
    border-width: ${({ isFocusing }) => isFocusing && "0.25rem"};

    &:hover {
        border-color: ${(p) => p.theme.teal4};
        border-width: 0.25rem;
    }

    animation-delay: ${({ index }) => index * 70}ms;
`

const H2Link = styled(HeaderLinkCommon)`
    &:first-child {
        margin-top: 1.25rem;
    }
    margin-left: 1.25rem;

    font-weight: 500;
    color: ${(p) => p.theme.gray7};

    &:hover {
        border-width: 0.25rem;
        border-color: ${(p) => p.theme.teal2};
        color: ${(p) => p.theme.trueDeepDark};
    }
`

interface HeaderInfoArray {
    title: string
    onClick: () => void
    children?: {
        title: string
        onClick: () => void
    }[]
}

const sliceTextByMaxLength = (text: string, max: number) =>
    text.length <= max ? text : `${text.slice(0, max + 1)} ...`

interface TableOfContentProp extends Pick<Meta, "title"> {}

function TableOfContent({ title: updateTrigger }: TableOfContentProp) {
    const focusingTitle = useFocusingTitle()
    const [currentFocusingTitleArray, setCurrentFocusingTitleArray] =
        useCurrentFocusingTitleArray()

    const [headerInfoArray, setHeaderInfoArray] = useState<HeaderInfoArray[]>(
        []
    )
    const [isFocusing, setIsFocusing] = useState(false)

    useEffect(() => {
        const allHeaderInfoArray: {
            title: string
            onClick: () => void
            type: string
        }[] = []
        const initialTitleArray: typeof currentFocusingTitleArray = []

        document.querySelectorAll("h1, h2").forEach((item) => {
            const title = item.textContent?.trim()
            const { nodeName } = item
            if (title) {
                allHeaderInfoArray.push({
                    title,
                    onClick: () =>
                        item.scrollIntoView({
                            behavior: "smooth",
                        }),
                    type: nodeName,
                })
                nodeName === "H1" &&
                    initialTitleArray.push({
                        title,
                        isFocusing: false,
                    })
            }
        })

        const H2ParentIndex: number[] = []

        allHeaderInfoArray.forEach((data, idx, tot) => {
            if (data.type === "H2" && tot[idx - 1].type === "H1")
                H2ParentIndex.push(idx - 1)
        })

        let H2ChildrenArray: {
            title: string
            onClick: () => void
        }[] = []
        const H2Children: typeof H2ChildrenArray[] = []

        allHeaderInfoArray.forEach(({ onClick, title, type }, idx, tot) => {
            if (idx === 0) return
            if (type === "H2")
                H2ChildrenArray.push({
                    title,
                    onClick,
                })
            if (type === "H1" && tot[idx - 1].type === "H2") {
                H2Children.push(H2ChildrenArray)
                H2ChildrenArray = []
            }
            if (idx === tot.length - 1 && tot[tot.length - 1].type === "H2")
                H2Children.push(H2ChildrenArray)
        })

        const documentHeaderInfoArray = allHeaderInfoArray
            .map(({ onClick, title, type }, idx) => {
                if (type === "H2") return

                const isIndexIsParent = H2ParentIndex.includes(idx)
                if (isIndexIsParent) {
                    const indexOfH2Parent = H2ParentIndex.indexOf(idx)
                    return {
                        onClick,
                        title,
                        children: H2Children[indexOfH2Parent],
                    }
                }
                return {
                    onClick,
                    title,
                }
            })
            .filter((data) => data)

        //@ts-ignore
        setHeaderInfoArray(documentHeaderInfoArray)
        setCurrentFocusingTitleArray(initialTitleArray)
    }, [setHeaderInfoArray, updateTrigger, setCurrentFocusingTitleArray])

    return (
        <TOCPosition>
            <TOCContainer
                onMouseEnter={() => setIsFocusing(true)}
                onMouseLeave={() => setIsFocusing(false)}
            >
                {headerInfoArray.map(({ title, onClick, children }, index) => {
                    const isTitleFocusing = focusingTitle === title
                    return (
                        <>
                            <H1Link
                                index={index}
                                isFocusing={isTitleFocusing}
                                onClick={onClick}
                                key={title}
                            >
                                🍞
                                {sliceTextByMaxLength(title, 16)}
                                {(isTitleFocusing || isFocusing) &&
                                    children?.map(({ title, onClick }) => (
                                        <H2Link
                                            key={title}
                                            isFocusing={isTitleFocusing}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                onClick()
                                            }}
                                        >
                                            🥛
                                            {sliceTextByMaxLength(title, 15)}
                                        </H2Link>
                                    ))}
                            </H1Link>
                        </>
                    )
                })}
            </TOCContainer>
        </TOCPosition>
    )
}

export default TableOfContent
