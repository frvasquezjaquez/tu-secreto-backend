
import { Schema, model } from 'mongoose';

const municipalitySchema = new Schema({
  name:  String,
  motels: [{
    type: Schema.Types.ObjectId ,
    ref: 'Motel'
  }]
})

const Municipality = model('Municipality', municipalitySchema);

export {
  Municipality
}