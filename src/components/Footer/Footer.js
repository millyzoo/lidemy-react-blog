import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../constants/breakpoint";
import { FiGithub as GithubIcon, FiMail as MailIcon } from "react-icons/fi";

const FooterContainer = styled.footer`
  margin: 0 auto;
  padding: 30px 50px;
  color: ${({ theme }) => theme.text.second};

  ${MEDIA_QUERY_SM} {
    margin: 30px auto 0 auto;
    padding: 20px 30px;
  }
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & + & {
    margin-top: 5px;
  }
`

const IconLink = styled.a`
  display: flex;
  margin-left: 15px;
  text-decoration: none;
  color: ${({ theme }) => theme.text.second};
  transition: 0.3s;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Source = styled.a`
  position: relative;
  display: flex;
  text-decoration: none;
  font-size: 12px;
  color: ${({ theme }) => theme.text.third};
  border-radius: 2px;
  transition: 0.3s;

  & + & {
    margin-left: 7px;
  }

  &:hover {
    color: ${({ theme }) => theme.text.primary};
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <p>© Mily Hsieh</p>
        <IconLink href="https://github.com/milyzoo" target="_blank">
          <GithubIcon />
        </IconLink>
        <IconLink href="mailto:hsieh.mily@gmail.com">
          <MailIcon />
        </IconLink>
      </FooterContent>
      <FooterContent>
        <Source href="https://icons8.com/illustrations" target="_blank">Illustration Source.</Source>
        <Source href="https://github.com/milyzoo/lidemy-react-blog" target="_blank">Source Code.</Source>
      </FooterContent>
    </FooterContainer>
  );
}
