import { Context } from '@/pages/api';

export default {
  aroundPlanet: async (parent: SolarSystemObject, _: any, context: Context) => {
    if (!parent.aroundPlanet) return null;

    const id = parent.aroundPlanet.rel.split('/').at(-1)!;
    return context.dataSources.solarAPI.findOneById(id);
  },

  moons: async (parent: SolarSystemObject, _: any, context: Context) => {
    if (!parent.moons) return [];

    const ids = [] as string[]
    parent.moons.forEach(({ rel }) => {
      const id = rel.split('/').at(-1);
      if (!id) return;

      ids.push(id)
    });

    return context.dataSources.solarAPI.findAll({ id: ids });
  }
};