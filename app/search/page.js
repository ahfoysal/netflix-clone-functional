import SearchPage from "@/components/Search/SearchPage";
import { getSearchTvShows } from "@/server/TMDB/Server";

export default async function  Page({
    params,
    searchParams,
  }) {

    const {q} =searchParams
  
    const results =  await getSearchTvShows(q, 1, undefined)
    // console.log(results)
    return  <div className="min-h-screen pt-24 container mx-auto ">
    {q}
    <SearchPage items={results} />
    </div>;
  }