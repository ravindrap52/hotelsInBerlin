import { FC, useState, useRef } from "react";

interface IInput {
  //  getPriceRange: (param1: number, param2: number) => number;
  label: string;
  minValue: number;
  maxValue: number;
  getPriceValue: (param1: number, param2: number) => void;
}

export const Input: FC<IInput> = ({
  label,
  minValue,
  maxValue,
  getPriceValue,
}): JSX.Element => {
  /* getting elements ref */
  const minPriceValue = useRef(null);
  const maxPriceValue = useRef(null);

  const [minPrice, setMinPrice] = useState(minValue);
  const [maxPrice, setMaxPrice] = useState(maxValue);

  const setPriceValue = () => {
    const price_min = minPriceValue.current;
    const price_max = maxPriceValue.current;
    setMinPrice(price_min.value);
    setMaxPrice(price_max.value);
    getPriceValue(price_min.value, price_max.value);
  };
  return (
    <>
      <label
        htmlFor={label}
        className="m-2 inline-block text-neutral-700 dark:text-neutral-200"
      >
        {label}
      </label>
      <div>
        <input
          type="text"
          id={label}
          ref={minPriceValue}
          defaultValue={minPrice}
          onBlur={setPriceValue}
          className="block min-h-[auto] w-full rounded border-2"
        />
      </div>
      <span>–</span>
      <div>
        <input
          type="text"
          id="t"
          ref={maxPriceValue}
          defaultValue={maxPrice}
          onBlur={setPriceValue}
          className="block min-h-[auto] w-full rounded border-2"
        />
      </div>
    </>
  );
};
