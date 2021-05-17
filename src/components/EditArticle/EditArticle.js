import React from "react";
import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../constants/breakpoint";
import PropTypes from "prop-types";

const AddArticleForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.p`
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
  color: ${({ theme }) => theme.text.primary};

  ${MEDIA_QUERY_SM} {
    margin-bottom: 15px;
    font-size: 20px;
  }
`;

const TitleInput = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  width: 100%;
  border: 1px solid transparent;
  border-radius: 3px;
  color: ${({ theme }) => theme.text.primary};
  background-color: ${({ theme }) => theme.background.primary};
  box-shadow: ${({ theme }) => theme.boxShadow.primary};
  transition: 0.3s;

  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContentTextarea = styled.textarea`
  margin-bottom: 20px;
  padding: 10px;
  width: 100%;
  height: 500px;
  border: 1px solid transparent;
  border-radius: 3px;
  color: ${({ theme }) => theme.text.primary};
  background-color: ${({ theme }) => theme.background.primary};
  box-shadow: ${({ theme }) => theme.boxShadow.primary};
  transition: 0.3s;

  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }

  ${MEDIA_QUERY_SM} {
    height: 400px;
  }
`;

const SubmitAndRemind = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const SubmitButton = styled.button`
  padding: 10px 40px;
  background-color: ${({ theme }) => theme.button.submit};
  color: ${({ theme }) => theme.text.negative};
  border: transparent;
  border-radius: 3px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

const ErrorText = styled.div`
  position: absolute;
  left: 0;
  width: fit-content;
  color: ${({ theme }) => theme.error};

  ${MEDIA_QUERY_SM} {
    bottom: -35px;
  }
`;

export default function EditArticle({
  pageTitle,
  articleTitle,
  setArticleTitle,
  articleContent,
  setArticleContent,
  handleSubmit,
  errorMessage,
  setErrorMessage,
}) {
  const handleInputChange = (e) => {
    setErrorMessage("");
    if (e.target.name === "title") {
      setArticleTitle(e.target.value);
    }
    if (e.target.name === "content") {
      setArticleContent(e.target.value);
    }
  };

  return (
    <AddArticleForm onSubmit={handleSubmit}>
      <Title>{pageTitle}</Title>
      <TitleInput
        type="text"
        name="title"
        placeholder="請輸入文章標題"
        value={articleTitle}
        onChange={handleInputChange}
      />
      <ContentTextarea
        type="text"
        name="content"
        placeholder="請輸入文章內容"
        value={articleContent}
        onChange={handleInputChange}
      />
      <SubmitAndRemind>
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        <SubmitButton>送出文章</SubmitButton>
      </SubmitAndRemind>
    </AddArticleForm>
  );
}

EditArticle.propTypes = {
  pageTitle: PropTypes.string,
  articleTitle: PropTypes.string,
  setArticleTitle: PropTypes.func,
  articleContent: PropTypes.string,
  setArticleContent: PropTypes.func,
  handleSubmit: PropTypes.func,
  errorMessage: PropTypes.string,
  setErrorMessage: PropTypes.func,
};
