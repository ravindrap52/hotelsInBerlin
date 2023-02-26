import { FC, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  status,
  error,
  allHotels,
  getAllHotels,
  searchtHotelByHotelName,
  hotelFound,
  searchStatus,
} from "../features/hotels/hotelsSlice";

import { ListItems } from "../components/molecules/ListItems";
import { ISearchHotel } from "../features/hotels/responseInterface";
import { filterResponseData } from "../app/filterResponseData";

export const ListOfHotels: FC<ISearchHotel> = ({ searchTerm }) => {
  const dispatch = useAppDispatch();
  // get language from store
  const locale = useAppSelector((state) => state.language.lang);

  // get all hotels from store
  const hotels = useAppSelector(allHotels);

  // get serched hotel
  const serachedHotel = useAppSelector(hotelFound);
  const searchLoadingStatus = useAppSelector(searchStatus);

  const loadingStatus = useAppSelector(status);
  const errorMessage = useAppSelector(error);

  function isEmpty(value) {
    return (
      value == null || (typeof value === "string" && value.trim().length === 0)
    );
  }

  useEffect(() => {
    dispatch(getAllHotels(locale));
  }, [locale]);

  useEffect(() => {
    if (searchTerm) {
      dispatch(searchtHotelByHotelName({ searchTerm, locale }));
    }
  }, [searchTerm]);

  let hotel = null;
  if (!isEmpty(searchTerm) && searchLoadingStatus === "succeeded") {
    hotel = serachedHotel?.result.map((hotel) => (
      <ListItems key={hotel.id} item={hotel} />
    ));
  } else if (loadingStatus === "succeeded") {
    hotel = hotels?.result.map((hotel) => (
      <ListItems key={hotel.id} item={hotel} />
    ));
  }
  return hotel;
};
