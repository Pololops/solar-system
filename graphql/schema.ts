const typeDefs = `
  #### Requests
  type Query {
    hello: String

    "List of all bodies in the solar system."
    bodies(type: Type): [Body]

    "One body of the solar system."
    body(id: String!): Body
  }

  #### Schemas
  type Body {
    id: String!
    name: String!
    englishName: String!
    isPlanet: Boolean!
    moons: [Body]
    density: Float!
    gravity: Float!
    dimension: String!
    aroundPlanet: Body
    discoveredBy: String!
    discoveryDate: String!
    alternativeName: String!
  }

  #### Enums
  enum Type {
    Planet
    Moon
    Asteroid
    Star
    Comet
  }
`;

export default typeDefs;
