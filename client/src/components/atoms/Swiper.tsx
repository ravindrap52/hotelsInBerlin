import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/swiper.css";

export default function ImageGallery() {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      <SwiperSlide>
        <img
          className="w-full"
          src="https://rt-hotel-images-prod.s3.amazonaws.com/2384_IcePortal_0_thumb.jpg"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="w-full"
          src="https://rt-hotel-images-prod.s3.amazonaws.com/2384_IcePortal_0_thumb.jpg"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="w-full"
          src="https://rt-hotel-images-prod.s3.amazonaws.com/2384_IcePortal_0_thumb.jpg"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="w-full"
          src="https://rt-hotel-images-prod.s3.amazonaws.com/2384_IcePortal_0_thumb.jpg"
          alt=""
        />
      </SwiperSlide>
      ...
    </Swiper>
  );
}
