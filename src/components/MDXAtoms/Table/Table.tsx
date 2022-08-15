import styled from "styled-components"

import { IsLight } from "@typing/theme"

import { useStore, $ } from "@atom/index"

const TableStyled = styled.table<IsLight>`
    thead {
        th:first-child {
            border-top-left-radius: ${(p) => p.theme.bxsm};
        }
        th:last-child {
            border-top-right-radius: ${(p) => p.theme.bxsm};
        }
    }
    tbody {
        tr:nth-child(odd) {
            background-color: ${({ theme, isLight }) =>
                isLight ? theme.white : theme.backgroundDark};
        }
        tr:nth-child(even) {
            background-color: ${({ theme, isLight }) =>
                isLight ? theme.gray2 : theme.trueDeepDark};
        }
    }
    margin: 1rem 0;
`

const Table = (props: any) => {
    const { IsLight } = useStore($("isLight"))
    return <TableStyled {...props} isLight={IsLight} />
}

export default Table
