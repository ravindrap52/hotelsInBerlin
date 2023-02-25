import { useAppSelector } from "../app/hooks";
import { status, error, allHotels } from "../features/hotels/hotelsSlice";

import { ListItems } from "../components/molecules/ListItems";

//TODO improve styling
export const ListOfHotels = () => {
  const hotels = useAppSelector(allHotels);
  const loadingStatus = useAppSelector(status);
  const errorMessage = useAppSelector(error);

  let content = null;
  if (loadingStatus === "loading") {
    content = <div>loading...</div>;
  } else if (loadingStatus === "succeeded") {
    content = hotels.result.map((hotel) => {
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
