import { RESTDataSource } from '@apollo/datasource-rest';
import type { KeyValueCache } from '@apollo/utils.keyvaluecache';

const TTL = 7 * 24 * 60 * 60; // 7 jours

class SolarAPI extends RESTDataSource {
  override baseURL = 'https://api.le-systeme-solaire.net';
  pathURL = '/rest/bodies';

  constructor(options: { cache: KeyValueCache }) {
    super(options);
  }

  override cacheOptionsFor() {
    return {
      ttl: TTL,
    }
  }

  async findAll(args?: { [key: string]: string[] | string }): Promise<SolarSystemObjectGraphQLAPI[]> {
    const queryString = !!args ? this.formatFilterQuery(args) : '';
    console.log(queryString)
    const { bodies } = await this.get(`${this.pathURL}${queryString}`) as { bodies: SolarSystemObjectGraphQLAPI[] };

    return bodies.map((object) => this.formatObject(object));
  }

  async findOneById(id: string): Promise<SolarSystemObjectGraphQLAPI> {
    const object = await this.get(`${this.pathURL}/${encodeURIComponent(id)}`);
    return this.formatObject(object);
  }

  formatFilterQuery(args: { [key: string]: string | string[] }) {
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

  formatObject(object: SolarSystemObjectGraphQLAPI) {
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
