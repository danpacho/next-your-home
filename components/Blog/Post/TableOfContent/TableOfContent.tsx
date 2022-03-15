import { useEffect, useState } from "react"
import styled from "styled-components"
import animation from "@/styles/utils/animation"
import { useFocusTitle } from "@/lib/atoms"
import media from "@/styles/utils/media"
import { PostMetaType } from "@/utils/types/main/postMeta"
import { sliceTextByMaxLength } from "@/utils/function/text"

const TOCPosition = styled.nav`
    width: 200px;
    min-width: max-content;
    height: fit-content;

    z-index: ${(p) => p.theme.zContnet};

    ${media.mediumTablet} {
        display: none;
    }

    ${media.widePhone} {
    }
`

const TOCContainer = styled.ul`
    display: flex;
    justify-content: center;
    flex-direction: column;
`

interface LinkStyle {
    isFocusing: boolean
}

const HeaderLinkCommon = styled.div<LinkStyle>`
    width: 100%;
    padding: 0.75rem 0.25rem;
    border-left: 0.125rem solid ${(p) => p.theme.gray2};

    font-size: ${({ theme }) => theme.sm};
    text-decoration: none;

    animation: ${animation.pureZoomIn} 1.35s cubic-bezier(0.19, 1, 0.22, 1);
    transform-origin: left;

    &:hover {
        color: ${(p) => p.theme.primary1};
    }

    cursor: pointer;
`

const H1Link = styled(HeaderLinkCommon)<{ index: number }>`
    transition: border-color 0.75s cubic-bezier(0.075, 0.82, 0.165, 1);

    font-weight: 500;

    border-color: ${({ theme, isFocusing }) => isFocusing && theme.primary1};

    height: ${(p) => (p.isFocusing ? "fit-content" : "1.25rem")};
    min-height: 1.25rem;

    &:hover {
        border-color: ${(p) => p.theme.primary3};
    }

    animation-delay: ${({ index }) => index * 85}ms;
`

const H2Link = styled(HeaderLinkCommon)`
    transition: all 0.75s cubic-bezier(0.075, 0.82, 0.165, 1);

    &:first-child {
        margin-top: 1.25rem;
    }
    margin-left: 1.25rem;

    color: ${(p) => p.theme.gray5};

    &:hover {
        border-color: ${(p) => p.theme.gray3};
    }

    transform-origin: left;
    transform: scale(${(p) => (p.isFocusing ? "1" : "0")})
        translateX(${(p) => (p.isFocusing ? "0" : "200px")});

    visibility: ${(p) => (p.isFocusing ? "visible" : "hidden")};

    ${media.mediumTablet} {
        display: none;
    }

    font-weight: 400;
`

interface HeaderInfoArray {
    title: string
    onClick: () => void
    children?: {
        title: string
        onClick: () => void
    }[]
}

const TITLE_MAX_LENGTH = {
    h1: 16,
    h2: 15,
}

interface TableOfContentProp extends Pick<PostMetaType, "title"> {}

function TableOfContent({ title: updateTrigger }: TableOfContentProp) {
    const [focusTitle, _] = useFocusTitle()
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
    }, [setHeaderInfoArray, updateTrigger])

    return (
        <TOCPosition>
            <TOCContainer
                onMouseEnter={() => setIsFocusing(true)}
                onMouseLeave={() => setIsFocusing(false)}
            >
                {headerInfoArray.map(({ title, onClick, children }, index) => {
                    const isTitleFocusing = focusTitle === title
                    return (
                        <>
                            <H1Link
                                index={index}
                                isFocusing={isTitleFocusing || isFocusing}
                                onClick={onClick}
                                key={title}
                            >
                                🍞{" "}
                                {sliceTextByMaxLength(
                                    title,
                                    TITLE_MAX_LENGTH.h1
                                )}
                                {children?.map(
                                    ({ title: childTitle, onClick }) => (
                                        <H2Link
                                            key={childTitle}
                                            isFocusing={
                                                isTitleFocusing || isFocusing
                                            }
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                onClick()
                                            }}
                                        >
                                            🥛{" "}
                                            {sliceTextByMaxLength(
                                                childTitle,
                                                TITLE_MAX_LENGTH.h2
                                            )}
                                        </H2Link>
                                    )
                                )}
                            </H1Link>
                        </>
                    )
                })}
            </TOCContainer>
        </TOCPosition>
    )
}

export default TableOfContent
