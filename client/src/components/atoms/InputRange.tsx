import { FC, useState } from "react";

interface InputRange {
  min: number;
  max: number;
  getDistanceValue: (param1: number, param2: number) => void;
  label: string;
}

export const InputRange: FC<InputRange> = ({
  min,
  max,
  getDistanceValue,
  label,
}): JSX.Element => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  const setRangeValue = (event) => {
    const value = Math.min(event.target.value);
    console.log(value);
    setMinVal(value);
    // passing range values to the parent component
    getDistanceValue(value, maxVal);
  };
  return (
    <>
      <label
        htmlFor={label}
        className="m-2 inline-block text-neutral-700 dark:text-neutral-200"
      >
        {label}
      </label>
      <input
        type="range"
        id={label}
        min={min}
        max={max}
        value={minVal}
        onChange={setRangeValue}
        className="transparent h-1.5 w-[15%] cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
      />
      <p className="ml-2">Distance with in {minVal}</p>
    </>
  );
};
