import { Context } from '@/pages/api';

export default {
  aroundPlanet: async (parent: BodyType, _: any, { dataSources }: Context) => {
    const { aroundPlanet } = parent;

    return dataSources.solarAPI.findOneByName(aroundPlanet!.planet);
  }
};