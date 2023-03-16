import { Context } from '@/pages/api';

export default {
  hello: () => 'Hello world!',

  bodies: async (_source: any, { type }: any, { dataSources }: Context) => {
    return dataSources.solarAPI.getAll(type);
  },

  body: async (_source: any, { id }: any, { dataSources }: Context) => {
    return dataSources.solarAPI.getOne(id);
  },
};
