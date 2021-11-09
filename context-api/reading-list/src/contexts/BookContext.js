import React, { createContext, useState } from "react";
import { v4 as uuid } from "uuid";

export const BookContext = createContext();

const BookContextProvider = ({ children }) => {
  const [books, setBooks] = useState([
    { title: "name of the wind", author: "patrick rothfuss", id: 1 },
    { title: "the final empire", author: "brandon sanderson", id: 2 },
  ]);
  const addBook = (title, author) => {
    setBooks((prev) => [...prev, { title, author, id: uuid() }]);
  };
  const removeBook = (id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };
  return <BookContext.Provider value={{ books, addBook, removeBook }}>{children}</BookContext.Provider>;
};

export default BookContextProvider;
