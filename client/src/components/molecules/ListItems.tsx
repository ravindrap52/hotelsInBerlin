import { FC } from "react";

interface IListProps {
  listItems: Array<{ [key: string]: string }>;
}

export const ListItems: FC<IListProps> = ({ listItems }): JSX.Element => {
  return (
    <div className="m-4">
      {listItems.map((item) => {
        return (
          <div
            className="max-w-sm rounded overflow-hidden shadow-lg mb-2"
            key={item.id}
          >
            <img
              className="w-full"
              src="https://rt-hotel-images-prod.s3.amazonaws.com/2384_IcePortal_0_thumb.jpg"
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <h1 className="font-bold text-xl mb-2">{item.name}</h1>
              <p className="text-gray-700 text-base">{item.address}</p>
              <p className="text-gray-700 text-base">{item.distance}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
