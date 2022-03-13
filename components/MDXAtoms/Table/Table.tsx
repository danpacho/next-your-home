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

const ThStyled = styled.th`
    padding: 0.75rem 1rem;
    border-bottom: 1.5px solid ${(p) => p.theme.gray3};
    background-color: ${(p) => p.theme.gray2};
    text-align: center;

    ${media.widePhone} {
        padding: 0.75rem 0.5rem;
        font-size: ${(p) => p.theme.sm};
    }
`
const Th = (props: any) => <ThStyled {...props} />

const TdStyled = styled.td`
    font-size: ${(p) => p.theme.sm};
    font-weight: 500;
    color: ${(p) => p.theme.gray7};
    padding: 0.75rem 1.25rem;

    text-align: center;

    ${media.widePhone} {
        padding: 1rem 0.25rem;
    }
`
const Td = (props: any) => <TdStyled {...props} />

const TrStyled = styled.tr`
    border-bottom: 1.5px solid ${(p) => p.theme.gray2};
`
const Tr = (props: any) => <TrStyled {...props}></TrStyled>

export { Table, Th, Td, Tr }
