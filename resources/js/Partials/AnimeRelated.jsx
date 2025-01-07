import { router } from "@inertiajs/react";
import React from "react";

const AnimeRelated = ({ anime, isLoading }) => {
    const onSelectedAnime = (animeId) => {
        router.visit("/anime/" + animeId);
    };

    return (
        <div>
            <h1 className="text-lg font-bold">Related Anime</h1>
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
                ) : anime?.relations?.length > 0 ? (
                    anime.relations.map((relatedAnime) => (
                        <div
                            key={relatedAnime.id}
                            onClick={() => onSelectedAnime(relatedAnime.id)}
                            className="flex h-20 items-center rounded-md bg-slate-300 shadow-md mb-4 hover:scale-y-105 transition-transform duration-200 ease-out hover:cursor-pointer"
                        >
                            <img
                                src={relatedAnime.image}
                                alt={
                                    relatedAnime.title?.userPreferred || "Anime"
                                }
                                className="h-full w-16 object-cover bg-white mr-4 rounded-s-md"
                            />
                            <div>
                                <h2 className="font-bold text-xs">
                                    {relatedAnime.title?.userPreferred ||
                                        "Unknown Title"}
                                </h2>
                                <p className="text-xs font-extralight text-gray-500">
                                    {relatedAnime.status || "Status Unknown"}
                                </p>
                                <p className="text-xs font-extralight">
                                    Episodes: {relatedAnime.episodes ?? "N/A"}
                                </p>
                                <p className="text-xs font-extralight">
                                    Rating:{" "}
                                    {relatedAnime.rating
                                        ? `${relatedAnime.rating}%`
                                        : "N/A"}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">
                        No related anime available.
                    </p>
                )}
            </div>
        </div>
    );
};

export default AnimeRelated;
