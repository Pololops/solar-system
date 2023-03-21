type SolarSystemObject = {
  id: string;
  name: string;
  englishName: string;
  isPlanet: true;
  moons: Array<{
    moon: string,
    rel: string
  } | {
    name: string,
    id: string
  }> | null;
  semimajorAxis: number;
  perihelion: number;
  aphelion: number;
  eccentricity: number;
  inclination: number;
  mass: Array<{
    massValue: number;
    massExponent: number;
  }>;
  vol: Array<{
    volValue: number;
    volExponent: number;
  }> | null;
  density: number;
  gravity: number;
  escape: number;
  meanRadius: number;
  equaRadius: number;
  polarRadius: number;
  flattening: number;
  dimension: string;
  sideralOrbit: number;
  sideralRotation: number;
  aroundPlanet: {
    planet: string;
    rel: string;
  } | {
    name: string;
    id: string;
  } | null;
  discoveredBy: string;
  discoveryDate: string;
  alternativeName: string;
  axialTilt: number;
  avgTemp: number;
  mainAnomaly: number;
  argPeriapsis: number;
  longAscNode: number;
  bodyType: 'Star' | 'Planet' | 'Dwarf Planet' | 'Asteroid' | 'Comet' | 'Moon';
  rel: string;
};

type KeyValueType<T> = {
  [key in keyof T]: T[key] extends (string | number | boolean)
  ? [key, FilterOperators, T[key]]
  : never;
}[keyof T];

type FilterOperators =
  | 'cs' // contains
  | 'ncs' // not contains
  | 'sw' // starts with
  | 'nsw' // not starts with
  | 'ew' // ends with
  | 'new' // not ends with
  | 'eq' // equal
  | 'neq' // not equal
  | 'it' // is true
  | 'nit' // is not true
  | 'le' // less than or equal
  | 'nle' // not less than or equal
  | 'ge' // greater than or equal
  | 'nge' // not greater than or equal
  | 'gt' // greater than
  | 'ngt' // not greater than
  | 'bt' // between
  | 'nbt' // not between
  ;

type LoadObjectParams = {
  data?: string[]; // filter data to retrieve : [id,semimajorAxis,isPlanet]
  exclude?: string[]; // exclude data to retrieve : [id,semimajorAxis,isPlanet]
  order?: [keyof SolarSystemObject, ('asc' | 'desc')]; // order by a particular data["semimajorAxis", "asc"]
  page?: [number, number]; // page number and number of items per page : [1, 10]
  rowData?: boolean; // set to true to transform objects into records (default is false)
  filter?: [...KeyValueType<SolarSystemObject>][]; // [["isPlanet", "eq", "true"]]
  satisfy?: 'all' | 'any'; // satisfy all or any filter (default is any)
};