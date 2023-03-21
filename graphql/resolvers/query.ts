import { Context } from '@/pages/api';

export default {
  objects: async (_: any, { bodyType }: any, { dataSources }: Context) => {
    const options = bodyType ? { bodyType } : undefined;
    return dataSources.solarAPI.findAll(options);
  },

  object: async (_: any, { id }: any, { dataSources }: Context) => {
    return dataSources.solarAPI.findOneById(id);
  },
};
