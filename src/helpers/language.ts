import { IResult } from '../controllers/interface/responseInterface';
import { distanceToCenter } from './distanceToCenter';

const allLocales: string[] = ['en-US', 'de-DE', 'fr-FR', 'es-ES'];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

const getTextBasedOnLocale = (locale: string, textObject) => {
  if (textObject) {
    // returning an empty string if locale not found
    if (!allLocales.includes(locale)) return '';
    // if the locale is present return it
    if (locale in textObject) return textObject[locale];
    // Search through locales by priority
    const locales = [...allLocales].find(locale => locale in textObject);
    // If no match return an empty string
    return locales ? textObject[locales] : '';
  }
};
const getLocaleTextForDeals = (locale: string, dealsArray: Array<{ headline: object; details: object }>) => {
  return dealsArray.map(deal => {
    return {
      headline: getTextBasedOnLocale(locale, deal.headline),
      details: getTextBasedOnLocale(locale, deal.details)
    };
  });
};

const getLocaleTextForImages = (locale: string, imagesArray: Array<{ url: string; caption: object }>) => {
  return imagesArray.map(image => {
    return {
      url: image.url,
      caption: getTextBasedOnLocale(locale, image.caption)
    };
  });
};

export const hotelsList = (listOfHotels: Array<IResult>, locale: string) => {
  return listOfHotels.map(hotel => {
    return ['name', 'address', 'city', 'description'].reduce(
      (acc, key) => {
        return {
          ...acc,
          distance: distanceToCenter([hotel.lat, hotel.lng], [52.520008, 13.404954], true), // TODO remove the hard coded value
          deals: getLocaleTextForDeals(locale, hotel.deals),
          images: getLocaleTextForImages(locale, hotel.images),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          [key]: getTextBasedOnLocale(locale, hotel[key])
        };
      },
      { id: hotel.id, minPrice: hotel.minPrice, currencyCode: hotel.currencyCode }
    );
  });
};
