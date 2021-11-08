import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const ThemeToggle = () => {
  const { setIsLightTheme } = useContext(ThemeContext);
  return <button onClick={() => setIsLightTheme((prev) => !prev)}>Toggle the theme</button>;
};

export default ThemeToggle;
