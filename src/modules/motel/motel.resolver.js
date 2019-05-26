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

      // search: async(parent, args) => {
      //   let { plan_name, price, name, province } = args;
      //   return Motel.filter((motel) => {
      //     let isPrice = false;
      //     let isName = name  != undefined && motel.name.toLowerCase().includes(name.toLowerCase());
      //     let isProvince =  province != undefined && motel.geolocation.location.province.includes(province.toLowerCase())
          
      //     for (let room in motel.rooms){
      //       for (let plan in room.plans){
      //          if (plan.price == price) isPrice = true;
      //       }
      //     }
      //     let isProvince =  province != undefined && motel.geolocation.location.province.includes(province.toLowerCase())
                
      //           // motel.geolocation.location.municipality.includes(filter_value)
      //   })
      // },

      ping: async(parent, args) => {
      return "Pong"
      }
    }
  }