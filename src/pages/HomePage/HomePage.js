import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  MEDIA_QUERY_SM,
  MEDIA_QUERY_MD,
  MEDIA_QUERY_LG,
} from "../../constants/breakpoint";
import { Wrapper, Container } from "../../layout/mainLayout";
import { ReactComponent as BannerImage } from "../../images/banner.svg";
import Article from "../../components/Article/Article";
import Loading from "../../components/Loading";
import { getArticles } from "../../WebAPI";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight as ArrowRight } from "react-icons/ai";

const BannerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 170px auto;
  padding: 0 30px;
  width: 100%;
  max-width: 1200px;

  #border path {
    fill: ${({ theme }) => theme.text.primary};
  }

  & > svg {
    width: 64%;
    max-width: 700px;

    ${MEDIA_QUERY_MD} {
      width: 100%;
    }
  }

  ${MEDIA_QUERY_LG} {
    margin: 100px auto;
    padding: 0 80px;
    max-width: 1100px;
  }

  ${MEDIA_QUERY_MD} {
    justify-content: center;
    flex-direction: column-reverse;
  }

  ${MEDIA_QUERY_SM} {
    margin: 60px auto 50px auto;
    padding: 0 30px;
  }
`;

const Description = styled.div`
  width: 27%;
  line-height: 1.5;

  h1 {
    margin-bottom: 15px;
    font-size: 34px;
    color: ${({ theme }) => theme.text.primary};
  }

  p {
    color: ${({ theme }) => theme.text.second};
  }

  ${MEDIA_QUERY_MD} {
    margin-top: 60px;
    width: 100%;
  }
`;

const DescriptionButton = styled(Link)`
  position: relative;
  display: inline-flex;
  display: -webkit-inline-flex;
  align-items: center;
  -webkit-align-items: center;
  margin-top: 30px;
  padding: 8px 40px 8px 20px;
  border-radius: 20px;
  background-color: #0051c3;
  text-decoration: none;
  color: #fff;
  box-shadow: 0 0 20px rgba(0, 81, 195, 0.4);
  z-index: 0;

  svg {
    position: absolute;
    right: 18px;
    height: 100%;
    font-size: 15px;
    transition: 0.3s;
  }

  &:hover {
    svg {
      right: 15px;
    }
  }
`;

const ArticlesHead = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  & > li {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: calc(50% - 15px);
  }

  & > li:last-child {
    width: 100%;
  }

  @media screen and (min-width: 769px) {
    & > li:nth-child(2) {
      margin-top: 0;
    }
  }
  
  ${MEDIA_QUERY_MD} {
    & > li {
      width: 100%;
    }
  }
`;

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const pageNumber = 1;
  const articlesLimit = 3;

  useEffect(() => {
    setIsLoading(true);

    getArticles(pageNumber, articlesLimit)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <Wrapper>
      {isLoading && <Loading />}
      <BannerContainer>
        <Description>
          <h1>Lorem Ipsum</h1>
          <p>There are many variations of passages of Lorem Ipsum available.</p>
          <DescriptionButton to="/articles">
            <span>全部文章</span>
            <ArrowRight />
          </DescriptionButton>
        </Description>
        <BannerImage />
      </BannerContainer>
      <Container>
        <ArticlesHead>
          {articles.map((article) => (
            <Article key={article.id} article={article} />
          ))}
        </ArticlesHead>
      </Container>
    </Wrapper>
  );
}
