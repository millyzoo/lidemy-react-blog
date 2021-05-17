import React, { useContext } from "react";
import styled from "styled-components";
import moon from "../../images/moon.svg";
import sun from "../../images/sun.svg";
import toggleArrow from "../../images/mode-toggle.svg";
import { ThemeToggleContext } from "../../contexts";
import PropTypes from "prop-types";

const DarkModeButton = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-top: 45px;
  padding: 10px 17px;
  width: fit-content;
  list-style: none;
  color: #eff2f5;
  border: 1px solid rgba(239, 242, 245, 0.5);
  border-radius: 50px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    border: 1px solid #eff2f5;
  }
`;

const Light = styled.img`
  margin-right: 15px;
  width: 23px;
  transition: 0.3s;
  opacity: 0.5;
  opacity: ${(props) => props.theme === "light" && `1`};
`;

const ToggleArrow = styled.img`
  margin-right: 17px;
  width: 15px;
  transition: all 0.3s cubic-bezier(0.995, -0.265, 0.855, 0.505);
  transform: ${(props) => props.theme === "dark" && `rotate(180deg)`};
`;

const Dark = styled.img`
  width: 20px;
  transition: 0.3s;
  opacity: 0.5;
  opacity: ${(props) => props.theme === "dark" && "1"};
`;

// theme 改變時，Mode Button 的變化
const Toggler = () => {
  const { theme, themeToggler } = useContext(ThemeToggleContext);

  return (
    <DarkModeButton onClick={themeToggler}>
      <Light src={sun} theme={theme} />
      <ToggleArrow src={toggleArrow} theme={theme} />
      <Dark src={moon} theme={theme} />
    </DarkModeButton>
  );
};

Toggler.propTypes = {
  toggleTheme: PropTypes.func,
};

export default Toggler;
