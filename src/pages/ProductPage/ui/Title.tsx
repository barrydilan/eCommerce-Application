import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

interface ITitleProps {
  imgList: string[];
  name: string;
  children: React.ReactElement;
  onClick: () => void;
}

function Title({ imgList, name, children, onClick }: ITitleProps) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={onClick} className="m-w-768px relative h-fit max-h-[320px] md:max-h-[400px]">
      <Swiper
        id="miniSwiper"
        loop
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="h-68 pb-0 md:h-96"
      >
        {imgList.map((image) => (
          <SwiperSlide key={image}>
            <img className="h-full w-full object-cover md:rounded-t-2xl" src={image} alt={name} />
          </SwiperSlide>
        ))}
      </Swiper>
      {children}
    </div>
  );
}

export default Title;
