import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

interface ITitleProps {
  imgList: string[];
  name: string;
  children: React.ReactElement;
  onClick: () => void;
}

function Title({ imgList, name, children, onClick }: ITitleProps) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={onClick} className="relative h-full max-h-[320px] md:max-h-[400px]">
      <Swiper id="miniSwiper" className="h-full pb-0">
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
