import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { IResponse } from "../../features/hotels/responseInterface";

interface IListProps {
  item: IResponse;
}
//TODO create a image component and try to use swiper component in there.
export const ListItems: FC<IListProps> = ({ item }): JSX.Element => {
  const navigate = useNavigate();

  function showHotelDetails(hotelId: number) {
    navigate(`hotelDetails/${hotelId}`);
  }

  return (
    <article
      aria-hidden /* added because to avoid accessbility issue */
      className="max-w-sm rounded overflow-hidden shadow-lg m-4 cursor-pointer"
      key={item.id}
      onClick={() => showHotelDetails(item.id)}
    >
      <img className="w-full" src={item.images[0].url} alt={item.name} />
      <div className="px-6 py-4">
        <h1 className="font-bold text-xl mb-2">{item.name}</h1>
        <p className="text-gray-700 text-base">{item.address}</p>
        <p className="text-gray-700 text-base">
          <label htmlFor="distance">Zentrum:</label> {item.distance} KM
        </p>
      </div>
    </article>
  );
};
