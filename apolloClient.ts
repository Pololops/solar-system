import { ApolloClient, InMemoryCache } from '@apollo/client';

const GRAPHQL_API_URL = `http://localhost:3000/api`;

const client = new ApolloClient({
  uri: GRAPHQL_API_URL,
  cache: new InMemoryCache(),
});

export default client;
