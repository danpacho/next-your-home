import styled from "styled-components"

import { IsLight } from "@typing/theme"

import useThemeMode from "@hooks/useThemeMode"

const LinkStyled = styled.a<IsLight>`
    transition: color 0.1s ease-in;

    color: ${({ theme, isLight }) => (isLight ? theme.teal9 : theme.teal6)};
    font-size: ${(props) => props.theme.md};
    font-weight: 600;
    text-decoration: none;

    &:hover {
        color: ${({ theme, isLight }) => (isLight ? theme.teal7 : theme.teal4)};
        text-decoration: underline;
    }
`
interface LinkProps {
    href: string
    children: string
    target: string
}

function Link({ children: linkText, href, target }: LinkProps) {
    const { isLight } = useThemeMode()
    return (
        <LinkStyled href={href} target={target} isLight={isLight}>
            {linkText}
        </LinkStyled>
    )
}

export default Link
