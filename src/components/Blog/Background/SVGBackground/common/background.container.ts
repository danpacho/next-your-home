import { IsLight } from "@typing/theme"
import styled from "styled-components"

const SVGContainer = styled.svg<IsLight>`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    width: 100%;
    min-width: 100vw;
    height: 100%;
    min-height: 100vh;

    user-select: none;

    transition: background-color ease-out 0.5s;
    background-color: ${(p) => !p.isLight && p.theme.backgroundDark};

    z-index: ${(p) => p.theme.zBackground};
`

export default SVGContainer
