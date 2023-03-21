import { RESTDataSource } from '@apollo/datasource-rest';

const TTL = 7 * 24 * 60 * 60; // 1 minute

class SolarAPI extends RESTDataSource {
  override baseURL = 'https://api.le-systeme-solaire.net';
  pathURL = '/rest/bodies';

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

  async findAll(args?: { [key: string]: string[] | string }): Promise<SolarSystemObject[]> {
    const query = args ? this.formatFilterQuery(args) : '';
    const data = await this.get(this.pathURL + query) as { bodies: SolarSystemObject[] };

    return data.bodies.map((object) => this.formatObject(object));
  }

  async findOneById(id: string): Promise<SolarSystemObject> {
    const object = await this.get(`${this.pathURL}/${id}`);
    return this.formatObject(object);
  }

  // async findAllByName(names: string[]): Promise<SolarSystemObject[]> {
  //   const queryFilter = names.map((name) => {
  //     return `filter[]=name,cs,${encodeURIComponent(name)}`
  //   });
  //   const queriesString = queryFilter.join('&') + '&satisfy=any';

  //   const data = await this.get(this.pathURL + '?' + queriesString) as { objects: SolarSystemObject[] };

  //   return data.objects.map((object) => this.formatObject(object));
  // }

  // async findOneByName(name: string): Promise<SolarSystemObject> {
  //   const data = await this.get('/rest/bodies/', {
  //     params: {
  //       filter: `name,cs,${encodeURIComponent(name)}`
  //     }
  //   }) as { objects: SolarSystemObject[] };

  //   return this.formatObject(data.objects[0]);
  // }

  formatFilterQuery(args: { [key: string]: string[] | string }) {
    const filter = Object.entries(args).map(([key, values]) => {
      if (typeof values === 'string') values = [values];

      return values.map((value) => {
        if (value === 'DwarfPlanet') value = 'Dwarf Planet';
        return `filter[]=${key},eq,${encodeURIComponent(value)}`
      }).join('&');
    });

    return `?${filter}&satisfy=any`;
  }

  formatObject(object: SolarSystemObject) {
    return {
      ...object,
      name: this.formatName(object.name)!,
    };
  }

  formatName(name: string) {
    return (name && name.includes(') ')) ? name.split(') ').at(-1) : name;
  }

  getIdFromRel(rel: string) {
    return rel.split('/').at(-1);
  }
}

export default SolarAPI;
