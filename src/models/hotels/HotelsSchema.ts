import { model, Schema } from 'mongoose';
import { IHotel } from './hotelsInterface';

const hotelSchema: Schema = new Schema<IHotel>({
  id: { type: Number },
  minPrice: { type: Number },
  currencyCode: { type: String },
  countryCode: { type: String },
  name: { type: Object },
  address: { type: Object },
  city: { type: Object },
  description: { type: Object },
  benefits: [{ type: Object }],
  deals: [{ type: Object }],
  images: [{ type: Object }],
  lat: { type: Number },
  lng: { type: Number }
});

export const Hotel = model('Hotel', hotelSchema);
