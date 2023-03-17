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

  async getAll(type: string): Promise<BodyType[]> {
    const params = type ? { filter: `bodyType,cs,${type}` } : {};
    const data = await this.get('/rest/bodies', {
      params,
    }) as { bodies: BodyType[] };

    return data.bodies.map((body) => this.formatBody(body));
  }

  async getOne(id: string): Promise<BodyType> {
    const body = await this.get(`/rest/bodies/${encodeURIComponent(id)}`);

    return this.formatBody(body);
  }

  async findAllByName(names: string[]): Promise<BodyType[]> {
    const queryFilter = names.map((name) => {
      return `filter[]=name,cs,${encodeURIComponent(name)}`
    });
    const queriesString = queryFilter.join('&') + '&satisfy=any';

    const data = await this.get('/rest/bodies/?' + queriesString) as { bodies: BodyType[] };

    return data.bodies.map((body) => this.formatBody(body));
  }

  async findOneByName(name: string): Promise<BodyType> {
    const data = await this.get('/rest/bodies/', {
      params: {
        filter: `name,cs,${encodeURIComponent(name)}` }
    }) as { bodies: BodyType[] };

    return this.formatBody(data.bodies[0]);
  }

  formatBody(body: BodyType) {
    return {
      ...body,
      name: this.formatName(body.name)!,
    };
  }

  formatName(name: string) {
    return (name && name.includes(') ')) ? name.split(') ').at(-1) : name;
  }
}

export default SolarAPI;
