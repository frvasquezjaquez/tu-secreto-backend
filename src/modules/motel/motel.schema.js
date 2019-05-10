export default `


  type Motel {
    _id: String
    name: String
    geolocation: GeoLocation
    tu_secreto_site: String
    contacts: Contact
    rooms: [Room]
    attractives: Attractive
    images: Image
    description: String
  }

  type GeoLocation {
    latitude: String
    longitude: String
    location: Location
  }

  type Location {
    province : String
    full : String
    country : String
    municipality : String
    postal_code : String
    province_url : String
    address : String
  }

  type Contact {
    phones : String
    site : String
    email : String
  }

  type Attractive {
    credit_card:  Boolean
    wifi:  Boolean 
    jacuzzi:  Boolean
    disco_lights:  Boolean
    pole_dance:  Boolean
    erotic_sofa:  Boolean
    ceiling_mirror:  Boolean
    disco_bar:  Boolean
    drink_service:  Boolean
    hot_baths:  Boolean
    phone:  Boolean
    water_bed:  Boolean  
    
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
    slider_images: [String]
    featured_image: String
  }

  type Query {
    getAll: [Motel]
    
    getByProvince(
      province_url: String!
    ): [Motel]

    getByPriceRange(
      max: Float!,
      min: Float!
    ): [Motel]

    getByTuSecretoUrl(
      tu_secreto_url: String!
    ): Motel
    
    search(
      filter_value: String!
    ): [Motel]

    ping: String
  }


`;