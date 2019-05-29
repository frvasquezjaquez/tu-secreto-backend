require('dotenv').config();
import express from 'express';
import middlewares from './middlewares';
import log from './config/winston';

const app = express();

/*========================
      DB CONNECTION
========================*/
require('./config/db');

/*========================
      MIDDLEWARES
========================*/
middlewares(app);

/*========================
      GRAPHQL APOLLO SERVER
========================*/
import { ApolloServer} from 'apollo-server-express';
import typeDefs from './modules/motel/motel.schema'
import resolvers from './modules/motel/motel.resolver'


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const SERVER = new ApolloServer({
      typeDefs,
      resolvers,
      introspection: true,
      playground: {
          endpoint: `https://${process.env.HOSTNAME}:${process.env.PORT}/graphql`,
          settings: {
              'editor.theme': 'dark'
          }
      }
    })
    
    SERVER.applyMiddleware({
      app
    })

const server = app.listen(process.env.PORT, err => {
  if (err) throw Error(err);
  log.info(`
  Server running on port: ${process.env.PORT}
  Environment: ${process.env.NODE_ENV}
  `);
});

export {
  server,
  app
};
