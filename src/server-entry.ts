import { ApolloServer } from "apollo-server";
import { schema } from "./schema";

const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
  },

  {
    title: "Jurassic Park",
    author: "Michael Crichton",
  },
];

const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({
  resolvers,
  typeDefs: schema,
});

server.listen(3000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
