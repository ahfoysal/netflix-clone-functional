import VideoPlayer from "@/components/player/PLYR";
import { getWatchEpisode } from "@/server/TMDB/Server";
import Loading from "../loading";




export default async function  Page({
    params,
    searchParams,
  }) {

    const {type, id, episodeId} =searchParams
    const episodeData = await getWatchEpisode(id, episodeId)
    console.log(episodeData)

    console.log(type, id, episodeId)
    if(!episodeData)return <Loading />
    return  <div className="min-h-screen bg-black">
      <VideoPlayer src={episodeData?.sources[episodeData?.sources?.length - 1]?.url} ts={300}  sub={episodeData?.subtitles} title={"test"}/>
    </div>;
  }