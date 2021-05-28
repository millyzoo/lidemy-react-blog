import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { Wrapper, Container, EmptyDataTitle } from "../../layout/mainLayout";
import Loading from "../../components/Loading";
import { getSingleArticle, deleteArticle } from "../../WebAPI";
import { AuthContext } from "../../contexts";
import { useHistory, Link, useParams } from "react-router-dom";
import {
  AiOutlineEdit as EditIcon,
  AiOutlineDelete as DeleteIcon,
  AiOutlineCalendar as CalendarIcon,
  AiOutlineUser as PersonIcon,
} from "react-icons/ai";

const ArticleModify = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
  padding: 0 25px;
  color: #505050;

  svg {
    margin-right: 3px;
    font-size: 16px;
  }
`;

const ArticleEdit = styled(Link)`
  display: flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 3px;
  text-decoration: none;
  font-size: 15px;
  color: ${({ theme }) => theme.button.modify};
  border: 1px solid ${({ theme }) => theme.button.modify};
  transition: 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.button.modify};
    color: ${({ theme }) => theme.background.body};
  }
`;

const ArticleDelete = styled.div`
  display: flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 3px;
  margin-left: 15px;
  cursor: pointer;
  color: ${({ theme }) => theme.button.modify};
  border: 1px solid ${({ theme }) => theme.button.modify};
  transition: 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.button.modify};
    color: ${({ theme }) => theme.background.body};
  }
`;

const ArticleContainer = styled.div`
  padding: 25px;
  width: 100%;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.boxShadow.second};
  background-color: ${({ theme }) => theme.background.opacity};
`;

const ArticleTitle = styled.div`
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: 500;
  color: ${({ theme }) => theme.text.primary};
`;

const ArticleInfo = styled.div`
  display: flex;
  margin-bottom: 30px;

  svg {
    margin-right: 3px;
    color: ${({ theme }) => theme.text.second};
  }
`;

const ArticleBody = styled.p`
  color: ${({ theme }) => theme.text.primary};
  white-space: pre-wrap;
  line-height: 1.5;
  font-size: 17px;
  word-break: break-word;
`;

const ArticleDate = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text.second};
  font-size: 17px;
`;

const ArticleAuthor = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
`;

const Author = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.text.second};
  font-size: 17px;
  transition: 0.3s;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

export default function SingleArticlePage() {
  const [article, setArticle] = useState([]);
  const [articleAuthor, setArticleAuthor] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const history = useHistory();
  const isEmptyArticle = Object.keys(article).length === 0;

  async function getArticle(id) {
    try {
      const article = await getSingleArticle(id);
      setArticle(article);
      setArticleAuthor(article.user.username);
      setIsLoading(false);
    } catch (error) {
      console.log("錯誤：" + error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getArticle(id);
  }, [id]);

  const handleArticleDelete = () => {
    deleteArticle(id).then(() => {
      history.push("/articles");
    });
  };

  return (
    <Wrapper>
      <Container>
        {isLoading && <Loading />}
        {user && articleAuthor === user.username && (
          <ArticleModify>
            <ArticleEdit to={`/edit/${article.id}`}>
              <EditIcon />
              編輯
            </ArticleEdit>
            <ArticleDelete onClick={handleArticleDelete}>
              <DeleteIcon />
              刪除
            </ArticleDelete>
          </ArticleModify>
        )}
        {isEmptyArticle ? (
          <EmptyDataTitle>找不到此篇文章。</EmptyDataTitle>
        ) : (
          <ArticleContainer>
            <ArticleTitle>{article.title}</ArticleTitle>
            <ArticleInfo>
              <ArticleDate>
                <CalendarIcon />
                {new Date(article.createdAt).toLocaleDateString()}
              </ArticleDate>
              {article.user && (
                <ArticleAuthor>
                  <PersonIcon />
                  <Author to={`/author/${article.user.id}`}>
                    {article.user.nickname}
                  </Author>
                </ArticleAuthor>
              )}
            </ArticleInfo>
            <ArticleBody>{article.body}</ArticleBody>
          </ArticleContainer>
        )}
      </Container>
    </Wrapper>
  );
}
