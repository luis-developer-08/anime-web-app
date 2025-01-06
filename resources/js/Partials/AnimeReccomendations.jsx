import { router } from "@inertiajs/react";
import React from "react";

const AnimeReccomendations = ({ anime, isLoading }) => {
    const onSelectedAnime = (animeId) => {
        router.visit("/anime/" + animeId);
    };

    return (
        <div>
            <h1 className="text-lg font-bold">Anime You Might Like</h1>
            <div className="mt-4">
                {isLoading
                    ? // Skeleton loader for anime recommendations
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
                    : anime.recommendations.map((anime) => (
                          <div
                              key={anime.id}
                              onClick={() => onSelectedAnime(anime.id)}
                              className="flex h-20 items-center rounded-md bg-slate-300 shadow-md mb-4 hover:scale-105 transition-transform duration-300 ease-in hover:cursor-pointer"
                          >
                              <img
                                  src={anime.image}
                                  alt={anime.title.userPreferred}
                                  className="h-full object-cover mr-4 rounded-s-md"
                              />
                              <div>
                                  <h2 className="font-bold text-xs">
                                      {anime.title.userPreferred}
                                  </h2>
                                  <p className="text-xs font-extralight text-gray-500">
                                      {anime.status}
                                  </p>
                                  <p className="text-xs font-extralight">
                                      Episodes: {anime.episodes}
                                  </p>
                                  <p className="text-xs font-extralight">
                                      Rating: {anime.rating}%
                                  </p>
                              </div>
                          </div>
                      ))}
            </div>
        </div>
    );
};

export default AnimeReccomendations;
