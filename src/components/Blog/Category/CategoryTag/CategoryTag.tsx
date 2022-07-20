import styled, { css } from "styled-components"
import media from "@styles/utils/media"
import { iconStyle } from "@styles/utils/icon.style"

import { IsLight } from "@typing/theme"

import { useThemeMode } from "@hooks/index"

import { DeleteIcon, FlagFillIcon } from "@components/UI/Atoms/Icons"

const borderStyle = {
    topLeftBottomRight: css`
        border-radius: ${(p) =>
            `${p.theme.bxxlg} ${p.theme.bmd} ${p.theme.bxxlg} ${p.theme.bmd}`};

        ${media.widePhone} {
            border-radius: ${(p) =>
                `${p.theme.blg} ${p.theme.bsm} ${p.theme.blg} ${p.theme.bsm}`};
        }
    `,
    topRightBottomLeft: css`
        border-radius: ${(p) =>
            `${p.theme.bmd} ${p.theme.bxxlg} ${p.theme.bmd} ${p.theme.bxxlg}`};

        ${media.widePhone} {
            border-radius: ${(p) =>
                `${p.theme.bsm} ${p.theme.blg} ${p.theme.bsm} ${p.theme.blg}`};
        }
    `,
}

const backgroundStyle = {
    noneFiltered: (color: string, isLight: boolean) => css`
        background-color: ${(p) =>
            `${p.theme.containerBackgroundColor}${p.theme.opacity50}`};
        backdrop-filter: blur(10px);
        color: ${(p) => (isLight ? color : p.theme.gray2)};

        ${iconStyle.custom({ color, size: "0.75rem" })}

        &:hover {
            box-shadow: 4px 4px 0px ${color}${(p) => p.theme.opacity70};
        }
    `,
    filtered: (color: string) => css`
        background-color: ${color};
        color: ${(p) => p.theme.white};

        box-shadow: 0 0 0 2.5px ${color}${(p) => p.theme.opacity40};

        ${iconStyle.custom({ color: "white", size: "0.75rem" })}

        &:hover {
            box-shadow: -4px 4px 0px ${color}${(p) => p.theme.opacity30};
        }

        ${media.widePhone} {
            box-shadow: 0 0 0 2px ${color}${(p) => p.theme.opacity40};
        }
    `,
}

const tagStyle = [
    css`
        ${borderStyle.topLeftBottomRight}
    `,
    css`
        ${borderStyle.topRightBottomLeft}
    `,
    css`
        ${borderStyle.topRightBottomLeft}
    `,
    css`
        ${borderStyle.topLeftBottomRight}
    `,
]

interface TagBoxStyle {
    order: number
    isFiltered: boolean
    color: string
}

const Tag = styled.li<TagBoxStyle & IsLight>`
    transition: box-shadow ease-out 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 0.15rem;

    min-width: 7rem;

    padding: 0.75rem;

    border: 1.75px solid
        ${({ isFiltered, color, theme }) =>
            isFiltered ? "transparent" : `${color}${theme.opacity20}`};

    font-size: ${(p) => p.theme.sm};
    font-weight: 800;
    letter-spacing: 0.035rem;

    cursor: pointer;
    user-select: none;

    ${({ order }) => tagStyle[order]}
    ${({ color, isFiltered, isLight }) =>
        isFiltered
            ? backgroundStyle.filtered(color)
            : backgroundStyle.noneFiltered(color, isLight)}

    ${media.mediumTablet} {
        min-width: 6rem;

        font-weight: 700;
        letter-spacing: 0.02rem;
    }

    ${media.widePhone} {
        min-width: 3rem;

        padding: 0.525rem;

        font-size: ${(p) => p.theme.xsm};
        font-weight: 600;

        border-width: 1.5px;
    }
`
const TagContainer = styled.ul`
    display: flex;
    flex-wrap: wrap;

    gap: 0.75rem;

    width: 90%;
    height: fit-content;

    ${media.widePhone} {
        align-items: center;
        justify-content: center;

        gap: 0.5rem;

        width: 100%;
    }
`

interface CategoryTagProps {
    categoryColor: string
    categoryTagArray: string[]
    filteredTagArray: string[]
    setFilteredTagArray: React.Dispatch<React.SetStateAction<string[]>>
}
const getUpdatedFileterdTagArray = (
    slectedTag: string,
    filteredTagArray: string[]
) => {
    const isTagIncluded = filteredTagArray.includes(slectedTag)

    if (isTagIncluded)
        return filteredTagArray.filter((tag) => tag !== slectedTag)
    else return [...filteredTagArray, slectedTag]
}
const CategoryTag = ({
    categoryColor,
    categoryTagArray,
    filteredTagArray,
    setFilteredTagArray,
}: CategoryTagProps) => {
    const resetFilteredTagArray = () => setFilteredTagArray([])

    const { isLight } = useThemeMode()
    return (
        <TagContainer>
            {categoryTagArray?.map((categoryTag, order) => {
                const isFiltered = filteredTagArray.includes(categoryTag)
                return (
                    <Tag
                        onClick={() => {
                            const updatedFilteredTagArray =
                                getUpdatedFileterdTagArray(
                                    categoryTag,
                                    filteredTagArray
                                )
                            setFilteredTagArray(updatedFilteredTagArray)
                        }}
                        color={categoryColor}
                        isFiltered={isFiltered}
                        order={order % 4}
                        isLight={isLight}
                        key={categoryTag}
                    >
                        {isFiltered ? <FlagFillIcon /> : <p>#</p>}
                        {categoryTag}
                    </Tag>
                )
            })}
            {filteredTagArray.length !== 0 && (
                <Tag
                    order={categoryTagArray.length % 4}
                    isFiltered={true}
                    onClick={resetFilteredTagArray}
                    color={categoryColor}
                    isLight={isLight}
                >
                    <DeleteIcon />
                </Tag>
            )}
        </TagContainer>
    )
}

export default CategoryTag
