import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  status,
  error,
  allHotels,
  getAllHotels,
} from "../features/hotels/hotelsSlice";

import { ListItems } from "../components/molecules/ListItems";

//TODO improve styling
export const ListOfHotels = () => {
  const dispatch = useAppDispatch();
  // get language from store
  const locale = useAppSelector((state) => state.language.lang);

  const hotels = useAppSelector(allHotels);
  const loadingStatus = useAppSelector(status);
  const errorMessage = useAppSelector(error);

  useEffect(() => {
    dispatch(getAllHotels(locale));
  }, [locale]);

  let content = null;
  if (loadingStatus === "loading") content = <p>loading...</p>;
  else if (loadingStatus === "failed") content = <p>{errorMessage}</p>;
  else if (loadingStatus === "succeeded") {
    const sortedByDistance = hotels?.result
      .slice()
      .sort((a, b) => a.distance - b.distance);
    content = sortedByDistance.map((hotel) => {
      return <ListItems key={hotel.id} item={hotel} />;
    });
  }

  return <div className="flex flex-wrap">{content}</div>;
};
