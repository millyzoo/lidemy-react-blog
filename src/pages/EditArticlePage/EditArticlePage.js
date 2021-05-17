import React, { useState, useContext, useEffect } from "react";
import Loading from "../../components/Loading";
import EditArticle from "../../components/EditArticle";
import { Wrapper, Container } from "../../layout/mainLayout";
import { updateArticle, getSingleArticle } from "../../WebAPI";
import { getAuthToken } from "../../utils";
import { AuthContext } from "../../contexts";
import { useHistory, useParams } from "react-router-dom";

export default function AddPostPage() {
  const { user } = useContext(AuthContext);
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  let { id } = useParams();

  if (!getAuthToken()) {
    if (!user) {
      // 沒有登入就跳轉到登入頁面
      history.push("/login");
    }
  }

  useEffect(() => {
    setIsLoading(true);

    getSingleArticle(id).then((data) => {
      setArticleTitle(data.title);
      setArticleContent(data.body);
      setIsLoading(false);
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!articleTitle || !articleContent) {
      return setErrorMessage("文章標題或內容尚未填寫齊全");
    }
    updateArticle(id, articleTitle, articleContent).then((data) => {
      if (!data.id) return;
      console.log(data.id);
      history.push(`/articles/${id}`);
    });
  };

  return (
    <Wrapper>
      <Container>
        {isLoading && <Loading />}
        <EditArticle
          pageTitle={"編輯文章"}
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
