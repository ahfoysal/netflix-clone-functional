"use client";
import { isMobile } from 'react-device-detect';
import { FreeMode, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { tv } from 'tailwind-variants';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import { Card, CardBody, CardFooter, Link, useDisclosure } from '@nextui-org/react';
import { useMeasure } from '@react-hookz/web';
import ItemModal from './Modal';
import { useEffect, useReducer, useRef, useState } from 'react';
import { Icons } from '../assets/Icons';




const swiperSlideStyles = tv({
  variants: {
    cardType: {
      coverCard: '!w-[290px] sm:!w-[490px]',
      card: '!w-[168px] sm:!w-[190px] md:!w-[210px] lg:!w-[250px] xl:!w-[270px]',
      peopleCard: '!w-[168px]',
    },
  },
});



const MediaListCard = ({items, title}) => {

  const [size, imageRef] = useMeasure();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [swiper, setSwiper] = useState(null);
  const [activeItem, setActiveItem] = useState({});
  const swiperRef = useRef(null);


  const [, forceUpdate] = useReducer((x) => x + 1, 0); 

  const handleNext = () => {
    swiperRef.current?.slideNext();
    forceUpdate();
  };

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
    forceUpdate();
  };

  // useEffect(() => {
  //   if (swiper) {
  //     swiper.on('reachBeginning', () => {
  //       forceUpdate();
  //     });

  //     swiper.on('reachEnd', () => {
  //       // Hide the next arrow when reaching the last slide
  //       forceUpdate();
  //     });
  //   }
  // }, [swiper]);

  const handleModal = (item) => {
    setActiveItem(item);
    onOpen()
  }
  return (
    <div className="flex flex-col w-full group items-start justify-center relative">
      {items && items?.length > 0 ? (
        <>
          <h1 className="z-10 text-xl font-bold ">{title}</h1>
          <div
  className={`absolute left-0 w-10  rounded0-r-md hidden arrows hover:bg-dark-transparent h-48 text-white z-10 cursor-pointer ${
    swiper?.isBeginning ? 'hidden' : 'group-hover:flex'
  }`}
  onClick={handlePrev}
>
  <div className='w-full h-full flex justify-center items-center'>
    <Icons.back />
  </div>
</div>
<div
  className={`absolute right-0 w-10 rounded-l-md hidden  hover:bg-dark-transparent h-48 text-white z-10 cursor-pointer ${
    swiper?.isEnd ? 'hidden' : 'group-hover:flex'
  }`}
  onClick={handleNext}
>
  <div className='w-full h-full flex justify-center items-center'>
    <Icons.next />
  </div>
</div>

          <Swiper
            className={"w-full h [&_.swiper-wrapper]:m-[0_0_1.5rem_1px] relative group"}
            navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
            draggable={false}
            freeMode={false}
            spaceBetween={10}
            slidesPerView="auto"
            allowTouchMove={false}
            slidesPerGroup={1}
            slidesPerGroupAuto
            onSwiper={(swiper) => {
              setSwiper(swiper);
              swiperRef.current = swiper;
            }}
          >
              
            {items &&
              items.map((item, index) => {
                return (
                  <SwiperSlide
                    key={`${item.id}-${index}-card-`}
                    className={swiperSlideStyles({
                      cardType: item?.mediaType === 'people' ? 'peopleCard' : 'card',
                    })}
                  >
                    <Card
                      isHoverable
                      isPressable
                      className={`my-4 p-0`}
                      role="button"
                    >
                      <CardBody
                        onPress={() => handleModal(item)}
                        ref={imageRef}
                        as={Link}
                        to="/"
                        className="p-0"
                      >
                        {size ? (
                          <Image
                            src={item?.posterPath}
                            height={300}
                            width={300}
                            alt={"titleItem"}
                            title={item.title}
                            placeholder="empty"
                            loading="lazy"
                            
                            className="h-full w-full"
                            responsive={[
                              {
                                size: {
                                  width: Math.round(size?.width),
                                  height: Math.round(size?.height),
                                },
                              },
                            ]}
                          />
                        ) : null}
                      </CardBody>
                    </Card>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </>
      ) : null}
                          <ItemModal setActiveItem={setActiveItem} item={activeItem} active={true}  isOpen={isOpen} onOpenChange={onOpenChange} />

    </div>
  );
};

export default MediaListCard;
