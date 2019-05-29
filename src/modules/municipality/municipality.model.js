
import { Schema, model } from 'mongoose';

const municipalitySchema = new Schema({
  name:  String,
  motels: [{
    type: Schema.Types.ObjectId ,
    ref: 'Motel'
  }]
},  {collection: 'municipality_db'})

const Municipality = model('Municipality', municipalitySchema);

export {
  Municipality
}