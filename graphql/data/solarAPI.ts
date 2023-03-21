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
    const query = !!args ? this.formatFilterQuery(args) : '';
    const { bodies } = await this.get(`${this.pathURL}${query}`) as { bodies: SolarSystemObject[] };

    return bodies.map((object) => this.formatObject(object));
  }

  async findOneById(id: string): Promise<SolarSystemObject> {
    const object = await this.get(`${this.pathURL}/${id}`);
    return this.formatObject(object);
  }

  formatFilterQuery(args: { [key: string]: string[] | string }) {
    const filter = Object.entries(args).map(([key, value]) => {
      if (key === 'order') return `${key}=sideralOrbit,${value}`;

      if (typeof value === 'string') value = [value];
      return value.map((nestedValue) => {
        if (nestedValue === 'DwarfPlanet') nestedValue = 'Dwarf Planet';
        return `filter[]=${key},eq,${encodeURIComponent(nestedValue)}`
      }).join('&');
    });

    return `?${filter.join('&')}&satisfy=any`;
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
