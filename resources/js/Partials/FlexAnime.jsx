import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import React, { Fragment, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AnimeDetails from "@/Components/AnimeDetails";

const FlexAnime = ({ category }) => {
    const loaders = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [page, setPage] = useState(1);
    const [hoveredAnime, setHoveredAnime] = useState(null);

    const fetchAnime = async () => {
        const { data } = await axios.get(
            `https://anime-host-api.vercel.app/meta/anilist/${category}?page=${page}`
        );
        return data;
    };

    const { data, isLoading } = useQuery({
        queryKey: ["fetchAnime", [category, page]],
        queryFn: fetchAnime,
    });

    return (
        <>
            <div className="flex justify-between items-center gap-5 mt-5 mb-2">
                <div className="flex items-center gap-5">
                    {isLoading ? (
                        <button
                            className="btn bg-slate-500 btn-xs uppercase"
                            disabled
                        >
                            <GrPrevious />
                        </button>
                    ) : (
                        <>
                            {data.currentPage > 1 ? (
                                <button
                                    className="btn bg-slate-500 btn-xs uppercase"
                                    onClick={() =>
                                        setPage((prevPage) => prevPage - 1)
                                    }
                                >
                                    <GrPrevious />
                                </button>
                            ) : (
                                <button
                                    className="btn bg-slate-500 btn-xs uppercase"
                                    disabled
                                >
                                    <GrPrevious />
                                </button>
                            )}
                        </>
                    )}
                    <h1 className="capitalize font-bold">{category}</h1>
                    {isLoading ? (
                        <button
                            className="btn bg-slate-500 btn-xs uppercase"
                            disabled
                        >
                            <GrNext />
                        </button>
                    ) : (
                        <>
                            {data.hasNextPage ? (
                                <button
                                    className="btn bg-slate-500 btn-xs uppercase"
                                    onClick={() =>
                                        setPage((prevPage) => prevPage + 1)
                                    }
                                >
                                    <GrNext />
                                </button>
                            ) : (
                                <button
                                    className="btn bg-slate-500 btn-xs uppercase"
                                    disabled
                                >
                                    <GrNext />
                                </button>
                            )}
                        </>
                    )}
                </div>
                <div>
                    <h1 className="capitalize font-bold">Page: {page}</h1>
                </div>
            </div>

            <div className="flex gap-5 justify-center">
                {isLoading
                    ? loaders.map((anime) => (
                          <div className="h-52 w-full rounded-md" key={anime}>
                              <div className="w-full h-full rounded-md shadow-lg shadow-black skeleton" />
                          </div>
                      ))
                    : data.results.map((anime, index) => (
                          <div
                              key={anime.id}
                              className="relative h-52 rounded-md cursor-pointer"
                              onMouseEnter={() => setHoveredAnime(anime)}
                              onMouseLeave={() => setHoveredAnime(null)}
                          >
                              <img
                                  src={anime.image}
                                  alt={anime.title.userPreferred}
                                  className="w-full h-full rounded-md shadow-lg shadow-black hover:scale-105 transition-transform duration-300 ease-out"
                              />
                              {hoveredAnime?.id === anime.id && (
                                  <AnimeDetails
                                      anime={anime}
                                      index={index}
                                      data={data}
                                      hoveredAnime={hoveredAnime}
                                  />
                              )}
                          </div>
                      ))}
            </div>
        </>
    );
};

export default FlexAnime;
