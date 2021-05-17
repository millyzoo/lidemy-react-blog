import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../constants/breakpoint";
import { Wrapper, Container } from "../../layout/mainLayout";
import { AiOutlineUser as PersonIcon } from "react-icons/ai";
import { getAuthorArticles } from "../../WebAPI";
import Article from "../../components/Article/Article";
import Loading from "../../components/Loading";
import { useParams } from "react-router-dom";

const Title = styled.p`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  font-size: 22px;
  color: ${({ theme }) => theme.text.primary};

  svg {
    font-size: 22px;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 20px;

    svg {
      font-size: 20px;
    }
  }
`;

const Author = styled.span`
  margin: 0 5px;
  font-size: 22px;
  border-bottom: 1px dotted ${({ theme }) => theme.text.second};
`;

export default function ArticlePage() {
  const [articles, setArticles] = useState([]);
  const [authorNickname, setAuthorNickname] = useState();
  const [isLoading, setIsLoading] = useState(false);
  let { userId } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getAuthorArticles(userId).then((data) => {
      setArticles(data);
      setAuthorNickname(data[0].user.nickname);
      setIsLoading(false);
    });
  }, [userId]);

  return (
    <Wrapper>
      <Container>
        {isLoading && <Loading />}
        <Title>
          <PersonIcon />
          <Author>{authorNickname}</Author>發表的所有文章
        </Title>
        {articles.map((article) => (
          <Article key={article.id} article={article} />
        ))}
      </Container>
    </Wrapper>
  );
}
