import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [isLightTheme, setIsLightTheme] = useState(true);
  const [light] = useState({ syntax: "#555", ui: "#ddd", bg: "#eee" });
  const [dark] = useState({ syntax: "#ddd", ui: "#333", bg: "#555" });

  return <ThemeContext.Provider value={{ isLightTheme, setIsLightTheme, light, dark }}>{children}</ThemeContext.Provider>;
};

export default ThemeContextProvider;
