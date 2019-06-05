import {  UserInputError, ApolloError, ValidationError, ForbiddenError } from "apollo-server-express";
import { Municipality } from '../municipality/municipality.model'
import { Province } from '../province/province.model'
import { Motel } from './motel.model'

export default {
    Query: {
      getAll: async (parent, args) => {
        let { page, limit } = args; 

        let motelResult = await Motel.find({})
                                      .populate({
                                                path: 'geolocation.location.province',
                                                select: 'name'})
                                      .skip(page * limit)
                                      .limit(limit);
        let motelCount = await Motel.find({}).count()

        return { motels : motelResult,
                totalCount: motelCount}
      },
      searchByParams: async (parent, args) => {
        let { name, province, price, page, limit, roomType } = args;
        let query = {};
        let province_query =  {
          path: 'geolocation.location.province',
          select: 'name'
          };

        if (name !== undefined && name !== "") query['name'] = name;
        if (roomType !== undefined && roomType !== "") query['rooms.roomType'] = roomType;
        if (price !== undefined && price !== "") query['rooms.plans.price'] = { $lte: price };
        if (province !== undefined && province !== ""){
          province_query['match'] = { name: province};
        }
        
        let motelResult = await Motel.find( query )
                                .populate( province_query )
                                .skip(page * limit)
                                .limit(limit);
                                
        let motelCount =  Motel.find(query).count();
        
        return {  motels: motelResult, 
                  totalCount: motelCount }
        
       
      },
      getByProvinceSlug: async(parent, args) => {
        let { slug, page, limit } = args;

        let province  = await Province.findOne({ slug })
                                      .populate({ path: 'motels' });  
        let end = page * limit;

        if (province !== null) {
          return { motels: province.motels.slice(end-limit, end),
                  totalCount: province.motels.length}
        }
        return { motels: [],
          totalCount: 0}
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
            
          await Motel.updateOne({ _id : args.motel_id },{                    
                          $push: { reviews: review } });

          return await Motel.findOne({ _id:args.motel_id })
        }

        throw new UserInputError("Error al actualizar cabaña")
        
      }
    }
  }