import { GraphQLSchema, GraphQLString, GraphQLObjectType } from "graphql";

const books = [
    { name: "Name of the Wind", genre: "Fantasy", id: "1" },
    { name: "The Final Empire", genre: "Fantasy", id: "2" },
    { name: "The Long Earth", genre: "Sci-Fi", id: "3" },
];

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: { type: BookType },
        args: { id: { type: GraphQLString } },
        resolve(parent, args) {},
    },
});

const schema = new GraphQLSchema({
    query: RootQuery,
});

export { schema as bookSchema };
