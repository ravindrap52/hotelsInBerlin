import { useState } from "react";
import { SearchInput } from "../components/molecules/SearchInput";
import { ListOfHotels } from "./ListOfHotels";
import { DropDown } from "../components/molecules/DropDown";

export const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <section className="flex flex-col">
      <div className="flex">
        <SearchInput
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <DropDown />
      </div>
      <ListOfHotels />
    </section>
  );
};
