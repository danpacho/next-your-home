import styled from "styled-components"

const LinkStyled = styled.a`
    transition: font-weight 0.15s ease-in;

    font-size: ${(props) => props.theme.md};
    font-weight: 700;
    color: ${(props) => props.theme.teal7};
    text-decoration: none;

    border-bottom: 0.15rem solid ${(props) => props.theme.teal7};

    &:active {
        color: ${(props) => props.theme.teal10};
    }

    &:hover {
        color: ${(props) => props.theme.teal10};
    }
`
interface LinkProps {
    href: string
    children: string
    target: string
}

function Link({ children: linkText, href, target }: LinkProps) {
    return (
        <LinkStyled href={href} target={target}>
            {linkText}
        </LinkStyled>
    )
}

export default Link
