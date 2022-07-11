import media from "@styles/utils/media"
import styled from "styled-components"

const LIStyled = styled.li`
    font-size: ${(p) => p.theme.md};
    font-weight: 500;
    color: ${(p) => p.theme.fontColor};

    ul {
        margin-left: 1.75rem;
        list-style-type: circle;
        ul {
            list-style-type: square;
            ul {
                list-style-type: disc;
                ul {
                    list-style-type: circle;
                    ul {
                        list-style-type: square;
                    }
                }
            }
        }
    }

    ol {
        margin-left: 1.75rem;
        list-style-type: upper-alpha;

        ol {
            list-style-type: lower-alpha;
            ol {
                list-style-type: upper-roman;
                ol {
                    list-style-type: lower-roman;
                }
            }
        }
    }

    ${media.widePhone} {
        ul {
            margin-left: 1.25rem;
        }
        ol {
            margin-left: 1.25rem;
        }
    }
`

function LI(props: any) {
    return <LIStyled {...props} />
}

export default LI
