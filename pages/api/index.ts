import { NextApiRequest, NextApiResponse } from 'next';
import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';
import { startServerAndCreateNextHandler } from "@as-integrations/next";

const server = new ApolloServer({
  typeDefs: gql`
    type Query {
      hello: String
    }
  `,
  resolvers: {
    Query: {
      hello: () => 'Hello world!',
    },
  },
});

export default startServerAndCreateNextHandler(server, {
  context: async (request: NextApiRequest, response: NextApiResponse) => ({ request, response })
});
