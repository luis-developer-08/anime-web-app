import NextAiringEpisode from "@/Components/NextAiringEpisode";
import AnimeBigDetails from "@/Partials/AnimeBigDetails";
import AnimeCharacters from "@/Partials/AnimeCharacters";
import AnimeEpisodes from "@/Partials/AnimeEpisodes";
import AnimeIframePlayer from "@/Partials/AnimeIframePlayer";
import AnimeReccomendations from "@/Partials/AnimeReccomendations";
import AnimeRelated from "@/Partials/AnimeRelated";
import { Head } from "@inertiajs/react";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const Anime = ({ animeId }) => {
    const [episodeId, setEpisodeId] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const fetchedEpisodeId = urlParams.get("episodeId");
        if (fetchedEpisodeId) {
            setEpisodeId(fetchedEpisodeId);
        }
    }, []);

    const fetchAnimeInfo = async () => {
        const { data } = await axios.get(
            "https://anime-host-api.vercel.app/meta/anilist/info/" + animeId
        );
        return data;
    };

    const { data: anime, isLoading } = useQuery({
        queryFn: fetchAnimeInfo,
        queryKey: ["fetchAnimeInfo", animeId],
    });

    return (
        <div>
            {isLoading ? (
                <></>
            ) : (
                <Head
                    title={anime.title.userPreferred || anime.title.english}
                />
            )}

            {isLoading ? (
                <div className="grid grid-cols-5 gap-5">
                    <div className="col-span-4">
                        <div className="mb-4 px-10">
                            <AnimeIframePlayer
                                isLoadingAnimeIframePlayer={isLoading}
                            />
                        </div>
                        <div className="divider"></div>
                        <AnimeBigDetails isLoading={isLoading} />
                        <div className="divider"></div>
                        <AnimeCharacters isLoading={isLoading} />
                    </div>
                    <div className="col-span-1">
                        <AnimeEpisodes isLoading={isLoading} />
                        <AnimeReccomendations isLoading={isLoading} />
                        <AnimeRelated isLoading={isLoading} />
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-5 gap-5">
                    <div className="col-span-4">
                        <div className="mb-4 px-10">
                            {episodeId ? (
                                <AnimeIframePlayer episodeId={episodeId} />
                            ) : (
                                <AnimeIframePlayer anime={anime} />
                            )}
                        </div>
                        <div className="divider"></div>
                        <AnimeBigDetails anime={anime} />
                        <div className="divider"></div>
                        <AnimeCharacters anime={anime} />
                    </div>
                    <div className="col-span-1">
                        {anime.nextAiringEpisode ? (
                            <NextAiringEpisode
                                nextAiringEpisode={anime.nextAiringEpisode}
                            />
                        ) : (
                            <></>
                        )}
                        <AnimeEpisodes anime={anime} episodeId={episodeId} />
                        <AnimeReccomendations anime={anime} />
                        <AnimeRelated anime={anime} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Anime;
