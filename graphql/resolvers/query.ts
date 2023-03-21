import { Context } from '@/pages/api';

export default {
  objects: async (_: any, { bodyType }: any, { dataSources }: Context) => {
    return dataSources.solarAPI.findAll({ bodyType });
  },

  object: async (_: any, { id }: any, { dataSources }: Context) => {
    return dataSources.solarAPI.findOneById(id);
  },
};
