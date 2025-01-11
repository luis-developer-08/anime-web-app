import { MdPeopleAlt } from "react-icons/md";
import { GrStar } from "react-icons/gr";
import React from "react";

const AnimeBigDetails = ({ anime, isLoading }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {isLoading ? (
                <>
                    <div className="col-span-1">
                        <div className="w-full h-32 sm:h-48 lg:h-[50vh] rounded-sm skeleton bg-slate-300"></div>
                    </div>

                    <div className="col-span-1 sm:col-span-1 lg:col-span-4">
                        <div className="h-6 sm:h-8 lg:h-10 w-1/2 mx-auto rounded-md skeleton bg-slate-300"></div>
                        <div className="mt-5 space-y-3">
                            <div className="h-4 w-full rounded-md skeleton bg-slate-300"></div>
                            <div className="h-4 w-5/6 rounded-md skeleton bg-slate-300"></div>
                            <div className="h-4 w-5/6 rounded-md skeleton bg-slate-300"></div>
                            <div className="h-4 w-5/6 rounded-md skeleton bg-slate-300"></div>
                            <div className="h-4 w-3/4 rounded-md skeleton bg-slate-300"></div>

                            <div className="flex justify-between space-x-3 mt-5">
                                <div className="h-4 w-1/4 rounded-md skeleton bg-slate-300"></div>
                                <div className="h-4 w-1/4 rounded-md skeleton bg-slate-300"></div>
                            </div>

                            <div className="h-4 w-1/6 rounded-md skeleton bg-slate-300 mt-5"></div>
                            <div className="h-4 w-1/6 rounded-md skeleton bg-slate-300 mt-2"></div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="col-span-1 sm:col-span-1 lg:col-span-1">
                        <img
                            onClick={() => onSelectedAnime(anime.id)}
                            src={anime.image}
                            alt={anime.title.userPreferred}
                            className="w-full h-36 sm:h-48 lg:h-[50vh] rounded-sm lg:shadow-lg shadow-black object-cover"
                        />
                    </div>
                    <div className="col-span-1 sm:col-span-1 lg:col-span-4">
                        <h1 className="font-bold text-xs sm:text-sm lg:text-xl text-center">
                            {anime.title.english || anime.title.userPreferred}
                        </h1>

                        <div
                            className="text-xs sm:text-sm lg:text-md font-extralight mt-5 text-justify"
                            dangerouslySetInnerHTML={{
                                __html: anime.description,
                            }}
                        />

                        <div className="lg:flex lg:justify-between mt-5 items-center">
                            <div className="flex flex-wrap gap-1 text-xs sm:text-sm lg:text-md">
                                Genre(s):{" "}
                                {anime.genres.map((genre) => (
                                    <div
                                        key={genre}
                                        className="lg:bg-slate-300 lg:py-1 lg:px-2 text-xs rounded-md"
                                    >
                                        {genre},
                                    </div>
                                ))}
                            </div>
                            <div className="lg:p-1 flex gap-1 text-xs sm:text-sm lg:text-md">
                                <div>Status:</div>
                                <div className="flex items-center gap-1">
                                    {anime.status}
                                </div>
                            </div>
                        </div>

                        <div className="mt-5">
                            <div className="lg:p-1 flex gap-1 text-xs sm:text-sm lg:text-md">
                                <div>Rating:</div>
                                <div className="flex items-center gap-1">
                                    {anime.rating ? anime.rating : 0}
                                    <GrStar
                                        size={20}
                                        className="text-yellow-500"
                                    />
                                </div>
                            </div>
                            <div className="lg:p-1 flex gap-1 text-xs sm:text-sm lg:text-md">
                                <div>Popularity:</div>
                                <div className="flex items-center gap-1">
                                    {anime.popularity
                                        ? anime.popularity.toLocaleString()
                                        : "N/A"}
                                    <MdPeopleAlt
                                        size={20}
                                        className="text-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AnimeBigDetails;
