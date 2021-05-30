import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { screen, render } from "@testing-library/react";

test("shows a comment box", () => {
  render(<App />);
  screen.getByText(/comment box/i);
});
