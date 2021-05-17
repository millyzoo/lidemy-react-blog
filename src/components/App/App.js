import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import useDarkMode from "../useDarkMode";
import GlobalStyle from "../../layout/globalStyle";
import themes from "../Themes";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import HomePage from "../../pages/HomePage";
import ArticlesPage from "../../pages/ArticlesPage";
import SingleArticlePage from "../../pages/SingleArticlePage";
import AuthorPage from "../../pages/AuthorPage";
import AddArticlePage from "../../pages/AddArticlePage";
import EditArticlePage from "../../pages/EditArticlePage";
import SearchPage from "../../pages/SearchPage";
import Header from "../Header";
import Footer from "../Footer";
import { AuthContext, SearchContext, ThemeToggleContext } from "../../contexts";
import { getMe } from "../../WebAPI";
import { getAuthToken, setAuthToken } from "../../utils";

function App() {
  const [user, setUser] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === "light" ? themes.light : themes.dark;

  useEffect(() => {
    if (!getAuthToken()) return; // 有 token 才執行後面 API 的動作

    getMe().then((response) => {
      if (response.ok !== 1) setAuthToken(null); // 因為還是未登入，所以要清空
      setUser(response.data); // 將資料放入 user
    });
  }, []);

  if (!mountedComponent) return <div />;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <ThemeToggleContext.Provider value={{ theme, themeToggler }}>
        <SearchContext.Provider value={{ searchData, setSearchData }}>
          <ThemeProvider theme={themeMode}>
            <GlobalStyle />
            <Router>
              <Header />
              <Switch>
                <Route exact path="/">
                  {/* 沒有寫 exact 就會每個頁面都被匹配到 */}
                  <HomePage />
                </Route>
                <Route path="/login">
                  <LoginPage />
                </Route>
                <Route path="/register">
                  <RegisterPage />
                </Route>
                <Route exact path="/articles">
                  <ArticlesPage />
                </Route>
                <Route path="/articles/:id">
                  <SingleArticlePage />
                </Route>
                <Route path="/author/:userId">
                  <AuthorPage />
                </Route>
                <Route path="/add-article">
                  <AddArticlePage />
                </Route>
                <Route path="/edit/:id">
                  <EditArticlePage />
                </Route>
                <Route path="/search/:keyword">
                  <SearchPage />
                </Route>
              </Switch>
              <Footer />
            </Router>
          </ThemeProvider>
        </SearchContext.Provider>
      </ThemeToggleContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
