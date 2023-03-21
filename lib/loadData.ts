// API website : https://api.le-systeme-solaire.net

const allBodiesUrl = `https://api.le-systeme-solaire.net/rest/bodies/`;
const oneBodyUrl = (id: string) => `https://api.le-systeme-solaire.net/rest/bodies/${id}`;

const parseParams = (params?: LoadObjectParams): string => {
  if (!params) return '';

  const queries = SolarSystemObject.entries(params).map(([key, value]) => {
    const stringifyValue = Array.isArray(value) ? value.join(',') : value
    return `${key}=${stringifyValue}`;
  });

  return '?' + queries.join('&');
};

export const loadBodies = async (params?: LoadObjectParams): Promise<SolarSystemObject[] | string> => {
  try {
    const url = `${allBodiesUrl}${parseParams(params)}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from API, received status ${response.status}`)
    }

    const data = await response.json() as { bodies: SolarSystemObject[] } | undefined;
    if (!data || !('bodies' in data)) {
      throw new Error(`Invalid data structures received from API`)
    }

    return data.bodies;
  } catch (error) {
    return error instanceof Error ? error.message : 'Internal error';
  }
}

export const loadOneBody = async (id: string): Promise<SolarSystemObject | string> => {
  try {
    const response = await fetch(oneBodyUrl(id));
    if (!response.ok) {
      throw new Error(`Failed to fetch data from API, received status ${response.status}`)
    }

    return await response.json();
  } catch (error) {
    return error instanceof Error ? error.message : 'Internal error';
  }
}
