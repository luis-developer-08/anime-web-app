import NextAiringEpisode from "@/Components/NextAiringEpisode";
import useBreakpoints from "@/Hooks/useBreakpoints";
import AnimeBigDetails from "@/Partials/AnimeBigDetails";
import AnimeCharacters from "@/Partials/AnimeCharacters";
import AnimeComment from "@/Partials/AnimeComment";
import AnimeEpisodes from "@/Partials/AnimeEpisodes";
import AnimeIframePlayer from "@/Partials/AnimeIframePlayer";
import AnimeReccomendations from "@/Partials/AnimeReccomendations";
import AnimeRecentEpisodes from "@/Partials/AnimeRecentEpisodes";
import AnimeRelated from "@/Partials/AnimeRelated";
import { Head } from "@inertiajs/react";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const Anime = ({ animeId }) => {
    const { isMobile, isTablet, isDesktop } = useBreakpoints();

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
            import.meta.env.VITE_API_ANIME_1 + "/meta/anilist/info/" + animeId
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

            <div className="lg:px-20">
                {isLoading ? (
                    <div className="grid lg:grid-cols-5 gap-5">
                        <div className="lg:col-span-4">
                            <div
                                className={`lg:mb-4 lg:px-10 ${
                                    isMobile ? "fixed top-12 w-full" : ""
                                }`}
                            >
                                <AnimeIframePlayer
                                    isLoadingAnimeIframePlayer={isLoading}
                                />
                            </div>
                            <div
                                className={`px-3  ${
                                    isMobile ? "mt-[40vh]" : ""
                                }`}
                            >
                                <div className="divider"></div>
                                <AnimeBigDetails isLoading={isLoading} />
                                <div className="divider"></div>
                                <AnimeCharacters isLoading={isLoading} />
                            </div>
                        </div>
                        {isDesktop ? (
                            <div className="col-span-1">
                                <AnimeEpisodes isLoading={isLoading} />
                                <AnimeReccomendations isLoading={isLoading} />
                                <AnimeRelated isLoading={isLoading} />
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-5 gap-5">
                        <div className="col-span-5 lg:col-span-4">
                            <div
                                className={`lg:mb-4 lg:px-10 ${
                                    isMobile ? "fixed top-12 w-full z-40" : ""
                                }`}
                            >
                                {episodeId ? (
                                    <AnimeIframePlayer episodeId={episodeId} />
                                ) : (
                                    <AnimeIframePlayer anime={anime} />
                                )}
                            </div>
                            <div
                                className={`px-3 ${
                                    isMobile ? "mt-[40vh]" : ""
                                }`}
                            >
                                {isMobile ? (
                                    <AnimeEpisodes
                                        anime={anime}
                                        episodeId={episodeId}
                                    />
                                ) : (
                                    <></>
                                )}

                                <div className="divider"></div>
                                <AnimeComment />
                                <div className="divider"></div>
                                <AnimeBigDetails anime={anime} />
                                <div className="divider"></div>
                                <AnimeCharacters anime={anime} />
                            </div>
                        </div>
                        {isDesktop ? (
                            <div className="col-span-1">
                                {anime.nextAiringEpisode ? (
                                    <NextAiringEpisode
                                        nextAiringEpisode={
                                            anime.nextAiringEpisode
                                        }
                                    />
                                ) : (
                                    <></>
                                )}
                                <AnimeEpisodes
                                    anime={anime}
                                    episodeId={episodeId}
                                />
                                <AnimeReccomendations anime={anime} />
                                <AnimeRelated anime={anime} />
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Anime;
