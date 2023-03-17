import { Context } from '@/pages/api';

export default {
  __resolveType(body: BodyType) {
    const { moons, aroundPlanet } = body;
    if (moons) {
      return 'Planet';
    }
    if (aroundPlanet) {
      return 'Moon';
    }
    return null;
  },
};