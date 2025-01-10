import { router } from "@inertiajs/react";
import React from "react";

const AnimeReccomendations = ({ anime, isLoading }) => {
    const onSelectedAnime = (animeId) => {
        router.visit("/anime/" + animeId);
    };

    return (
        <div className="mb-10">
            <h1 className="text-lg font-bold">Recommended Anime</h1>
            <div className="mt-4 h-[70vh] overflow-y-auto overflow-x-hidden">
                {isLoading ? (
                    // Skeleton loader for anime recommendations
                    Array.from({ length: 5 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex h-20 items-center rounded-md bg-slate-300 shadow-md mb-4 animate-pulse"
                        >
                            <div className="w-20 h-20 bg-slate-400 rounded-l-md"></div>
                            <div className="ml-4 flex-1">
                                <div className="h-3 bg-slate-500 w-3/5 mb-2 rounded"></div>
                                <div className="h-2 bg-slate-400 w-5/6 mb-2 rounded"></div>
                                <div className="h-2 bg-slate-400 w-5/6 mb-2 rounded"></div>
                            </div>
                        </div>
                    ))
                ) : anime?.recommendations?.length > 0 ? (
                    anime.recommendations.map((recommendedAnime) => (
                        <div
                            key={recommendedAnime.id}
                            onClick={() => onSelectedAnime(recommendedAnime.id)}
                            className="flex h-20 items-center rounded-md bg-slate-300 shadow-md mb-4 hover:scale-y-105 transition-transform duration-200 ease-out hover:cursor-pointer"
                        >
                            <img
                                src={recommendedAnime.image}
                                alt={
                                    recommendedAnime.title?.userPreferred ||
                                    "Anime"
                                }
                                className="h-full w-16 object-cover bg-white mr-4 rounded-s-md"
                            />
                            <div>
                                <h2 className="font-bold text-xs">
                                    {recommendedAnime.title?.userPreferred.slice(
                                        0,
                                        20
                                    ) + "..." || "Unknown Title"}
                                </h2>
                                <p className="text-xs font-extralight text-gray-500">
                                    {recommendedAnime.status ||
                                        "Status Unknown"}
                                </p>
                                <p className="text-xs font-extralight">
                                    Episodes:{" "}
                                    {recommendedAnime.episodes ?? "N/A"}
                                </p>
                                <p className="text-xs font-extralight">
                                    Rating:{" "}
                                    {recommendedAnime.rating
                                        ? `${recommendedAnime.rating}%`
                                        : "N/A"}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">
                        No recommendations available.
                    </p>
                )}
            </div>
        </div>
    );
};

export default AnimeReccomendations;
