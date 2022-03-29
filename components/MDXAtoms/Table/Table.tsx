import media from "@/styles/utils/media"
import styled from "styled-components"

const TableStyled = styled.table`
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
            background-color: ${(p) => p.theme.gray1};
        }
        ${media.widePhone} {
            background-color: white;
        }
    }
    margin: 1.5rem 0;
`

const Table = (props: any) => <TableStyled {...props}></TableStyled>

export default Table
