import express from 'express';
import hotelController from './v1/Hotels';

const router = express.Router();

interface IRoutes {
  [index: string]: express.Router;
}

// we can use this way or more cleaner approach would be
// create object and map each route to the respective controller as show below
// router.use('/v1', hotelController);

//TODO move this to a seperate file
const routes: IRoutes = {
  '/v1/recruiting/hotels': hotelController // base route
};

Object.entries(routes).map(([path, controllerFunction]: [string, express.Router]) => {
  router.use(path, controllerFunction);
});

export default router;
