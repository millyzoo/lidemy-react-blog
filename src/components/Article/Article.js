import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../constants/breakpoint";
import { Link } from "react-router-dom";
import {
  AiOutlineCalendar as CalendarIcon,
  AiOutlineUser as PersonIcon,
} from "react-icons/ai";
import PropTypes from "prop-types";

const ArticleItem = styled.li`
  padding: 25px;
  width: 100%;
  list-style: none;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.boxShadow.second};
  transition: 0.3s;
  background-color: ${({ theme }) => theme.background.opacity};

  & + & {
    margin-top: 30px;
  }

  ${MEDIA_QUERY_SM} {
    padding: 20px;
  }
`;

const ArticleTitle = styled(Link)`
  width: fit-content;
  text-decoration: none;
  color: ${({ theme }) => theme.text.primary};
  font-size: 22px;
  font-weight: 500;

  ${MEDIA_QUERY_SM} {
    font-size: 20px;
  }
`;

const ArticleContent = styled.div`
  margin-top: 10px;
  color: ${({ theme }) => theme.text.second};

  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const ArticleFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;

  ${MEDIA_QUERY_SM} {
    flex-direction: column;
    margin-top: 20px;
  }
`;

const ReadMoreButton = styled(Link)`
  width: fit-content;
  text-decoration: none;
  color: ${({ theme }) => theme.primary};
  border-bottom: 1px dotted ${({ theme }) => theme.primary};
  transition: 0.3s;

  &:hover {
    opacity: 0.8;
  }
  ${MEDIA_QUERY_SM} {
    margin-bottom: 20px;
  }
`;

const ArticleInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  color: ${({ theme }) => theme.text.second};
`;

const ArticleDate = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
  }
`;

const ArticleAuthor = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;

  svg {
    margin-right: 3px;
    color: ${({ theme }) => theme.text.second};
  }
`;

const Author = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.text.second};
  transition: 0.3s;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

export default function Article({ article }) {
  return (
    <ArticleItem>
      <ArticleTitle to={`/articles/${article.id}`}>
        {article.title}
      </ArticleTitle>
      <ArticleContent>
        <p>{article.body}</p>
      </ArticleContent>
      <ArticleFooter>
        <ReadMoreButton to={`/articles/${article.id}`}>
          Read More
        </ReadMoreButton>
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
      </ArticleFooter>
    </ArticleItem>
  );
}

Article.propTypes = {
  article: PropTypes.object,
};
