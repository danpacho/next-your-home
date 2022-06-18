import styled from "styled-components"
import media from "@styles/utils/media"

import { TableOfContents } from "@hooks/useTableOfContent"

const Container = styled.div`
    display: none;

    ${media.mediumTablet} {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        gap: 0.25rem;
    }
`

const H1Link = styled.div`
    font-size: ${(p) => p.theme.lg};
    font-weight: 700;
    color: ${(p) => p.theme.fontColor};
    padding: 0.25rem 0;
`
const H2LinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 0.75rem;

    margin: 1rem 0;
    margin-left: 0.5rem;

    border-left: 2px solid ${(p) => p.theme.fontColor};
`

const H2Link = styled.div`
    font-size: ${(p) => p.theme.md};
    font-weight: 400;
    color: ${(p) => p.theme.descriptionFontColor};

    padding: 0.15rem 0;
`
const ORDER_TEXT = {
    H1: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
}
function TableOfContentMobile({
    tableOfContents,
}: {
    tableOfContents: TableOfContents[]
}) {
    return (
        <Container>
            {tableOfContents.map(({ title, onClick, children }, order) => (
                <H1Link onClick={onClick} key={title}>
                    {ORDER_TEXT.H1[order]}. {title}
                    {children && (
                        <H2LinkContainer>
                            {children.map(({ title: childTitle, onClick }) => (
                                <H2Link key={childTitle} onClick={onClick}>
                                    {childTitle}
                                </H2Link>
                            ))}
                        </H2LinkContainer>
                    )}
                </H1Link>
            ))}
        </Container>
    )
}

export default TableOfContentMobile
