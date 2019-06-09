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
    distance: String
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
    roomType: String
    description: String
    plans: [Plan]
  }

  type Plan {
    name: String
    price: Float
    currency: String
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

  type MotelResult {
    motels: [Motel]
    totalCount: Int
  }

  type Query {
    getAll(
      page: Int  = 1
      limit: Int = 20
      latitude: Float = 0
      longitude: Float = 0
    ): MotelResult

    searchByParams(
      price: Int
      name: String
      province: String
      roomType: String
      provinceSlug: String
      page: Int  = 1
      limit: Int = 20
      latitude: Float = 0
      longitude: Float = 0

    ): MotelResult

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