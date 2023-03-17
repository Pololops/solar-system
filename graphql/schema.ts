
const typeDefs = `
  #### Requests
  type Query {
    hello: String

    "List of all bodies in the solar system."
    bodies(type: Type): [Body]!

    "One body of the solar system."
    body(id: String!): Body!
  }

  #### Schemas
  interface Thing {
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
    bodyType: Type!
  }

  type Moon implements Thing {
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
    bodyType: Type!
    aroundPlanet: Planet!
  }

  type Planet implements Thing {
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
    bodyType: Type!
    moons: [Moon]!
  }

  union Body = Planet | Moon

  #### Enums
  enum Type {
    Planet
    Moon
    Asteroid
    Star
    Comet
  }
`

export default typeDefs;
