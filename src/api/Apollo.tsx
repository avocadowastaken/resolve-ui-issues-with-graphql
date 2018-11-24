import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { SchemaLink } from "apollo-link-schema";
import gql from "graphql-tag";
import { makeExecutableSchema } from "graphql-tools";
import * as React from "react";
import { ApolloProvider, Query } from "react-apollo";
import { Text } from "react-native";

const typeDefs = gql`
  type Query {
    hello: String!
  }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      hello: () => "There!",
    },
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({ schema }),
});

const Hello = gql`
  query {
    hello
  }
`;

export function ApolloApp() {
  return (
    <ApolloProvider client={client}>
      <Query query={Hello}>
        {({ error, loading, data }) => (
          <Text>{JSON.stringify({ error, loading, data }, null, 2)}</Text>
        )}
      </Query>
    </ApolloProvider>
  );
}
