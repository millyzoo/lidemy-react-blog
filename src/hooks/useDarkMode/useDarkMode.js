import { useEffect, useState } from "react";
import { setLocalMode, getLocalMode } from "../../utils";

export const useDarkMode = () => {
  const [theme, setTheme] = useState("light");
  const [mountedComponent, setMountedComponent] = useState(false);

  const setMode = (mode) => {
    setLocalMode(mode);
    setTheme(mode);
  };

  const themeToggler = () => {
    theme === "light" ? setMode("dark") : setMode("light");
  };

  useEffect(() => {
    getLocalMode() && setTheme(getLocalMode()); // 如果 localStorage 有 theme 就 setTheme
    setMountedComponent(true);
  }, []);

  return [theme, themeToggler, mountedComponent]; // useDarkMode 最後回傳 theme, themeToggler
};

export default useDarkMode;
