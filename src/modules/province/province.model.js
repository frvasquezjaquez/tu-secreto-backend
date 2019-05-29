
import { Schema, model } from 'mongoose';

const provinceSchema = new Schema({
  name:  String,
  slug: String,
  motels: [{
    type: Schema.Types.ObjectId ,
    ref: 'Motel'
  }],
  municipality: [{
    type: Schema.Types.ObjectId ,
    ref: 'Municipality'
  }]
},  {collection: 'province_db'})

const Province = model('Province', provinceSchema);

export {
  Province
}