// API website : https://api.le-systeme-solaire.net

const allBodiesUrl = `https://api.le-systeme-solaire.net/rest/bodies/`;
const oneBodyUrl = (id: string) => `https://api.le-systeme-solaire.net/rest/bodies/${id}`;

const parseParams = (params: LoadBodiesParams): string => {
  let paramsString = '?';
  const useAmpersand = () => (paramsString !== '?') ? '&' : '';

  if (params.data) {
    paramsString += `${useAmpersand()}data=${params.data.join(',')}`;
  }

  if (params.exclude) {
    paramsString += `${useAmpersand()}exclude=${params.exclude.join(',')}`;
  }

  if (params.order) {
    paramsString += `${useAmpersand()}order=${params.order.join(',')}`;
  }

  if (params.page) {
    paramsString += `${useAmpersand()}page=${params.page.join(',')}`;
  }

  if (params.rowData) {
    paramsString += `${useAmpersand()}rowData=${params.rowData}`;
  }

  if (params.filter) {
    paramsString += `${useAmpersand()}filter[]=${params.filter.map((filter) => filter.join(',')).join(';')}`;
  }

  if (params.satisfy) {
    paramsString += `${useAmpersand()}satisfy=${params.satisfy}`;
  }

  return paramsString;
};

export const loadBodies = async (params?: LoadBodiesParams): Promise<BodyType[]> => {
  const queryString = params ? parseParams(params) : '';
  const url = `${allBodiesUrl}${queryString}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch data from API, received status ${response.status}`)
  }

  const data = await response.json() as { bodies: BodyType[] } | undefined;
  if (!data || !('bodies' in data)) {
    throw new Error(`Invalid data structures received from API`)
  }

  return data.bodies;
}

export const loadOneBody = async (id: string): Promise<BodyType | undefined>  => {
  const response = await fetch(oneBodyUrl(id));
  if (!response.ok) {
    throw new Error(`Failed to fetch data from API, received status ${response.status}`)
  }

  return await response.json();
}
