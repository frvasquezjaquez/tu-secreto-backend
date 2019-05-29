export default `

  type Motel {
    _id: String
    name: String
    geolocation: GeoLocation
    slug: String
    description: String
    contact: Contact
    rooms: [Room]
    attractives: Attractive
    images: Image
    reviews: [Review]
  }

  type GeoLocation {
    latitude: String
    longitude: String
    location: Location
  }

  type Location {
    province : Province
    full : String
    country : String
    municipality : String
    postalCode : String
    address : String
  }

  type Contact {
    phones : String
    site : String
    email : String
  }

  type Attractive {
    creditCard:  Boolean
    wifi:  Boolean 
    jacuzzi:  Boolean
    discoLights:  Boolean
    poleDance:  Boolean
    eroticSofa:  Boolean
    ceilingMirror:  Boolean
    discoBar:  Boolean
    drinkService:  Boolean
    hotBaths:  Boolean
    phone:  Boolean
    waterBed:  Boolean  
    foodService: Boolean
    
  }

  type Room {
    currency: String
    type: String
    description: String
    plans: [Plan]
  }

  type Plan {
    name: String
    price: Float
  }
  
  type Image { 
    sliderImages: [String]
    featuredImage: String
  }

  type Province {
    slug : String
    name: String
    municipality: String
  }

  type Review {
    user: String,
    rating: Int
    comment: String
  }

  type Query {
    getAll: [Motel]

    searchByParams(
      price: Int
      name: String
      province: String
    ): [Motel]
    
    getByProvinceSlug(
      slug: String!
    ): [Motel]

    getByPrice(
      max: Float!): [Motel]

    getByTuSecretoSlug(
      slug : String!): Motel

    ping: String
  }

  type Mutation {
    setReview(
      motel_id: String 
      email: String
      comment: String
      rating: Int! ): Motel
  }


`;