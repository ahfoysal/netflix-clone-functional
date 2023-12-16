import { getListDiscover, getListMovies, getTrending, getWatchEpisode } from "@/server/TMDB/Server"
import BannerItemDesktop from "./BannerItemDesktop";
import Trending from "./Trending";
import { Toaster } from "react-hot-toast";


const Home = async () => {
  const getId = (id) => {
    const idArr = id.split('-');
    return idArr[idArr.length - 1];
  };
  const trending = await getTrending('all', 'day', undefined, 1)
  const popularMovie = await   getListMovies('popular', undefined, 1)
  const popularTv = await getListDiscover(      'tv',
  undefined,
  undefined,
  undefined,
  1,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  100,)
  const randomIndex = Math.floor(Math.random() * trending?.items?.length);
  const randomItem = trending?.items[randomIndex];
  return (
    <div>
          <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
      {/* <SliderBanner items={trending?.items} /> */}
        <div className="">
        <BannerItemDesktop active={true} item={randomItem} />
          <div className="-m-[10%] container overflow-hidden mx-auto">
          <Trending title={"Trending Now"} items={trending.items} />
          <Trending title={"Popular Movies"} items={popularMovie.items} />
          <Trending title={"Popular Tv shows"} items={popularTv.items} />
          {/* <Trending title={"Popular Anime"} items={trending.items} /> */}
    
          </div>
     
        </div>
    </div>

  )
}

export default Home