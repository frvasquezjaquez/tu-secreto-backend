require('dotenv').config();
import express from 'express';
import middlewares from './middlewares';
import log from './config/winston';

const app = express();

/*========================
      DB CONNECTION
========================*/
// require('./config/db');

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

const SERVER = new ApolloServer({
      typeDefs,
      resolvers,
      // context: {
      //       Motel
      // }
      //,
      introspection: true,
      playground: true,
      playground: {
          endpoint: `http://localhost:4000/graphql`,
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
