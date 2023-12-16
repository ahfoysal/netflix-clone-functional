
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Card, CardHeader, CardBody, Spacer, Select, SelectItem} from "@nextui-org/react";
import AspectRatio from "../layout/AspectRatio";
import { useIntersectionObserver, useMeasure, useMediaQuery } from '@react-hookz/web';
import Image from 'next/image';
import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from 'framer-motion';

import YouTube from 'react-youtube';
import { Icons } from "../assets/Icons";
import { usepewdsflixSettings } from "@/hooks/useSettings";
import { useEffect, useRef, useState } from "react";
import { useLayout } from "@/hooks/useLayout";
import TMDB from "@/server/TMDB/Utils";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const variants = {
  inView: { opacity: 1, x: 0 },
  outView: { opacity: 0, x: 40 },
  showTrailer: { opacity: 1, scale: 0.75 },
};

export default function ItemModal({isOpen, onOpen, onOpenChange, item = {}, active = true,setActiveItem }) {
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
  const [isLoading, setIsLoading] = useState(false);
  const [season, setSeason] = useState("1");

  const [movieTrailer, setMovieTrailer] = useState({});
  const [info, setInfo] = useState({});
  const [isMutedTrailer, setIsMutedTrailer] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [player, setPlayer] = useState();
  const { viewportRef } = useLayout((state) => state);
const router = useRouter()
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
    if(!item.title) {
      return
    }else{
      fetch(`/api/trailer?id=${id}&type=${mediaType}`)
      .then((res) => res.json())
      .then((data) => {
        const { results } = data;
        const officialTrailer = results.find((result) => result.type === 'Trailer');
        setMovieTrailer(officialTrailer);
        setTimeout(function() {
          setShowTrailer(true)
        }, 4000);
         
      });
    }

  }, [id, mediaType, player, item]);
  useEffect(() => {
    const fetchData = async () => {
      
       fetch(`/api/detail?id=${id}&type=${mediaType}&season=${season}`)
      .then((res) => res.json())
      .then((data) => {
console.log(data)    
setInfo(data)
      });
    
    };  if(!item.title) {
      return
    }else{

    fetchData(); }
  }, [id, item,season, mediaType]);
  useEffect(() => {
    document.body.style.cursor = 'default';

    const fetchData = async () => {
      
       fetch(`/api/provider?id=${id}&type=${mediaType}&season=${season}&episode=1`)
      .then((res) => res.json())
      .then((data) => {
console.log(data)    

      });
    
    };  if(!item.title) {
      return
    }else{

    fetchData(); }
  }, [id, item,season, mediaType]);
  const isSm = useMediaQuery('(max-width: 650px)', { initializeWithValue: false });
  const isMd = useMediaQuery('(max-width: 960px)', { initializeWithValue: false });
  const isLg = useMediaQuery('(max-width: 1280px)', { initializeWithValue: false });
  const [size, bannerRef] = useMeasure();
  const titleItem =
    typeof title === 'string'
      ? title
      : title?.userPreferred || title?.english || title?.romaji || title?.native;

      const handleClose = (onClose) => {
        if(isLoading) return
        onClose()
        setActiveItem(
        {}
        )
        setIsPlayed(false)
        setIsMutedTrailer(true)
        setMovieTrailer(null)
        setInfo({})
        setIsLoading(false)
        setShowTrailer(false)
        console.log("closed")
        setSeason("1")
      }
      const handleSelectEpisode = (index) => {
        // Change cursor to "wait" during loading
        document.body.style.cursor = 'wait';
      
        console.log(index);
        const toastId = toast.loading('Loading...',{duration: 20000}); // Show loading toast
        setIsLoading(true)
        fetch(`/api/provider?id=${id}&type=${mediaType}&season=${season}&episode=${index + 1}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(toastId);
            toast.dismiss(toastId); // Dismiss loading toast
            setIsLoading(false);
            // Process fetched data here
            if(data.episodeId === undefined){
              return toast.error("We dont have this show right now.")
            }
            router.push(`/watch?id=${data.id}&type=${mediaType}&episodeId=${data.episodeId}${mediaType === "tv" ? "&season="+season : ""}`)
            // Restore cursor to default once fetch is complete
            document.body.style.cursor = 'default';
          })
          .catch((error) => {
            console.error('Error:', error);
            setIsLoading(false);
            // Dismiss loading toast in case of an error
            toast.dismiss(toastId);
      
            // Handle the error (e.g., show an error message)
            toast.error('An error occurred. Please try again.');
      
            // Restore cursor to default in case of an error
            document.body.style.cursor = 'default';
          });
      };
      
      if(!item?.title) {
        return <></>
      }
  return (
    <>
      
      <Modal 
        backdrop="opaque" 
        size="4xl"
        scrollBehavior={"outside"}
      isDismissable={!isLoading}
        isOpen={isOpen} 
      radius="md"
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          }
        }}
        classNames={{
          base: "rounded-md",
          wrapper: "rounded-md",
      

        }}
      >
        <ModalContent   className=" p-0 z-[90] bg-transparent rounded-md overflow-hidden" >
          {(onClose) => (
            <>
        <ModalBody  className="p-0 bg-[#181818] rounded-md overflow-hidden no-scrollbar" >
             <AspectRatio ratio={16 / 8} ref={bannerRef}>
    <Card
      radius="md"
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
      <CardHeader className="absolute z-10 flex h-full flex-row items-end -mt-20 justify-start gap-5 md:gap-7 lg:gap-9 xl:justify-center 2xl:h-[calc(100%_-_160px)]">
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
                isLoading={isLoading}
                startContent={<Icons.play className={`${isLoading && "hidden"}`} />}
                className="font-bold px-4"
                onPress={() =>
                  handleSelectEpisode(0)
                }
              >
              Play
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
      <CardBody className="m-0 overflow-hidden p-0 after:absolute after:bottom-0 after:left-0 after:h-[100px]  after:w-full after:bg-gradient-to-b after:from-transparent after:to-[#141414] after:content-[''] after:2xl:h-[250px]">
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
            className="absolute bottom-20 border-gray-600 right-[85px] z-[90] h-11 w-11 cursor-pointer hover:opacity-80 2xl:bottom-[200px]"
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

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Button
            type="button"
            color="default"
            radius="full"
            variant="ghost"
            isIconOnly
            className="absolute top-3 border-transparent bg-[#181818] right-3 z-[90] h-11 w-11 cursor-pointer hover:opacity-80 2xl:bottom-[200px]"
            aria-label="Toggle Mute"
            onPress={()=> handleClose(onClose)}
          >
           
          <Icons.close />
           
          </Button>
        </motion.div>

    </Card>
  </AspectRatio>
              
 {mediaType === "tv"  &&          <div className="w-[90%] mb-8 mx-auto">
              <div className="flex justify-between"><h1 className="text-2xl font-bold">Episodes </h1>
         {info?.seasons &&     <Select
           classNames={{
          
            value: "text-lg font-medium",
            selectorIcon: "text-lg h-5 w-5",
            trigger: " border border-[#404040]"
           }}
           size="sm"
           onChange={(e)=> setSeason(e.target.value)}
          aria-label="idex"
          defaultSelectedKeys={["1"]}
           disallowEmptySelection
            radius="sm"
              placeholder="Select a season"
              className="max-w-[160px] text-lg font-medium  "
         
            > 
              {info?.seasons?.filter((season) => !season?.name?.includes('Specials'))
.map((season, index) => (
                <SelectItem aria-label="idex" key={index+1} value={index} classNames={{
                  title: "text-lg font-medium"
                }}>
                  {season.name} 
                </SelectItem>
              ))}
            </Select>}
              </div>
              <h1 className="font-bold text-base">
                {info?.seasonData?.name}: <span className="text-xs">{info?.genres?.map((item) => item?.name).join(', ')}</span>
              </h1>
              {info?.seasonData?.episodes?.map((episode, index) =>
          <div key={episode.id}>
          <Card
            isHoverable
            shadow="none"
            radius="sm"
            isPressable
            className={`!max-h-[127px] mt-4 bg-transparent ${ isLoading && "cursor-wait"} border-b-1 border-[#404040] overflow-hidden w-full  p-4`}
            onPress={() => handleSelectEpisode(index)}
          >
            <CardBody className="flex flex-row overflow-hidden flex-nowrap justify-start p-0">
              <div className="flex-none flex-grow-0 flex-shrink-0 w-fit flex justify-start items-center">
                    <h1 className="font-bold text-2xl px-4">       {episode?.episode_number
 || episode?.number}  </h1>
              </div>
              {mediaType === 'tv' &&
                (episode?.still_path ? (
               <div className="flex-none flex-grow-0 flex-shrink-0 w-18">
                   <Image
                    src={TMDB.posterUrl(episode?.still_path, 'w342')}
                    width={150}
                 
                  height={84}
                    isZoomed
                    radius="lg"
                    loading="lazy"
                 
                    alt={episode?.name || ''}
                    title={episode?.name || ''}
                 
                    placeholder="empty"
                   
                    responsive={[
                      {
                        size: {
                          width: 227,
                          height: 127,
                        },
                      },
                    ]}
                  />
               </div>
                ) : (
                  <div className="z-0 flex aspect-[16/9] min-h-[125px] min-w-[227px] items-center justify-center rounded-large bg-default">
                    {/* <PhotoIcon width={36} height={36} /> */}
                  </div>
                ))}
          
              <div className="flex flex-col justify-around gap-y-1  pl-4">
                    <div className="flex justify-between">
                    <h5 className="line-clamp-1 font-bold ">
              {episode?.name}
                
                </h5>
                    <h5 className="line-clamp-1 font-medium ">
                    {episode?.runtime}  min
                
                </h5>

                    </div>
                {mediaType === 'tv' && !isSm && (
                  <>
                    {/* <div className="flex items-center gap-x-4">
                      <h5>
                        {episode.air_date} | {episode?.runtime}  min
                      </h5>
                    </div> */}
                    <h6 className="!line-clamp-2 text-sm text-[#d2d2d2]">{episode.overview}</h6>
                  </>
                )}
                {mediaType === 'anime' && !isSm && episode.description && (
                  <h6 className="!line-clamp-2">{episode.description}</h6>
                )}
              </div>
            </CardBody>
          </Card>
          <Spacer y={5} />
        </div>
          )}
            </div>}
        </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
