import React, { useState, useContext } from "react";
import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../constants/breakpoint";
import { Wrapper, Container } from "../../layout/mainLayout";
import { register, getMe } from "../../WebAPI";
import { setAuthToken } from "../../utils";
import { AuthContext } from "../../contexts";
import { useHistory } from "react-router-dom";
import {
  AiFillEye as VisibilityIcon,
  AiFillEyeInvisible as VisibilityOffIcon,
} from "react-icons/ai";

const RegisterForm = styled.form`
  position: relative;
  margin: 0 auto;
  width: 100%;
  border-radius: 3px;
  padding: 40px 40px 50px 40px;
  max-width: 400px;
  background-color: ${({ theme }) => theme.background.primary};
  box-shadow: ${({ theme }) => theme.boxShadow.primary};

  ${MEDIA_QUERY_SM} {
    margin-top: 20px;
    padding: 30px 30px 40px 30px;
  }
`;

const Title = styled.p`
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
  color: ${({ theme }) => theme.button.submit};
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const InputField = styled.input`
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  height: 45px;
  border: solid 1px transparent;
  border-radius: 3px;
  font-size: 16px;
  color: ${({ theme }) => theme.text.primary};
  background-color: ${({ theme }) => theme.background.body};
  transition: 0.3s;

  &:focus {
    border: solid 1px ${({ theme }) => theme.primary};
  }
`;

const ShowPasswordIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  cursor: pointer;

  svg {
    color: ${({ theme }) => theme.button.submit};
    width: 100%;
    height: auto;
  }
`;

const PasswordInputField = styled(InputField)`
  margin-bottom: 0;
  padding: 10px 40px 5px 10px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px 0;
  color: ${({ theme }) => theme.text.negative};
  background-color: ${({ theme }) => theme.button.submit};
  border: transparent;
  border-radius: 3px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

const RemindMessage = styled.p`
  margin: 0px 0 20px 0;
  color: ${({ theme }) => theme.text.remind};
  font-size: 15px;
`;

const ErrorText = styled.div`
  position: absolute;
  bottom: 12px;
  color: ${({ theme }) => theme.error};
`;

export default function RegisterPage() {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("Lidemy");
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!username || !nickname) {
      return setErrorMessage("資料尚未填寫齊全");
    }
    register(username, password, nickname).then((response) => {
      if (response.ok === 0 && response.code === 3) {
        // 錯誤處理
        return setErrorMessage("此帳號已有人使用");
      } else if (response.ok === 0) {
        return setErrorMessage(response.message);
      }
      setAuthToken(response.token); // 將得到的 data.token 放到 localStorage

      getMe().then((response) => {
        if (response.ok !== 1) {
          // 身份驗證失敗錯誤處理
          setAuthToken(null); // 因為驗證失敗（未登入），所以要清空 Token
          return setErrorMessage(response.toString());
        }
        setUser(response.data); // 身份驗證成功，將資料放入 user
      });
      history.push("/");
    });
  };

  const handleInputChange = (e) => {
    setErrorMessage("");
    if (e.target.name === "username") {
      setUsername(e.target.value);
    }
    if (e.target.name === "nickname") {
      setNickname(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handlePasswordShow = () => {
    setIsPasswordShow(!isPasswordShow);
  };

  return (
    <Wrapper>
      <Container>
        <RegisterForm onSubmit={handleSubmit}>
          <Title>註冊會員</Title>
          <InputField
            type="text"
            name="username"
            value={username}
            placeholder="帳號"
            onChange={handleInputChange}
          />
          <InputField
            type="text"
            name="nickname"
            value={nickname}
            placeholder="暱稱"
            onChange={handleInputChange}
          />
          <InputContainer>
            <PasswordInputField
              type={isPasswordShow ? "text" : "password"}
              name="password"
              value={"Lidemy"}
              placeholder="密碼"
              onChange={handleInputChange}
            />
            <ShowPasswordIcon onClick={handlePasswordShow}>
              {isPasswordShow ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </ShowPasswordIcon>
          </InputContainer>
          <RemindMessage>為了進行測試，密碼設定皆為默認值</RemindMessage>
          <SubmitButton>註冊</SubmitButton>
          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        </RegisterForm>
      </Container>
    </Wrapper>
  );
}
