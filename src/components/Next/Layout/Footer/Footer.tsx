import styled from "styled-components"

const FooterContainer = styled.footer`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: max-content;

    padding: 1.75rem 0;

    font-size: ${(p) => p.theme.sm};
    color: ${(p) => p.theme.gray3};
    font-weight: 700;
    letter-spacing: 0.05rem;

    border-top: 0.1rem solid ${(p) => p.theme.gray3};

    background-image: linear-gradient(to left, #f7c380 0%, #dbc785 100%);
    background-image: linear-gradient(to left, #09203f 0%, #537895 100%);
    background-image: linear-gradient(to left, #91b895 0%, #83a576 100%);
`

const FooterContent = styled.div`
    border-right: 0.1rem solid ${(p) => p.theme.white};
    padding: 0.25rem 1rem;
`

function Footer() {
    return (
        <FooterContainer>
            <FooterContent>© danpacho Blog.</FooterContent>
            <FooterContent>June.</FooterContent>
            <FooterContent style={{ borderRight: "none" }}>
                Make People Move.
            </FooterContent>
        </FooterContainer>
    )
}

export default Footer
