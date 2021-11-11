import React, { createContext, useEffect, useReducer } from "react";
import { bookReducer } from "../reducers/BookReducer";

export const BookContext = createContext();

const BookContextProvider = ({ children }) => {
  const [books, dispatch] = useReducer(bookReducer, [], () => {
    const localData = localStorage.getItem("books");
    if (localData) return JSON.parse(localData);
    return [];
  });
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  return <BookContext.Provider value={{ books, dispatch }}>{children}</BookContext.Provider>;
};

export default BookContextProvider;
