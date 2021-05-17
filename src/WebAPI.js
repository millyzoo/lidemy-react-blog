import { getAuthToken } from "./utils";

const BASE_URL = "https://student-json-api.lidemy.me";

export const getSingleArticle = (id) => {
  return fetch(`${BASE_URL}/posts/${id}?_expand=user`).then((res) =>
    res.json()
  );
};

export const getArticles = (pageNumber, limitNumber) => {
  return fetch(
    `${BASE_URL}/posts?_sort=createdAt&_order=desc&_expand=user&_page=${pageNumber}&_limit=${limitNumber}`
  );
};

export const getAuthorArticles = (userId) => {
  return fetch(
    `${BASE_URL}/posts?userId=${userId}&_sort=createdAt&_order=desc&_expand=user`
  ).then((res) => res.json());
};

export const login = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());
};

// 身份驗證
export const getMe = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const register = (username, password, nickname) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nickname,
      username,
      password,
    }),
  }).then((res) => res.json());
};

export const addArticle = (title, content) => {
  const token = getAuthToken();

  return fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title,
      body: content,
    }),
  }).then((res) => res.json());
};

export const updateArticle = (id, title, content) => {
  const token = getAuthToken();

  return fetch(`${BASE_URL}/posts/${id}`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title,
      body: content,
    }),
  }).then((res) => res.json());
};

export const deleteArticle = (id) => {
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};
