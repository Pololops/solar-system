import { RESTDataSource } from '@apollo/datasource-rest';

const TTL = 7 * 24 * 60 * 60; // 1 minute

class SolarAPI extends RESTDataSource {
  override baseURL = 'https://api.le-systeme-solaire.net';

  // protected override requestDeduplicationPolicyFor() {
  //   return {
  //     policy: 'do-not-deduplicate',
  //   } as const;
  // }

  // override cacheOptionsFor() {
  //   return {
  //     ttl: TTL,
  //   }
  // }

  async getAll(type: any): Promise<BodyType[]> {
    const params = type ? { filter: `bodyType,cs,${type}` } : {};
    const data = await this.get('/rest/bodies', {
      params,
    });
    return data.bodies;
  }

  async getOne(id: string): Promise<BodyType> {
    return this.get(`/rest/bodies/${encodeURIComponent(id)}`);
  }

  // async findAll(arg: any): Promise<BodyType[]> {
  //   const data = await this.get('/rest/bodies', {
  //     params: { filter: `name,cs,${arg.moons[0].moon}` },
  //   });

  //   return data
  // }

}

export default SolarAPI;
