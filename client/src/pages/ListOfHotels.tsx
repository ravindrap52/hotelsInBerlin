import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  status,
  error,
  allHotels,
  getAllHotels,
} from "../features/hotels/hotelsSlice";

import { ListItems } from "../components/molecules/ListItems";
import { useEffect } from "react";

//TODO improve styling
export const ListOfHotels = () => {
  const dispatch = useAppDispatch();

  const hotels = useAppSelector(allHotels);
  const loadingStatus = useAppSelector(status);
  const errorMessage = useAppSelector(error);
  const locale = useAppSelector(state => state.language.lang);

  useEffect(() => {
    dispatch(getAllHotels(locale));
  }, []);

  let content = null;
  if (loadingStatus === "loading") {
    content = <div>loading...</div>;
  } else if (loadingStatus === "succeeded") {
    const sortedByDistance = hotels.result
      .slice()
      .sort((a, b) => a.distance - b.distance);
    content = sortedByDistance.map((hotel) => {
      return <ListItems key={hotel.id} item={hotel} />;
    });
  } else if (loadingStatus === "failed") {
    content = <div>{errorMessage}</div>;
  }

  return (
    <section>
      <p>List of Hotels</p>
      {content}
    </section>
  );
};
