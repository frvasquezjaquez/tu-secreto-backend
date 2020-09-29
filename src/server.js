require('dotenv').config();
import express from 'express';
import middlewares from './middlewares';
import log from './config/winston';
let cors = require('cors');


const app = express();
app.use(cors());

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

const SERVER = new ApolloServer({
      typeDefs,
      resolvers,
      introspection: true,
      playground: {
          endpoint: `${process.env.PLAYGROUND_URL}`,
          settings: {
              'editor.theme': 'dark'
          }
      }
    })
    
    SERVER.applyMiddleware({
      app
    })

const server = app.listen(3000, err => {
  if (err) throw Error(err);
  log.info(`
  Server running on port: 3000
  Environment: ${process.env.NODE_ENV}
  `);
});

export {
  server,
  app
};
