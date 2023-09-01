import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface IImageSlider {
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageSlider({ isOpen, onClose }: IImageSlider) {
  if (!isOpen) {
    return null;
  }
  const crossSvg = (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="5.35364"
        y="7.96802"
        width="3.375"
        height="18"
        rx="1.6875"
        transform="rotate(-45 5.35364 7.96802)"
        fill="#333333"
      />
      <rect
        x="5.35754"
        y="18.3113"
        width="18"
        height="3.375"
        rx="1.6875"
        transform="rotate(-45 5.35754 18.3113)"
        fill="#333333"
      />
    </svg>
  );
  return (
    <div className="absolute inset-0 z-50 h-full w-full bg-primary">
      <div className="bg-white relative flex h-full w-full justify-center rounded-lg p-20">
        <div className="flex items-center justify-center">
          <Swiper
            navigation
            pagination={{
              clickable: true,
            }}
            loop
            modules={[Navigation, Pagination]}
            className="flex h-full items-center justify-center"
          >
            <SwiperSlide className="mb-10 max-h-3/4">
              <img className="mx-auto mb-10 h-[70%] w-[70%]" src="src/assets/img/sushi.png" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="mx-auto mb-10 h-[70%] w-[70%]" src="src/assets/img/sushi.png" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="mx-auto mb-10 h-[70%] w-[70%]" src="src/assets/img/sushi.png" alt="" />
            </SwiperSlide>
          </Swiper>
          <button
            type="button"
            className="absolute left-[30px] top-[30px] z-[51] flex h-10 w-10 items-center justify-center rounded-full border-text-dark bg-inactive-icons-grey text-3xl"
            onClick={onClose}
          >
            {crossSvg}
          </button>
        </div>
      </div>
    </div>
  );
}
