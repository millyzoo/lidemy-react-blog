import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../constants/breakpoint";
import { Wrapper, Container, EmptyDataTitle } from "../../layout/mainLayout";
import Article from "../../components/Article/Article";
import Loading from "../../components/Loading";
import { getArticles } from "../../WebAPI";
import { SearchContext } from "../../contexts";
import { useParams } from "react-router-dom";

const Title = styled.p`
  margin-bottom: 30px;
  font-size: 22px;
  color: ${({ theme }) => theme.text.primary};
  line-height: 1.8;

  span {
    font-size: 22px;
    font-weight: 500;
    line-height: 1.8;
    border-bottom: 1px dotted ${({ theme }) => theme.text.second};
  }

  ${MEDIA_QUERY_SM} {
    font-size: 20px;

    span {
      font-size: 20px;
    }
  }
`;

export default function SearchPage() {
  const [articles, setArticles] = useState([]);
  const { searchData, setSearchData } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(true);
  let { keyword } = useParams();

  useEffect(() => {
    setSearchData(keyword);
    getArticles()
      .then((res) => res.json())
      .then((data) => {
        const results = data.filter(
          ({ title, body }) =>
            title.toLowerCase().includes(keyword) ||
            body.toLowerCase().includes(keyword)
        );
        setArticles(results);
        setIsLoading(false);
      });
  }, [setSearchData, keyword]);

  return (
    <Wrapper>
      {isLoading && <Loading />}
      <Container>
        {articles.length === 0 ? (
          <EmptyDataTitle>目前無符合的資料。</EmptyDataTitle>
        ) : (
          <Title>
            以下是與「
            <span>{searchData}</span>
            」相符的文章
          </Title>
        )}

        {articles.map((article) => (
          <Article key={article.id} article={article} />
        ))}
      </Container>
    </Wrapper>
  );
}
