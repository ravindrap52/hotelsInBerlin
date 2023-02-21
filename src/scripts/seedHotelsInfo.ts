import mongoose from 'mongoose';
import { Hotel } from '../models/hotels/HotelsSchema';
import { config } from '../config/config';
import hotelsJson from './hotels.json';

mongoose.Promise = global.Promise;

async function start() {
  await mongoose
    .connect(config.mongo.url)
    .then(() => {
      console.log('connected to the Database');
    })
    .catch(error =>
      console.log(`Error while connecting to the Database ${error}`)
    );
  for (const hotel of hotelsJson) {
    try {
      await Hotel.create(hotel);
    } catch (error) {
      console.log(error);
    }
  }
}

start().then(() => {
  process.stdout.write('\nDone.');
  process.exit();
});
