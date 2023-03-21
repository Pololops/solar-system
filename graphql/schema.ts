
const typeDefs = `
  #### Requests
  type Query {
    "List of all objects in the solar system."
    objects(bodyType: ObjectType): [SolarSystemObject]!

    "One object of the solar system."
    object(id: String!): SolarSystemObject
  }

  #### Schemas
  type SolarSystemObject {
    id: String!
    name: String!
    englishName: String!
    isPlanet: Boolean!
    density: Float
    gravity: Float
    dimension: String
    discoveredBy: String
    discoveryDate: String
    alternativeName: String!
    bodyType: String!
    aroundPlanet: SolarSystemObject
    moons: [SolarSystemObject]!
  }

  #### Enums
  enum ObjectType {
    Planet
    DwarfPlanet
    Moon
    Asteroid
    Star
    Comet
  }
`

export default typeDefs;
