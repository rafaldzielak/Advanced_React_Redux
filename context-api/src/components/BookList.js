import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";

const BookList = () => {
  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const theme = isLightTheme ? light : dark;

  return (
    <div className="book-list" style={{ background: theme.bg, color: theme.syntax }}>
      <ul>
        <li style={{ background: theme.ui }}>The way of kings</li>
        <li style={{ background: theme.ui }}>The name of the wind</li>
        <li style={{ background: theme.ui }}>The final empire</li>
      </ul>
    </div>
  );
};

export default BookList;
