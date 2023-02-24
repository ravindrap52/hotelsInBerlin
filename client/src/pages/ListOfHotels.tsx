import { FC } from "react";
import { ListItems } from "../components/molecules/ListItems";

const data = [
  {
    id: "2384",
    name: "test1",
    address: "test",
    distance: "3KM",
  },
  {
    id: "2385",
    name: "test1",
    address: "test",
    distance: "3KM",
  },
];

export const ListOfHotels: FC = () => {
  return <ListItems listItems={data} />;
};
