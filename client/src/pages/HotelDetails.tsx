import { useParams } from "react-router-dom";
import { ImageGallery } from "../components/atoms/Swiper";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getHotelByHotelID,
  hotel,
  status,
} from "../features/hotels/hotelsSlice";
import { useEffect } from "react";

const defaultDescritopn =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.";

export const HotelDetails = (): JSX.Element => {
  const { hotelId } = useParams();
  const dispatch = useAppDispatch();

  const { result } = useAppSelector(hotel);
  const loadingStatus = useAppSelector(status);
  const locale = useAppSelector((state) => state.language.lang);

  useEffect(() => {
    dispatch(getHotelByHotelID({ hotelId, locale }));
  }, []);

  return (
    <section>
      {result && (
        <article className="max-w-3xl rounded overflow-hidden shadow-lg m-4">
          <ImageGallery images={result[0].images} />
          <div className="px-6 py-4">
            <p className="font-bold text-xl mb-2">{result[0].name}</p>
            <p className="font-bold text-xl mb-2">{result[0].address}</p>
            <p className="text-gray-700 text-base">
              {result[0].description || defaultDescritopn}
            </p>
            <p className="font-bold text-xl mb-2">
              {result[0].deals[0]?.headline}
            </p>
            <p className="font-bold text-xl mb-2">
              {result[0].deals[0]?.details}
            </p>
          </div>
        </article>
      )}
    </section>
  );
};
