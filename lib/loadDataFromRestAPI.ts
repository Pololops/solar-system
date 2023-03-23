const allBodiesUrl = process.env.REST_API_ENDPOINT!;

const parseParams = (params?: LoadObjectParams): string => {
  if (!params) return '';

  const queries = Object.entries(params).map(([key, value]) => {
    const stringifyValue = Array.isArray(value) ? value.join(',') : value
    return `${key}=${stringifyValue}`;
  });

  return '?' + queries.join('&');
};

export const loadBodies = async (params?: LoadObjectParams): Promise<SolarSystemObjectRestApi[] | string> => {
  try {
    const url = params ? `${allBodiesUrl}/${parseParams(params)}` : allBodiesUrl;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from API, received status ${response.status}`)
    }

    const data = await response.json() as { bodies: SolarSystemObjectRestApi[] } | undefined;
    if (!data || !('bodies' in data)) {
      throw new Error(`Invalid data structures received from API`)
    }

    return data.bodies;
  } catch (error) {
    return error instanceof Error ? error.message : 'Internal error';
  }
}

export const loadOneBody = async (id: string): Promise<SolarSystemObjectRestApi | string> => {
  try {
    const url = `${allBodiesUrl}/${id}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from API, received status ${response.status}`)
    }

    return await response.json();
  } catch (error) {
    return error instanceof Error ? error.message : 'Internal error';
  }
}
