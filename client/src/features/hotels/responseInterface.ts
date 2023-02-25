interface ITranslation {
  "en-US": string;
  "de-DE": string;
  "es-ES": string;
  "fr-FR": string;
}

export interface IResponse {
  id: number;
  name: string;
  address: string;
  city: string;
  description: string;
  minPrice: number;
  currencyCode: string;
  distance: number;
  deals: { headline: ITranslation; details: ITranslation }[];
  images: { url: string; caption: ITranslation }[];
}
[];


