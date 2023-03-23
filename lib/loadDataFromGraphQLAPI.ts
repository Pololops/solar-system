import { gql } from '@apollo/client';
import client from './../apolloClient';

type QueryType = 'ids' | 'objects' | 'object';
type Data<K> = { data: { [key in QueryType]: ReturnData<K> } };
type ReturnData<K> = K extends 'ids' | 'objects' ? SolarSystemObjectGraphQLAPI[] : K extends 'object' ? SolarSystemObjectGraphQLAPI : never;


type Query = { [key in QueryType]: string };

type ObjectType = 'Planet' | 'DwarfPlanet' | 'Moon' | 'Asteroid' | 'Comet' | 'Star'
type QueryObjectsOptions = {
  bodyType?: ObjectType | ObjectType[]
  order?: 'ASC' | 'DESC',
};
type QueryObjectOptions = {
  objectId: string,
}
type QueryOptions<T extends QueryType> = (T extends 'objects' ? QueryObjectsOptions : QueryObjectOptions);

const queries: Query = {
  ids: `
    query SolarSystemIds {
      objects {
        id
      }
    }
  `,
  objects: `
    query SolarSystemObjects($order: Order, $bodyType: [ObjectType]) {
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

export default async (queryType: QueryType, options?: QueryOptions<QueryType>): Promise<ReturnData<QueryType> | string> => {
  try {
    const query = queries[queryType];

    const { data } = await client.query({
      query: gql(query),
      variables: options,
    }) as Data<QueryType>;

    return queryType === 'ids' ? data.objects : data[queryType];
  }
  catch (error) {
    return 'Internal error';
  }
};
