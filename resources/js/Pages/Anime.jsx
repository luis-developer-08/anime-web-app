import AnimeBigDetails from "@/Partials/AnimeBigDetails";
import AnimeCharacters from "@/Partials/AnimeCharacters";
import AnimeEpisodes from "@/Partials/AnimeEpisodes";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Anime = ({ animeId }) => {
    const fecthAnimeInfo = async () => {
        const { data } = await axios.get(
            "https://anime-host-api.vercel.app/meta/anilist/info/" + animeId
        );
        return data;
    };

    const { data: anime, isLoading } = useQuery({
        queryFn: fecthAnimeInfo,
        queryKey: ["fecthAnimeInfo", animeId],
    });

    // console.log(data);

    return (
        <div>
            {isLoading ? (
                <div className="grid grid-cols-5 gap-5">
                    <div className="col-span-4">
                        <AnimeBigDetails isLoading={isLoading} />
                        <div className="divider"></div>
                        <AnimeCharacters isLoading={isLoading} />
                    </div>
                    <div className="col-span-1">
                        <AnimeEpisodes isLoading={isLoading} />
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-5 gap-5">
                    <div className="col-span-4">
                        <AnimeBigDetails anime={anime} />
                        <div className="divider"></div>
                        <AnimeCharacters anime={anime} />
                    </div>
                    <div className="col-span-1">
                        <AnimeEpisodes anime={anime} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Anime;
