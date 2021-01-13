import './common/env';
import Server from './common/server';
import L from './common/logger';
import routes from './routes';
import {databaseaccess} from '../src/databaseaccess';

type serverCallback = () => void;

const callback: serverCallback = async () => {
   L.info(`Listening on port ${port}`);
  try {
    await databaseaccess.connect(process.env.DB_URL || `mongodb://@localhost:27017/solace-platform?retryWrites=true&w=majority`);
    L.info(`Connected to Mongo!`);
  } catch (err) {
    L.error(`Unable to connect to Mongo!`, err);
  }

};

const port = parseInt(process.env.PORT);
var server = new Server().router(routes).listenWithCallback(port, callback);
export default server;




server.on('listening', async () => {
  L.info(`Listening on port ${port}`);
  try {
    await databaseaccess.connect(process.env.DB_URL || `mongodb://@localhost:27017/solace-platform?retryWrites=true&w=majority`);
    //await databaseaccess.connect(`mongodb://api-user:Solace123@localhost:27017/solace-platform?retryWrites=true&w=majority`);
    L.info(`Connected to Mongo!`);
  } catch (err) {
    L.error(`Unable to connect to Mongo!`, err);
  }
});


