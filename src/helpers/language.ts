import hotels from '../scripts/hotels.json';

const allLocales: string[] = ['en-US', 'de-DE', 'fr-FR', 'es-ES'];

const getTextBasedOnLocale = (locale: string, textObject) => {
  // returning an empty string if locale not found
  if (!allLocales.includes(locale)) return '';
  // if the locale is present return it
  if (locale in textObject) return textObject[locale];
  // Search through locales by priority
  const locales = [...allLocales].find(locale => locale in textObject);
  // If no match return an empty string
  return locales ? textObject[locales] : '';
};
const getLocaleTextForDeals = (locale: string, dealsArray: Array<{ headline: object; details: object }>) => {
  return dealsArray.map(deal => {
    return {
      headline: getTextBasedOnLocale(locale, deal.headline),
      deatails: getTextBasedOnLocale(locale, deal.details)
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

const locale = 'es-ES';
export const hotel = hotels.map(hotel => {
  return ['name', 'address', 'city', 'description'].reduce(
    (acc, key) => {
      return {
        ...acc,
        distance: 2,
        deals: getLocaleTextForDeals(locale, hotel.deals),
        images: getLocaleTextForImages(locale, hotel.images),
        [key]: getTextBasedOnLocale(locale, hotel[key])
      };
    },
    { id: hotel.id }
  );
});
