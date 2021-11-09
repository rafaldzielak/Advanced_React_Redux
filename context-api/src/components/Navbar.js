import React from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";

const Navbar = () => {
  return (
    <AuthContext.Consumer>
      {(authContext) => (
        <ThemeContext.Consumer>
          {(themeContext) => {
            const { setIsAuthenticated, isAuthenticated } = authContext;

            const theme = themeContext.isLightTheme ? themeContext.light : themeContext.dark;
            return (
              <nav style={{ background: theme.ui, color: theme.syntax }}>
                <h1>Context App</h1>
                <div>{isAuthenticated ? "Logged in" : "Logged out"}</div>
                <ul>
                  <li>Home</li>
                  <li>About</li>
                  <li>Contact</li>
                </ul>
              </nav>
            );
          }}
        </ThemeContext.Consumer>
      )}
    </AuthContext.Consumer>
  );
};

export default Navbar;
