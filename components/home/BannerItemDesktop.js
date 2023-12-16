"use client";
import { useLayout } from '@/hooks/useLayout';
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';
import { useIntersectionObserver, useMeasure, useMediaQuery } from '@react-hookz/web';
import React, { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';
import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import AspectRatio from '../layout/AspectRatio';
import { usepewdsflixSettings } from '@/hooks/useSettings';
import { Icons } from '../assets/Icons';

const variants = {
  inView: { opacity: 1, x: 0 },
  outView: { opacity: 0, x: 40 },
  showTrailer: { opacity: 1, scale: 0.75 },
};

const Media = ({ item, active }) => {
  const {
 
    backdropPath,
    genreIds,
    genresAnime,
    genresMovie,
    genresTv,
    id,
    mediaType,
    overview,
    posterPath,
    title,
    trailer,
    voteAverage,
  } = item;
  const {  isPlayTrailer, isFetchLogo, isShowSpotlight } = usepewdsflixSettings();
  const [isPlayed, setIsPlayed] = useState(false);

  const [movieTrailer, setMovieTrailer] = useState({});
  const [isMutedTrailer, setIsMutedTrailer] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [player, setPlayer] = useState();
  const { viewportRef } = useLayout((state) => state);

  const cardRef = useRef(null);
  const bannerIntersection = useIntersectionObserver(cardRef, { root: viewportRef });
  const mute = () => {
    if (!player) return;
    player.mute();
    setIsMutedTrailer(true);
  };
  const unMute = () => {
    if (!player) return;
    player.unMute();
    setIsMutedTrailer(false);
  };

  const play = () => {
    if (!player) return;
    player.playVideo();
    player.unMute();
  };
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseRadius = useMotionValue(0);
  // useEffect(() => {
  //   if(!player && !showTrailer) return
  //  if(player && showTrailer){
  //   play()
  //  }
  // }, [player])
  
  useEffect(() => {
    fetch(`/api//trailer?id=${id}&type=${mediaType}`)
      .then((res) => res.json())
      .then((data) => {
        const { results } = data;
        const officialTrailer = results.find((result) => result.type === 'Trailer');
        setMovieTrailer(officialTrailer);
        setTimeout(function() {
          setShowTrailer(true)
        }, 2000);
         
      });
  }, [id, mediaType, player]);
  const isSm = useMediaQuery('(max-width: 650px)', { initializeWithValue: false });
  const isMd = useMediaQuery('(max-width: 960px)', { initializeWithValue: false });
  const isLg = useMediaQuery('(max-width: 1280px)', { initializeWithValue: false });
  const [size, bannerRef] = useMeasure();
  const titleItem =
    typeof title === 'string'
      ? title
      : title?.userPreferred || title?.english || title?.romaji || title?.native;
//   useEffect(() => {
//     const handleVisibility = () => {
//       if (showTrailer && player && player.getPlayerState() === 2) {
//         play();
//       }
//     };
//     document.addEventListener('visibilitychange', handleVisibility);
//     return () => {
//       document.removeEventListener('visibilitychange', handleVisibility);
//     };
//   }, [showTrailer, player]);

  return (
    <AspectRatio ratio={16 / 8} ref={bannerRef}>
    <Card
      radius="none"
      className="h-full w-full border-0"
      ref={cardRef}
      role="figure"
      onMouseMove={isShowSpotlight.value ? handleMouseMove : undefined}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-large transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${mouseRadius}px circle at ${mouseX}px ${mouseY}px,
              hsl(var(--theme-default-400) / 15),
              transparent 80%
            )
          `,
        }}
      />
      <CardHeader className="absolute z-10 flex h-full flex-row items-end -mt-40 justify-start gap-5 md:gap-7 lg:gap-9 xl:justify-center 2xl:h-[calc(100%_-_160px)]">
        <div className="flex w-5/6 flex-col items-start justify-end    gap-4 px-10 lg:mt-32 md:w-3/4 lg:w-2/3">
          <AnimatePresence mode="popLayout">
          <motion.h1
                key="title"
                layout
                className={` max-w-md  ${showTrailer ?  "text-3xl !line-clamp-2" : "text-5xl !line-clamp-3"} font-bold`}
                animate={active ? 'inView' : 'outView'}
               
                transition={{ duration: 1,  delay: 2.5}}
                variants={variants}
              >
                {titleItem}
              </motion.h1>
        
            {!isMd && !showTrailer ? (
              <motion.p
                key="overview"
                layout
                className="!line-clamp-6 max-w-md  text-justify"
             
                animate={
                  active && !showTrailer
                    ? 'inView'
                    : active && showTrailer
                    ? 'outView'
                    : 'outView'
                }
                exit={{ opacity: 0}}
                transition={
                  active && !showTrailer
                    ? { duration: 1,delay: 2.5  }
                    : active && showTrailer
                    ? { duration: 1,delay: 2.5 }
                    : { duration: 1, delay: 2.5 }
                }
                variants={variants}
                dangerouslySetInnerHTML={{ __html: overview || '' }}
              />
            ) : null}
            <motion.div
              key="buttons"
              layout
              
              // animate={active ? 'inView' : 'outView'}
              // transition={{ duration: 0.5, delay: 0.45 }}
              variants={variants}
              className='flex gap-2'
            >
              <Button
                type="button"
                color="secondary"
                radius='sm'
                startContent={<Icons.play />}
                className="font-bold px-4"
                onPress={() =>
                  navigate(
                    `/${
                      mediaType === 'movie'
                        ? 'movies/'
                        : mediaType === 'tv'
                        ? 'tv-shows/'
                        : 'anime/'
                    }${id}/`,
                    {
                      state: { currentTime: player ? player.playerInfo.currentTime : 0 },
                    },
                  )
                }
              >
              Play
              </Button>
              <Button
                type="button"
                color="secondary"
                radius='sm'
                startContent={<Icons.info />}
                className="font-bold text-white px-4 bg-button-gray"
                onPress={() =>
                  navigate(
                    `/${
                      mediaType === 'movie'
                        ? 'movies/'
                        : mediaType === 'tv'
                        ? 'tv-shows/'
                        : 'anime/'
                    }${id}/`,
                    {
                      state: { currentTime: player ? player.playerInfo.currentTime : 0 },
                    },
                  )
                }
              >
              More Info
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
        {!isLg ? (
          <motion.div
            animate={
              active && !showTrailer ? 'inView' : active && showTrailer ? 'outView' : 'outView'
            }
            transition={{ duration: 1, ease: 'easeInOut' }}
            variants={{
              inView: { opacity: 1, scale: 1, x: 0 },
              outView: { opacity: 0, scale: 0, x: 0 },
            }}
            className="flex w-1/3 justify-center"
          >
            {/* <Image
              src={posterPath || ''}
              alt={titleItem}
              title={titleItem}
              fill={true}
            
              classNames={"h-full object-cover rounded-large shadow-xl shadow-default aspect-[2/3] w-full h-auto min-h-[auto] min-w-[auto] !max-h-[390px] !max-w-[270px] 2xl:!max-h-[477px] 2xl:!max-w-[318px]"}
              loading="eager"
              placeholder="empty"
              responsive={[
                {
                  size: {
                    width: 270,
                    height: 390,
                  },
                  maxWidth: 1400,
                },
                {
                  size: {
                    width: 318,
                    height: 477,
                  },
                },
              ]}
           
            /> */}
          </motion.div>
        ) : null}
      </CardHeader>
      <CardBody className="m-0 overflow-hidden p-0 after:absolute after:bottom-0 after:left-0 after:h-[100px] after:w-full after:bg-gradient-to-b after:from-transparent after:to-[#141414] after:content-[''] after:2xl:h-[250px]">
        <AnimatePresence>
          {!showTrailer    && size ? (
            <motion.div
              initial={{ opacity: 1, scale: 1.2, y: 40 }}
              animate={
                active ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0.3, scale: 1.2, y: 40 }
              }
              exit={{ opacity: 0, scale: 1.2, y: 40 }}
              transition={{ duration: 0, ease: 'easeIn' }}
              style={{ overflow: 'hidden' }}
            >
              <Image
                src={backdropPath || ''}
              fill={true}
                className="left-0 top-0 aspect-[2/1] object-cover opacity-30"
                decoding={active ? 'auto' : 'async'}
                loading="lazy"
                alt={titleItem}
                title={titleItem}
                placeholder="empty"
                responsive={[
                  {
                    size: {
                      width: size?.width,
                      height: size?.height,
                    },
                  },
                ]}
             
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
        {movieTrailer?.key ? (
          <YouTube
            videoId={movieTrailer.key}
            opts={{
              height: '100%',
              width: '100%',
              playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 0,
                modestbranding: 1,
                controls: 0,
                disablekb: 1,
                showinfo: 0,
                vq: 'hd720',
                branding: 0,
                rel: 0,
                autohide: 0,
                iv_load_policy: 3,
                cc_load_policy: 0,
                playsinline: 1,
                mute: 1,
                origin: 'https://pewdsflix.vercel.app',
              },
            }}
            onReady={({ target }) => {
              if (active ) target.playVideo();
              setPlayer(target);
              // if (!isMutedTrailer.value) target.unMute();
            }}
            onPlay={() => {
              setIsPlayed(true);
              setShowTrailer(false);
              // if (active && bannerIntersection?.isIntersecting) setShowTrailer(true);
            }}
            onPause={() => {
              setShowTrailer(false);
            }}
            onEnd={() => {
              setShowTrailer(false);
         
            }}
            onError={() => {
              setShowTrailer(false);
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
            className={
              showTrailer
                ? 'relative !-top-[100%] !h-[300%] !w-full overflow-hidden opacity-80 bg-red-600'
                : 'hidden'
            }
          />
        ) : null}
     
      </CardBody>
      {!isSm && showTrailer && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Button
            type="button"
            color="default"
            radius="full"
            variant="ghost"
            isIconOnly
            className="absolute bottom-48 border-white right-[85px] z-[90] h-11 w-11 cursor-pointer hover:opacity-80 2xl:bottom-[200px]"
            aria-label="Toggle Mute"
            onPress={isMutedTrailer ? unMute : mute}
          >
            {isMutedTrailer ? (
                <Icons.volumeX />
            ) : (
          <Icons.volume />
            )}
          </Button>
        </motion.div>
      )}
    </Card>
  </AspectRatio>
  );
};

export default Media;
