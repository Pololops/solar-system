import { Context } from '@/pages/api';

export default {
  moons: async (parent: BodyType, _: any, { dataSources }: Context) => {
    const { moons } = parent;
    if (!moons) return [];

    const moonsNames = moons.map(({ moon }) => moon);
    return dataSources.solarAPI.findAllByName(moonsNames);
  }
};