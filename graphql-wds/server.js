import express from "express";
import { books, authors } from "./db.js";
import { graphqlHTTP } from "express-graphql";
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull } from "graphql";
const app = express();

const BookType = new GraphQLObjectType({
    name: "Book",
    description: "This represents a book written by an author",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
        author: { type: AuthorType, resolve: (book) => authors.find((author) => author.id === book.authorId) },
    }),
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    description: "This represents an author of a book",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        books: { type: new GraphQLList(BookType), resolve: (author) => books.filter((book) => book.authorId === author.id) },
    }),
});

const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: () => ({
        book: {
            type: BookType,
            description: "A Single Book",
            args: { id: { type: GraphQLInt } },
            resolve: (parent, args) => books.find((book) => book.id === args.id),
        },
        books: {
            type: new GraphQLList(BookType),
            description: "List of All Books",
            resolve: () => books,
        },
        author: {
            type: AuthorType,
            description: "Single Author",
            args: { id: { type: GraphQLInt } },
            resolve: (parent, args) => authors.find((author) => author.id === args.id),
        },
        authors: {
            type: new GraphQLList(AuthorType),
            description: "List of All Authors",
            resolve: () => authors,
        },
    }),
});

const RootMutationType = new GraphQLObjectType({
    name: "Mutation",
    description: "Root mutation",
    fields: () => ({
        addBook: {
            type: BookType,
            description: "Add a book",
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                authorId: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: (parent, args) => {
                const book = { id: books.length + 1, name: args.name, authorId: args.authorId };
                books.push(book);
                return book;
            },
        },
        addAuthor: {
            type: AuthorType,
            description: "Add an Author",
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (parent, args) => {
                const author = { id: authors.length + 1, name: args.name };
                authors.push(author);
                return author;
            },
        },
    }),
});

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
});

// Provides http://localhost:5000/graphql
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(5000, () => console.log("Server is running"));
