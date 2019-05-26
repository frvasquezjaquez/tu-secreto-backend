import { Schema, model } from 'mongoose';

const motelSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    minlength: 3
  }, 
  slug: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
  },
  images:  {
    sliderImages: [String],
    featuredImage: String   
  },
  rooms: [{
      roomType: String,
      description: String,
      plans: [{
        name: String,
        currency: String,
        price: Number
      }]
  }],
  attractives: {
    creditCard:  Boolean,
    wifi:  Boolean ,
    jacuzzi:  Boolean,
    discoLights:  Boolean,
    poleDance:  Boolean,
    eroticSofa:  Boolean,
    ceilingMirror:  Boolean,
    discoBar:  Boolean,
    drinkService:  Boolean,
    hotBaths:  Boolean,
    phone:  Boolean,
    waterBed:  Boolean
  },
  contacts: {
    phones: String,
    site: String,
    email: String,
  },
  geolocation: {
    latitude: String,
    longitude: String,
    location: {
      full: String,
      country: String,
      postalCode: String,
      address: String,
      province:{
        type: Schema.Types.ObjectId ,
        ref: 'Province'
      },
      municipality:{
        type: Schema.Types.ObjectId ,
        ref: 'Municipality'
      }
    }
  }

  
});

const Motel = model('Motel', motelSchema);

export {
  Motel
};
