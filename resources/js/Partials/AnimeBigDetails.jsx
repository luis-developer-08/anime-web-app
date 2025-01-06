import { MdPeopleAlt } from "react-icons/md";
import { GrStar } from "react-icons/gr";
import React from "react";

const AnimeBigDetails = ({ anime, isLoading }) => {
    return (
        <div className="grid grid-cols-5 gap-5">
            {isLoading ? (
                <>
                    <div className="col-span-1">
                        <div className="w-full h-[50vh] rounded-md skeleton"></div>
                    </div>

                    <div className="col-span-4">
                        <div className="h-8 w-1/2 mx-auto rounded-md skeleton"></div>
                        <div className="mt-5 space-y-4">
                            <div className="h-4 w-full rounded-md skeleton"></div>
                            <div className="h-4 w-5/6 rounded-md skeleton"></div>
                            <div className="h-4 w-3/4 rounded-md skeleton"></div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="col-span-1">
                        <img
                            onClick={() => onSelectedAnime(anime.id)}
                            src={anime.image}
                            alt={anime.title.userPreferred}
                            className="w-full h-[50vh] rounded-md shadow-lg shadow-black object-cover"
                        />
                    </div>
                    <div className="col-span-4">
                        <h1 className="font-bold text-xl text-center">
                            {anime.title.english || anime.title.userPreferred}
                        </h1>

                        <div
                            className="text-md font-thin mt-5 text-justify"
                            dangerouslySetInnerHTML={{
                                __html: anime.description,
                            }}
                        />

                        <div className="flex justify-between mt-5 items-center">
                            <div className="flex gap-1">
                                Genre(s):{" "}
                                {anime.genres.map((genre) => (
                                    <div className="bg-slate-300 py-1 px-2 text-xs rounded-md">
                                        {genre}
                                    </div>
                                ))}
                            </div>
                            <div className="p-1 flex gap-1">
                                <div>Status:</div>
                                <div className="flex items-center gap-1">
                                    {anime.status}
                                </div>
                            </div>
                        </div>

                        <div className="mt-5">
                            <div className="p-1 flex gap-1">
                                <div>Rating:</div>
                                <div className="flex items-center gap-1">
                                    {anime.rating}
                                    <GrStar size={20} />
                                </div>
                            </div>
                            <div className="p-1 flex gap-1">
                                <div>Popularity:</div>
                                <div className="flex items-center gap-1">
                                    {anime.popularity}
                                    <MdPeopleAlt size={20} />
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
