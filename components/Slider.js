"use client";


import { useEffect, useRef, useState } from 'react';
import { Swiper as SwiperReact, SwiperSlide , useSwiper} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Button } from '@nextui-org/react';
import { useMediaQuery } from '@react-hookz/web';

import { Autoplay, Pagination, Thumbs } from 'swiper';
import { usepewdsflixSettings } from '@/hooks/useSettings';

const SliderBanner = ({items}) => {
    const isXl = useMediaQuery('(max-width: 1400px)');
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

  const swiperRef = useRef(null);
// console.log(item)
  const handlePrevClick = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNextClick = () => {
    swiperRef.current?.slideNext();
  };

  const { isPlayTrailer } = usepewdsflixSettings();

//   useEffect(() => {
//     if (
//       autoplayProgressRef.current &&
//       autoplayProgressRef.current.firstChild &&
//       autoplayProgressRef.current.lastChild
//     ) {
//       // @ts-ignore
//       autoplayProgressRef.current.firstChild.style.setProperty('--progress', 1);
//       autoplayProgressRef.current.lastChild.textContent = '';
//     }
//     if (progressRef.current) progressRef.current.style.setProperty('width', '0%');
//   }, [isPlayTrailer.value, isXl]);
 
  return (
    <div>
         <SwiperReact
            modules={[Thumbs, Pagination, Autoplay]}
            grabCursor
            spaceBetween={20}
            slidesPerView={1.15}
            centeredSlides
            thumbs={isXl ? undefined : { swiper: thumbsSwiper, multipleActiveThumbs: false }}
            loop
            pagination={{
              enabled: true,
              dynamicBullets: true,
              dynamicMainBullets: 3,
            }}
            breakpoints={{
              650: {
                spaceBetween: 0,
                slidesPerView: 1,
                pagination: {
                  enabled: true,
                  dynamicBullets: true,
                },
              },
              1400: {
                spaceBetween: 0,
                slidesPerView: 1,
                pagination: {
                  enabled: false,
                  dynamicBullets: true,
                },
              },
            }}
            autoplay={{
              delay: 8000,
              disableOnInteraction: false,
            }}
            style={{ width: '100%' }}
            onAutoplayTimeLeft={(_, timeLeft, percentage) => {
              if (
                autoplayProgressRef.current &&
                autoplayProgressRef.current.firstChild &&
                autoplayProgressRef.current.lastChild
              ) {
                // @ts-ignore
                autoplayProgressRef.current.firstChild.style.setProperty(
                  '--progress',
                  1 - percentage,
                );
                autoplayProgressRef.current.lastChild.textContent = `${Math.ceil(timeLeft / 1000)}`;
              }
              if (progressRef.current) {
                progressRef.current.style.setProperty(
                  'width',
                  `${(Math.abs(percentage) % 1) * 100}%`,
                );
              }
            }}
            onActiveIndexChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
          >
            {items.map((item, index) => (
              <SwiperSlide
                key={`${item.id}-${index}-banner`}
                virtualIndex={index}
                style={{ width: '100%' }}
              >
                {({ isActive }) => (
                <>hi</>
                )}
              </SwiperSlide>
            ))}
            {/* <CustomNavigation slot="container-end" ref={autoplayProgressRef} /> */}
          </SwiperReact>
        
    </div>
  );
};

export default SliderBanner;
