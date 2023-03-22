// API website : https://api.le-systeme-solaire.net

import { gql } from '@apollo/client';
import client from './../apolloClient';

type QueryType = 'ids' | 'objects' | 'object';
type ReturnData<K> = K extends 'ids' | 'objects' ? SolarSystemObject[] : K extends 'object' ? SolarSystemObject : never;
type Data<K> = {
  data: {
    [key in QueryType]: ReturnData<K>
  }
}


type Query = { [key in QueryType]: string };

type QueryObjectsOptions = {
  bodyType?: 'Planet' | 'DwarfPlanet' | 'Moon' | 'Asteroid' | 'Comet' | 'Star'
  order?: 'ASC' | 'DESC',
};
type QueryObjectOptions = {
  objectId: string,
}
type QueryOptions<T extends QueryType> = (T extends 'objects' ? QueryObjectsOptions | undefined : QueryObjectOptions);

const queries: Query = {
  ids: `
    query SolarSystemIds() {
      objects() {
        id
      }
    }
  `,
  objects: `
    query SolarSystemObjects($order: Order, $bodyType: ObjectType) {
      objects(order: $order, bodyType: $bodyType) {
        id
        name
        englishName
      }
    }
  `,

  object: `
    query SolarSystemObject($objectId: String!) {
      object(id: $objectId) {
        id
        name
        isPlanet
        bodyType
        dimension
        density
        gravity
        discoveryDate
        discoveredBy
        englishName
        aroundPlanet {
          id
          name
        }
        moons {
          id
          name
        }
      }
    }
  `,
};

export default async (queryType: QueryType, options: QueryOptions<QueryType>) => {
  try {
    const query = queries[queryType];

    const { data } = await client.query({
      query: gql(query),
      variables: options,
    }) as Data<QueryType>;

    return data[queryType];
  }
  catch (error) {
    return 'Internal error';
  }
};
