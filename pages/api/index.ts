import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from "@as-integrations/next";

import typeDefs from '@/graphql/schema';
import resolvers from '@/graphql/resolvers';

import SolarAPI from '@/graphql/data/solarAPI';

export interface Context {
  dataSources: {
    solarAPI: SolarAPI;
  };
}

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(server, {
  context: async () => {
    const { cache } = server;
    return {
      dataSources: {
        solarAPI: new SolarAPI(),
      },
    }
  },
});
