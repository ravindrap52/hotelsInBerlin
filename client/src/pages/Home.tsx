import { useState } from "react";
import { SearchInput } from "../components/molecules/SearchInput";
import { ListOfHotels } from "./ListOfHotels";
import { DropDown } from "../components/molecules/DropDown";
import { useDebounce } from "../app/debounce";

export const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const searchText = useDebounce(searchValue, 1000);
  return (
    <section className="flex flex-col">
      <div className="flex">
        <SearchInput
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <DropDown />
      </div>
      <ListOfHotels searchTerm={searchText} />
    </section>
  );
};
