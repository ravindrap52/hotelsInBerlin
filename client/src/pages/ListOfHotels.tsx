import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  status,
  error,
  allHotels,
  getAllHotels,
} from "../features/hotels/hotelsSlice";

import { ListItems } from "../components/molecules/ListItems";
import { changeLocale } from "../features/language/languageSlice";

//TODO improve styling
export const ListOfHotels = () => {
  const dispatch = useAppDispatch();

  const hotels = useAppSelector(allHotels);
  const loadingStatus = useAppSelector(status);
  const errorMessage = useAppSelector(error);
  const locale = useAppSelector((state) => state.language.lang);
  const [defaultLocale, setDefaultLocale] = useState(locale);

  const setLocale = (event) => {
    setDefaultLocale(event.target.value);
    dispatch(changeLocale(event.target.value));
  };

  useEffect(() => {
    dispatch(getAllHotels(defaultLocale));
  }, [defaultLocale]);

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
      <label
        htmlFor="languages"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Select Language
      </label>
      <select
        id="languages"
        value={defaultLocale}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5"
        onChange={setLocale}
      >
        <option value="en-US">English</option>
        <option value="de-DE">German</option>
        <option value="fr-FR">France</option>
        <option value="es-ES">Spanish</option>
      </select>
      <div className="flex flex-wrap">{content}</div>
    </section>
  );
};
