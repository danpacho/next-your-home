import styled from "styled-components"
import shadow from "@styles/utils/shadow"

import { CodeContentBox as CodeLanguage } from "./Code/CodeCopyButton"

const CodeWrapper = styled.div`
    position: relative;
    width: 100%;

    margin: 1rem 0;

    box-shadow: ${shadow.shadowMd};
`

const CodeParentContainer = styled.pre`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    width: 100%;

    margin: 1rem 0;

    border-radius: ${(p) => p.theme.bmd};
`

function Pre(props: any) {
    const language = props.className.split(" ")[0].replace("language-", "")

    return (
        <CodeWrapper>
            <CodeParentContainer {...props} />
            <CodeLanguage>{language}</CodeLanguage>
        </CodeWrapper>
    )
}

export default Pre
