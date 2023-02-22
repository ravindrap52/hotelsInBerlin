import express from 'express';
import mongoose from 'mongoose';
import { config } from './config/config';
import { logger } from './helpers/logging';
import httpServer from 'http';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// When successfully connected
mongoose.connection.on('connected', () => {
  logger.info(`Mongoose default connection open to ${config.mongo.host}`);
});

// If the connection throws an error
mongoose.connection.on('error', err => {
  logger.error(`Mongoose default connection error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  logger.warn('Mongoose default  connection disconnected');
});

// If the Node process ends, close mongo connection
process.on('SIGINT', () => {
  logger.info('Mongoose default connection disconnected');
  mongoose.connection.close(() => {
    logger.info(
      'Mongoose default connection disconnected through app termination'
    );
    process.exit(0);
  });
});

/** Rules of our API */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

/** Healthcheck */
app.get('/ping', (req, res) => res.status(200).json({ status: 'success' }));

/** Error handling for non matching routes*/
app.use((req, res, next) => {
  res
    .status(404)
    .json({ status: 404, title: 'Not Found', message: 'Route not found' });
  logger.error('Route not found');
  next();
});

export async function listen() {
  logger.log({ level: 'info', message: 'Open mongoose connection.' });
  await mongoose.connect(config.mongo.url);
  httpServer
    .createServer(app)
    .listen(config.server.port, () =>
      logger.info(`Server is running on port ${config.server.port}`)
    );
}
