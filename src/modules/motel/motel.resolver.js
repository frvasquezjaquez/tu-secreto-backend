import {  UserInputError, ApolloError, ValidationError, ForbiddenError } from "apollo-server-express";
import Motel  from './motel.json'

export default {
    Query: {
      getAll: async (parent, args) => {
        return Motel;
      },

      getByProvince: async(parent, args) => {
        let { province } = args
        return Motel.filter((motel) => {
          return motel.geolocation.location.province == province;
        });
      },

      getByPriceRange: async(parent, args) => {
        let { max, min } = args
        return Motel.filter((motel) => {
          for (let room of motel.rooms){
            for (let prices of room.prices){ 
              if (prices.price >= min || prices.price <= max){
                return true;
              }
            }
          }

          return false;
        });
      },

      getByTuSecretoUrl: async (parent, args ) => {
        let { tu_secreto_url } = args ;
        return Motel.find((motel) => {
          return motel.tu_secreto_site == tu_secreto_url
        });
      }
    }
  }