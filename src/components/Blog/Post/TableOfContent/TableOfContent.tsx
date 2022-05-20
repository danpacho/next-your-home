import { useEffect, useState } from "react"

import styled from "styled-components"
import animation from "@styles/utils/animation"
import media from "@styles/utils/media"

import { PostMetaType } from "@typing/post/meta"

import { useFocusTitle } from "@lib/atoms/tableOfContent/tableOfContent.state"

import { sliceTextByMaxLength } from "@utils/function/text"

const TOCContainer = styled.div`
    min-width: max-content;
    height: fit-content;

    display: flex;
    justify-content: center;
    flex-direction: column;

    z-index: ${(p) => p.theme.zContnet};
`

interface LinkStyle {
    isFocusing: boolean
}

const HeaderLinkCommon = styled.div<LinkStyle>`
    width: 100%;
    padding: 0.75rem 0.25rem;
    border-left: 0.1rem solid ${(p) => p.theme.gray2};

    color: ${(p) => p.theme.fontColor};
    font-size: ${({ theme }) => theme.sm};

    animation: ${animation.pureZoomIn} 1.35s cubic-bezier(0.19, 1, 0.22, 1);
    transform-origin: left;

    &:hover {
        color: ${(p) => p.theme.themePrimaryColor};
    }

    div:nth-child(2) {
        margin-top: 1rem;
    }

    cursor: pointer;
`

const H1Link = styled(HeaderLinkCommon)<{ index: number }>`
    transition: background-color 0.2s ease;

    font-weight: ${(p) => (p.isFocusing ? 700 : 500)};
    color: ${({ isFocusing, theme }) => isFocusing && theme.themePrimaryColor};

    border-color: ${({ theme, isFocusing }) =>
        isFocusing && theme.themePrimaryColor};

    height: ${(p) => (p.isFocusing ? "fit-content" : "1.25rem")};
    min-height: 1.25rem;

    &:hover {
        background-color: ${({ theme }) => `${theme.containerBackgroundColor}`};
        border-radius: ${(p) => `0 ${p.theme.bmd} ${p.theme.bmd} 0`};
    }

    p {
        //* text-center
        margin-top: 0.125rem;
    }

    animation-delay: ${({ index }) => index * 85}ms;
`

const H2Link = styled(HeaderLinkCommon)`
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

    margin-left: 1.25rem;

    &:first-child {
        margin-bottom: 1rem;
    }

    color: ${(p) => p.theme.descriptionFontColor};

    &:hover {
        border-color: ${(p) => p.theme.themePrimaryColor};
    }

    transform-origin: left;
    transform: scale(${(p) => (p.isFocusing ? "1" : "0")})
        translateY(${(p) => (p.isFocusing ? "0" : "-10px")});

    visibility: ${(p) => (p.isFocusing ? "visible" : "hidden")};

    ${media.mediumTablet} {
        display: none;
    }

    font-weight: 400;
`

const TITLE_MAX_LENGTH = {
    h1: 17,
    h2: 15,
}

interface HeaderInfo {
    title: string
    onClick: () => void
    type: HeaderType
}
interface DOMHeaderInfo extends Omit<HeaderInfo, "type"> {
    children: H2Children[]
}

interface H2Children {
    title: string
    onClick(): void
}

type HeaderType = "H1" | "H2"

const getTableOfcontentsDOM = (): DOMHeaderInfo[] => {
    const headerInfoArray: HeaderInfo[] = []

    document.querySelectorAll("h1, h2").forEach((item) => {
        const header = item.textContent?.trim()
        const type = item.nodeName as HeaderType
        if (header) {
            headerInfoArray.push({
                title: header,
                type,
                onClick: () =>
                    item.scrollIntoView({
                        behavior: "smooth",
                    }),
            })
        }
    })

    const H2ParentIndexNumberArray: number[] = headerInfoArray.reduce<number[]>(
        (accH2ParentIndexNumberArray, { type }, idx, tot) => {
            if (type === "H2" && tot[idx - 1].type === "H1")
                return [...accH2ParentIndexNumberArray, idx - 1]
            return accH2ParentIndexNumberArray
        },
        []
    )

    let H2ChildrenTempArray: H2Children[] = []

    const haederInfoArrayLength = headerInfoArray.length
    const H2Children = headerInfoArray.reduce<typeof H2ChildrenTempArray[]>(
        (H2ChildrenAcc, { onClick, title, type }, index, headerInfoArray) => {
            if (index === 0) return H2ChildrenAcc

            //* H2 태그 임시 저장
            if (type === "H2")
                H2ChildrenTempArray.push({
                    title,
                    onClick,
                })

            //* 새로운 제목 등장, 직전까지 H2 태그
            if (type === "H1" && headerInfoArray[index - 1].type === "H2") {
                H2ChildrenAcc.push(H2ChildrenTempArray)
                H2ChildrenTempArray = [] //* 초기화
            }

            //* 마지막 H2 예외 케이스
            if (
                index === haederInfoArrayLength - 1 &&
                headerInfoArray[haederInfoArrayLength - 1].type === "H2"
            )
                H2ChildrenAcc.push(H2ChildrenTempArray)

            return H2ChildrenAcc
        },
        []
    )

    const DOMHeaderInfoArray = headerInfoArray.reduce<DOMHeaderInfo[]>(
        (DOMHeaderInfoArrayAcc, { onClick, title, type }, index) => {
            if (type === "H2") return DOMHeaderInfoArrayAcc

            const isIndexIsParent = H2ParentIndexNumberArray.includes(index)
            if (isIndexIsParent) {
                const H2ParentIndex = H2ParentIndexNumberArray.indexOf(index)
                return [
                    ...DOMHeaderInfoArrayAcc,
                    {
                        onClick,
                        title,
                        children: H2Children[H2ParentIndex],
                    },
                ]
            }

            return [
                ...DOMHeaderInfoArrayAcc,
                {
                    title,
                    onClick,
                    children: [],
                },
            ]
        },
        []
    )

    return DOMHeaderInfoArray
}

interface TableOfContentProp extends Pick<PostMetaType, "title"> {}

function TableOfContent({ title: updateTrigger }: TableOfContentProp) {
    const [focusTitle, _] = useFocusTitle()
    const [headerInfoArray, setHeaderInfoArray] = useState<DOMHeaderInfo[]>([])

    const [isFocusing, setIsFocusing] = useState(false)

    useEffect(() => {
        const DOMHeaderInfoArray = getTableOfcontentsDOM()
        setHeaderInfoArray(DOMHeaderInfoArray)
    }, [setHeaderInfoArray, updateTrigger])

    return (
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
                            <p>
                                🍞{" "}
                                {sliceTextByMaxLength(
                                    title,
                                    TITLE_MAX_LENGTH.h1
                                )}
                            </p>
                            {children?.map(({ title: childTitle, onClick }) => (
                                <H2Link
                                    key={childTitle}
                                    isFocusing={isTitleFocusing || isFocusing}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onClick()
                                    }}
                                >
                                    <p>
                                        🥛{" "}
                                        {sliceTextByMaxLength(
                                            childTitle,
                                            TITLE_MAX_LENGTH.h2
                                        )}
                                    </p>
                                </H2Link>
                            ))}
                        </H1Link>
                    </>
                )
            })}
        </TOCContainer>
    )
}

export default TableOfContent
