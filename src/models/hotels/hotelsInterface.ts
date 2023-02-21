
interface IDeal {
  expireTime: string;
  headline: ITranslation;
  details: ITranslation;
}

interface IImages {
  url: string;
  caption: ITranslation;
}


interface ITranslation {
  'en-US': string,
  'de-DE': string,
  'es-ES': string,
  'fr-FR': string
}

export interface IHotel {
  id: number;
  minPrice: number;
  currencyCode: string;
  countryCode: string;
  name: ITranslation;
  address: ITranslation;
  city: ITranslation;
  description: ITranslation;
  benefits: {text: ITranslation}[];
  deals: IDeal[];
  images: IImages[];
  lat: number;
  lng: number;
}
