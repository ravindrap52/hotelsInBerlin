import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { changeLocale } from "../../features/language/languageSlice";

export const DropDown = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.language.lang);
  const [defaultLocale, setDefaultLocale] = useState(locale);

  const setLocale = (event) => {
    setDefaultLocale(event.target.value);
    dispatch(changeLocale(event.target.value));
  };

  return (
    <select
      id="languages"
      value={defaultLocale}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5"
      onChange={setLocale}
    >
      <option value="en-US">English</option>
      <option value="de-DE">German</option>
      <option value="fr-FR">France</option>
      <option value="es-ES">Spanish</option>
    </select>
  );
};
