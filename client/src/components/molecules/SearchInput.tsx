import { FC } from "react";

interface ISearchInput {
  searchValue: string;
  setSearchValue(name: string): void;
}
export const SearchInput: FC<ISearchInput> = ({
  searchValue,
  setSearchValue,
}): JSX.Element => {
  return (
    <input
      className="shadow appearance-none border rounded w-2/4 m-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      type="text"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      placeholder="Search by hotel name"
    />
  );
};
