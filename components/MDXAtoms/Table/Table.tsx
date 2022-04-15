import { useTheme } from "@/lib/atoms/theme/theme.state"
import media from "@/styles/utils/media"
import { IsLight } from "@/types/theme"
import styled from "styled-components"

const TableStyled = styled.table<IsLight>`
    thead {
        th:first-child {
            border-top-left-radius: ${(p) => p.theme.bsm};
        }
        th:last-child {
            border-top-right-radius: ${(p) => p.theme.bsm};
        }
    }
    tbody {
        tr:nth-child(even) {
            background-color: ${({ theme, isLight }) =>
                isLight ? theme.gray1 : theme.trueDeepDark};
        }
        ${media.widePhone} {
            background-color: transparent;
        }
    }
    margin: 1.5rem 0;
`

const Table = (props: any) => (
    <TableStyled {...props} isLight={useTheme() === "light"} />
)

export default Table
