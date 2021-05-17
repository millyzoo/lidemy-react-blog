import React, { useState, useContext } from "react";
import EditArticle from "../../components/EditArticle";
import { Wrapper, Container } from "../../layout/mainLayout";
import { addArticle } from "../../WebAPI";
import { getAuthToken } from "../../utils";
import { AuthContext } from "../../contexts";
import { useHistory } from "react-router-dom";

export default function AddPostPage() {
  const { user } = useContext(AuthContext);
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();

  if (!getAuthToken()) {
    if (!user) {
      // 沒有登入就跳轉到登入頁面
      history.push("/login");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!articleTitle || !articleContent) {
      return setErrorMessage("文章標題或內容尚未填寫齊全");
    }
    addArticle(articleTitle, articleContent).then((data) => {
      if (!data.ok) {
        history.push("/articles");
      } else {
        // 錯誤處理
        return setErrorMessage(data.message);
      }
    });
  };

  return (
    <Wrapper>
      <Container>
        <EditArticle
          pageTitle={"新增文章"}
          articleTitle={articleTitle}
          setArticleTitle={setArticleTitle}
          articleContent={articleContent}
          setArticleContent={setArticleContent}
          handleSubmit={handleSubmit}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      </Container>
    </Wrapper>
  );
}
