import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/swiper.css";
import { FC } from "react";

interface IImages {
  images: Array<{ [key: string]: string }>;
}

export const ImageGallery: FC<IImages> = ({ images }): JSX.Element => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {images.map((image, index) => {
        return (
          <SwiperSlide key={index}>
            <img className="w-full" src={image.url} alt={image.caption} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
