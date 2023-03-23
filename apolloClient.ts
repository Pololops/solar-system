import { ApolloClient, InMemoryCache } from '@apollo/client';

const GRAPHQL_API_URL = process.env.GRAPHQL_API_ENDPOINT!;

const client = new ApolloClient({
  uri: GRAPHQL_API_URL,
  cache: new InMemoryCache(),
});

export default client;
