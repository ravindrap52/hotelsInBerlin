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

export interface IHotelsState {
  hotels: Array<{ [key: string]: string }>;
  status: "idle" | "pending" | "succeeded" | "failed";
  searchStatus: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  hotel: Array<{ [key: string]: string }>;
  searchedHotel: Array<{ [key: string]: string }>;
}

export interface IHotel {
  hotelId: string;
  locale: string;
}

export interface ISearchHotel {
  searchTerm: string;
  locale?: string;
}

export interface IFilter {
  distanceFilter: { minDistance: number; maxDistance: number };
  priceFilter: { minPrice: number; maxPrice: number };
}
