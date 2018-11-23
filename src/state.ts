import ApolloBoostClient from "apollo-boost";

const client = new ApolloBoostClient({
  uri: "https://my.api/v1",
  clientState: {
    defaults: {},
    resolvers: {},
  },
});
