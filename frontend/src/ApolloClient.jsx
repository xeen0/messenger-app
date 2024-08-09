import { ApolloClient, InMemoryCache, ApolloProvider, split } from '@apollo/client';
// import { WebSocketLink } from '@apollo/client/link/ws';
// import { HttpLink } from '@apollo/client/link/http';
import { HttpLink } from '@apollo/client';
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});


const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/graphql"
  }),
);

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export const ApolloClientProvider = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
