import express, { Request, Response } from 'express';
import { Hotel } from '../../models/hotels/HotelsSchema';
import { errorHandler } from '../../helpers/errorHandler';
import { hotelsList } from '../../helpers/language';
import { IResult } from '../interface/responseInterface';

const router = express.Router();

interface IRequest {
  search: string;
  lang: string;
}

// using for mongoProjection
const baseProjection = {
  id: 1,
  name: 1,
  address: 1,
  city: 1,
  description: 1,
  minPrice: 1,
  currencyCode: 1,
  lat: 1,
  lng: 1
};

router.route('/').get(async (req: Request<string, string, string, IRequest>, res: Response) => {
  const { search = '', lang } = req.query;
  if (search) {
    const query = `name.${lang}`;
    try {
      const hotel = (await Hotel.find(
        {
          [query]: { $regex: search, $options: 'i' }
        },
        { ...baseProjection, deals: { $slice: 1 }, images: { $slice: 1 } }
      ).lean()) as Array<IResult>;

      // at the moment i'm not quite sure how to handle this scenario
      // if the search term is not matched with the lang parameter.
      if (!Object.keys(hotel).length) {
        // TODO move error messages to different file.
        return res.json(
          errorHandler(false, `Hotel with search tearm ${search} is not available, try using other search term`, null)
        );
      }
      // formatting data based on lang.
      const hotelList = hotelsList(hotel, lang);
      return res.json({
        sucess: true,
        result: hotelList
      });
    } catch (error) {
      return res.json(errorHandler(false, error.message, null));
    }
  } else {
    try {
      const hotels = (await Hotel.find({}, { ...baseProjection, deals: 1, images: 1 })) as Array<IResult>;
      // formatting data based on lang.
      const hotelList = hotelsList(hotels, lang);
      return res.json({
        sucess: true,
        result: hotelList
      });
    } catch (error) {
      return res.json(errorHandler(false, error.message, null));
    }
  }
});

export default router;
