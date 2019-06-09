import {
  UserInputError
} from "apollo-server-express";
import {
  Municipality
} from '../municipality/municipality.model'
import {
  Province
} from '../province/province.model'
import {
  Motel
} from './motel.model'


export default {
  Query: {
    getAll: async (parent, args) => {
      let {
        page,
        limit,
        longitude,
        latitude
      } = args;

      let motelResult = await Motel.aggregate([{
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [longitude, latitude]
            },
            distanceField: "distance",
            spherical: true
          }
        },
        {
          "$sort": {
            "distance": 1
          }
        },
        {
          $skip: (page - 1) * limit
        },
        {
          $limit: limit
        }
      ]);

      motelResult = await Motel.populate(motelResult, {
        path: 'geolocation.location.province',
        select: 'name'
      });

      let motelCount = await Motel.find({}).count();


      return {
        motels: motelResult,
        totalCount: motelCount
      }
    },

    searchByParams: async (parent, args) => {
      let {
        name,
        province,
        price,
        provinceSlug,
        page,
        limit,
        roomType,
        longitude,
        latitude
      } = args;
      let query = {};
      let matchFilter = {}


      if (name !== undefined && name !== "") query['name'] = name;
      if (roomType !== undefined && roomType !== "") query['rooms.roomType'] = roomType;
      if (price !== undefined && price !== "") query['rooms.plans.price'] = {
        $lte: price
      };
      if (province !== undefined && province !== "") {
        matchFilter["geolocation.location.province.name"] = province
      }
      if (provinceSlug !== undefined && provinceSlug !== "") {
        matchFilter["geolocation.location.province.slug"] = provinceSlug
      }


      let motelResult = await Motel.aggregate([{
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [longitude, latitude]
            },
            distanceField: "geolocation.distance",
            spherical: true,
            query,
            limit:500
          }
        },
        {
          $lookup: {
            from: "province_db",
            localField: "geolocation.location.province",
            foreignField: "_id",
            as: "geolocation.location.province"
          }
        },
        {
          $unwind: '$geolocation.location.province'
        },
        {
          $match: matchFilter
        }
      ]);
      
      let end = page * limit;

      return {
        motels: motelResult.slice(end - limit, end),
        totalCount: motelResult.length
      }
    },
    getByTuSecretoSlug: async (parent, args) => {
      let {
        slug
      } = args;

      return await Motel.findOne({
          slug
        })
        .populate({
          path: 'geolocation.location.province',
          select: 'name'
        });
    },

   
  },
  Mutation: {
    setReview: async (parent, args) => {
      if (args.motel_id !== undefined && args.motel_id !== "") {
        let review = {
          rating: args.rating,
          comment: args.comment,
          email: args.email
        };

        await Motel.updateOne({
          _id: args.motel_id
        }, {
          $push: {
            reviews: review
          }
        });

        return await Motel.findOne({
          _id: args.motel_id
        });
      }

      throw new UserInputError("Error al actualizar cabaña")

    }
  }
}