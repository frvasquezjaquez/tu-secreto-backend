import {  UserInputError, ApolloError, ValidationError, ForbiddenError } from "apollo-server-express";
import { Municipality } from '../municipality/municipality.model'
import { Province } from '../province/province.model'
import { Motel } from './motel.model'

export default {
    Query: {
      getAll: async (parent, args) => {
        return Motel.find({}).populate({
          path: 'geolocation.location.province',
          select: 'name'
        });
      },
      searchByParams: async (parent, args) => {
        let { name, province, price } = args;
        let query = {};

        if (name !== undefined && name !== "") query['name'] = name;
        if (province !== undefined && province !== "") query['geolocation.location.province.name'] = province;
        if (price !== undefined && price !== "") query['rooms.plans.price'] = { $lte: price };
        
        console.log(query)
        let a = await Motel.find( query ).populate({
          path: 'geolocation.location.province',
          select: 'name'
        });

        console.log(a);
        return a;
      },
      getByProvinceSlug: async(parent, args) => {
        let { slug } = args;
        let province  = await Province.findOne({ slug })
                                      .populate({ path: 'motels' });
        return province.motels;
      },

      getByPrice: async(parent, args) => {
        let { max } = args;

        return Motel.find({
          'rooms.plans.price': { $lte: max }
        }).populate({
          path: 'geolocation.location.province',
          select: 'name'
        });

      },
      getByTuSecretoSlug: async (parent, args ) => {
        let { slug } = args ;
        return Motel.findOne({ slug })
                    .populate({
                      path: 'geolocation.location.province',
                      select: 'name'
                    });
      },
      ping: async(parent, args) => {
      return "Pong"
      }
    },
    Mutation: {
      setReview: async(parent, args) =>{
       if ( args.motel_id !== undefined  && args.motel_id !== "" ){
          let review = {
            rating: args.rating,
            comment: args.comment,
            email: args.email };
            
          let motel = await Motel.updateOne({ 
                                        _id : args.motel_id,
                                        $push: { reviews: review } });
          return motel;
        }

        throw new UserInputError("Error al actualizar cabaña")
        
      }
    }
  }