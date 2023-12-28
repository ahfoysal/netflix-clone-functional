import VideoPlayer from "@/components/player/PLYR";
import Loading from "../../loading";
import { getWatchEpisode } from "@/server/TMDB/Server";

export default async function Page({
  params,
  searchParams,
}) {
  try {
    const { type, id, episodeId } = searchParams;
    const episodeData = await getWatchEpisode(id, episodeId);
    
    console.log(episodeData);
    console.log(type, id, episodeId);

    if (!episodeData) return <Loading />;

    return (
      <div className="min-h-screen bg-black">
        <VideoPlayer
          src={episodeData?.sources[episodeData?.sources?.length - 1]?.url}
          ts={300}
          sub={episodeData?.subtitles}
          title={"test"}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching episode data:", error);
    // Handle the error or render an error message component
    return <div>Something Went Wrong.Please Try Again Later.</div>;
  }
}
