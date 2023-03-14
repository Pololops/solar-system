// API website : https://api.le-systeme-solaire.net

const allBodiesUrl = `https://api.le-systeme-solaire.net/rest/bodies/`;
const oneBodyUrl = (id: string) => `https://api.le-systeme-solaire.net/rest/bodies/${id}`;

export type BodyType = {
  id: String;
  name: String;
  englishName: String;
  isPlanet: true;
  moons: Array<{
    moon: String,
    rel: String
  }>;
  semimajorAxis: Number;
  perihelion: Number;
  aphelion: Number;
  eccentricity: Number;
  inclination: Number;
  mass: Array<{
    massValue: Number;
    massExponent: Number;
  }>;
  vol: Array<{
    volValue: Number;
    volExponent: Number;
  }>;
  density: Number;
  gravity: Number;
  escape: Number;
  meanRadius: Number;
  equaRadius: Number;
  polarRadius: Number;
  flattening: Number;
  dimension: String;
  sideralOrbit: Number;
  sideralRotation: Number;
  aroundPlanet: {
    planet: String;
    rel: String;
  };
  discoveredBy: String;
  discoveryDate: String;
  alternativeName: String;
  axialTilt: Number;
  avgTemp: Number;
  mainAnomaly: Number;
  argPeriapsis: Number;
  longAscNode: Number;
  bodyType: String;
  rel: String;
};

export const loadBodies = async () => {
  const response = await fetch(allBodiesUrl);
  const data = await response.json() as { bodies: BodyType[] } | undefined;
  return data?.bodies;
}

export const loadBodyById = async (id: string) => {
  const response = await fetch(oneBodyUrl(id));
  const data = await response.json() as BodyType | undefined;
  return data;
}