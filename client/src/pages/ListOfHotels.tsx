import { FC, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  status,
  error,
  allHotels,
  getAllHotels,
  searchtHotelByHotelName,
  hotelFound,
  searchStatus,
  applyFiters,
  applyFilters,
} from "../features/hotels/hotelsSlice";

import { ListItems } from "../components/molecules/ListItems";
import { ISearchHotel } from "../features/hotels/responseInterface";
import { InputRange } from "../components/atoms/InputRange";
import { Input } from "../components/atoms/input";
import { isStringEmpty } from "../app/helpers";

export const ListOfHotels: FC<ISearchHotel> = ({ searchTerm }) => {
  const dispatch = useAppDispatch();
  // get language from store
  const locale = useAppSelector((state) => state.language.lang);

  // dispatching action types.
  useEffect(() => {
    dispatch(getAllHotels(locale));
  }, [locale]);

  useEffect(() => {
    if (searchTerm) {
      dispatch(searchtHotelByHotelName({ searchTerm, locale }));
    }
  }, [searchTerm]);

  // get all hotels from store
  const listOfHotels = useAppSelector(allHotels);

  // get serched hotel
  const serachedHotel = useAppSelector(hotelFound);
  const searchLoadingStatus = useAppSelector(searchStatus);

  // status from the store useful to show spinner etc..
  const loadingStatus = useAppSelector(status);
  const errorMessage = useAppSelector(error);

  /* toggling and storing filter values */
  const [showFilter, setShowFilter] = useState(false);
  // this is required to check if the filter need to apply on page load
  const [applyFilter, setApplyFilter] = useState(false);
  const [distanceFilter, setDistanceFilter] = useState({
    minDistance: 0,
    maxDistance: 5,
  });
  const [priceFilter, setPriceFilter] = useState({
    minPrice: 200,
    maxPrice: 400,
  });
  const toggleFilter = () => setShowFilter(!showFilter);

  const getDistanceRange = (min: number, max: number) => {
    setDistanceFilter({ minDistance: min, maxDistance: max });
  };

  const getPriceRange = (min: number, max: number) => {
    setPriceFilter({ minPrice: min, maxPrice: max });
  };
  const ApplyFilter = () => {
    setApplyFilter(!applyFilter);
  };

  let hotel = null;
  if (!isStringEmpty(searchTerm) && searchLoadingStatus === "succeeded") {
    hotel = serachedHotel.result ? (
      serachedHotel.result.map((hotel) => (
        <ListItems key={hotel.id} item={hotel} />
      ))
    ) : (
      <p>{serachedHotel.error}</p>
    );
  } else if (loadingStatus === "succeeded") {
    const allHotels = applyFilter
      ? applyFilters(listOfHotels.result, { distanceFilter, priceFilter })
      : listOfHotels.result;
    hotel = allHotels.map((hotel) => <ListItems key={hotel.id} item={hotel} />);
  }
  return (
    <div className="flex flex-col">
      <div className="m-4">
        <button
          type="button"
          className="inline-block rounded border-2 border-primary px-6 pt-2 pb-[6px] text-xs font-medium uppercase"
          onClick={toggleFilter}
        >
          Show Filters
        </button>
        {showFilter && (
          <>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <InputRange
                  min={0}
                  max={5}
                  getDistanceValue={getDistanceRange}
                  label="Distance"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                <Input
                  label="Price"
                  minValue={priceFilter.minPrice}
                  maxValue={priceFilter.maxPrice}
                  getPriceValue={getPriceRange}
                />
              </div>
            </div>
            <button
              type="button"
              className="inline-block rounded border-2 border-primary px-6 pt-2 pb-[6px] text-xs font-medium uppercase"
              onClick={ApplyFilter}
            >
              Apply Filters
            </button>
          </>
        )}
      </div>
      <div className="flex  flex-wrap">{hotel}</div>
    </div>
  );
};
