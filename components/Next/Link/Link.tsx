import NextLink, { LinkProps as NextLinkProps } from "next/link"

import React, { ReactElement } from "react"
import styled from "styled-components"

const LinkContainer = styled.div`
    width: fit-content;
    height: fit-content;

    cursor: pointer;
`
interface LinkProps extends NextLinkProps {
    innerContent: ReactElement
}

function Link({ innerContent, href, as, locale, prefetch }: LinkProps) {
    return (
        <NextLink
            href={href}
            as={as}
            locale={locale}
            prefetch={prefetch}
            passHref
        >
            <LinkContainer>{innerContent}</LinkContainer>
        </NextLink>
    )
}

export default Link
