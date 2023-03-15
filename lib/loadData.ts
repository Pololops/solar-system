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

export const loadBodies = async (params?: LoadBodiesParams) => {
  const queryString = params ? parseParams(params) : '';
  const url = `${allBodiesUrl}${queryString}`;

  const response = await fetch(url);
  const data = await response.json() as { bodies: BodyType[] } | undefined;
  return data?.bodies;
}

export const loadOneBody = async (id: string) => {
  const response = await fetch(oneBodyUrl(id));
  const data = await response.json() as BodyType | undefined;
  return data;
}
