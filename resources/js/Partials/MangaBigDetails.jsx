import { MdPeopleAlt } from "react-icons/md";
import { GrStar } from "react-icons/gr";
import React from "react";

const MangaBigDetails = ({ manga, isLoading }) => {
    return (
        <div className="grid grid-cols-5 gap-5">
            {isLoading ? (
                <>
                    <div className="col-span-1">
                        <div className="w-full h-[50vh] rounded-md skeleton bg-slate-300"></div>
                    </div>

                    <div className="col-span-4">
                        <div className="h-8 w-1/2 mx-auto rounded-md skeleton bg-slate-300"></div>
                        <div className="mt-5">
                            <div className="h-4 w-full rounded-md skeleton bg-slate-300 mt-2"></div>
                            <div className="h-4 w-5/6 rounded-md skeleton bg-slate-300 mt-2"></div>
                            <div className="h-4 w-5/6 rounded-md skeleton bg-slate-300 mt-2"></div>
                            <div className="h-4 w-5/6 rounded-md skeleton bg-slate-300 mt-2"></div>
                            <div className="h-4 w-3/4 rounded-md skeleton bg-slate-300 mt-2"></div>
                            <div className="flex justify-between mt-10">
                                <div className="h-4 w-1/4 rounded-md skeleton bg-slate-300"></div>
                                <div className="h-4 w-1/4 rounded-md skeleton bg-slate-300"></div>
                            </div>

                            <div className="h-4 w-1/6 rounded-md skeleton bg-slate-300 mt-10"></div>
                            <div className="h-4 w-1/6 rounded-md skeleton bg-slate-300 mt-2"></div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="col-span-1">
                        <img
                            onClick={() => onSelectedmanga(manga.id)}
                            src={manga.image}
                            alt={manga.title}
                            className="w-full h-[50vh] rounded-md shadow-lg shadow-black object-cover"
                        />
                    </div>
                    <div className="col-span-4">
                        <h1 className="font-bold text-xl text-center">
                            {manga.title}
                        </h1>

                        <div
                            className="text-md font-thin mt-5 text-justify"
                            dangerouslySetInnerHTML={{
                                __html: manga.description.en,
                            }}
                        />

                        <div className="flex justify-between mt-5 items-center">
                            <div className="flex gap-1">
                                Genre(s):{" "}
                                {manga.genres.map((genre) => (
                                    <div className="bg-slate-300 py-1 px-2 text-xs rounded-md">
                                        {genre}
                                    </div>
                                ))}
                            </div>
                            <div className="p-1 flex gap-1">
                                <div>Status:</div>
                                <div className="flex items-center gap-1">
                                    {manga.status}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default MangaBigDetails;
