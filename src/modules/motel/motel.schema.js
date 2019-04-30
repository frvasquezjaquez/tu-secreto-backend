export default `


  type Motel {
    _id: String!
    name: String!
    geolocation: GeoLocation!
    tu_secreto_site: String!
    contacts: Contact!
    rooms: [Room!]
    attractives: [Attractive!]
    description: String!
  }

  type GeoLocation {
    latitude: String!
    longitude: String!
    location: Location
  }

  type Location {
    province : String!
    full : String!
    country : String!
    municipality : String!
    postal_code : String!
    province_url : String!
    address : String!
  }

  type Contact {
    phones : String!
    site : String!
    email : String!
  }

  type Attractive {
    credit_card:  Boolean!
  }

  type Room {
    currency: String!
    type: String!
    description: String!
    price: [Price]
  }

  type Price {
    hours: String!
    price: Float!
  }

  type Query {
    getAll: [Motel]!
    getByProvince(
      province: String!
    ): [Motel]!

    getByPriceRange(
      max: Float!,
      min: Float!
    ): [Motel]!
    ping: String!
  }


`;