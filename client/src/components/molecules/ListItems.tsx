import { FC } from "react";
import { IResponse } from "../../features/hotels/responseInterface";

interface IListProps {
  item: IResponse;
}
//TODO create a image component and try to use swiper component in there.
export const ListItems: FC<IListProps> = ({ item }): JSX.Element => {
  return (
    <div className="m-4">
      <div
        className="max-w-sm rounded overflow-hidden shadow-lg mb-2"
        key={item.id}
      >
        <img
          className="w-full"
          src={item.images[0].url}
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <h1 className="font-bold text-xl mb-2">{item.name}</h1>
          <p className="text-gray-700 text-base">{item.address}</p>
          <p className="text-gray-700 text-base">
            <label htmlFor="distance">Zentrum:</label> {item.distance} KM
          </p>
        </div>
      </div>
    </div>
  );
};
