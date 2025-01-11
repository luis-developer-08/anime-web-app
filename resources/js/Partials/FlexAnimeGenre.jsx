import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AnimeDetails from "@/Components/AnimeDetails";
import { router } from "@inertiajs/react";
import useBreakpoints from "@/Hooks/useBreakpoints";

const FlexAnimeGenre = ({ genre }) => {
    const { isMobile, isTablet, isDesktop } = useBreakpoints();

    const loaders = isTablet
        ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        : isMobile
        ? [1, 2, 3, 4, 5, 6, 7, 8, 9]
        : [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24,
          ];

    const [page, setPage] = useState(1);
    const [hoveredAnime, setHoveredAnime] = useState(null);

    const fetchAnime = async () => {
        const { data } = await axios.get(
            import.meta.env.VITE_API_ANIME_1 +
                `/meta/anilist/advanced-search?genres=["${genre}"]&page=${page}&perPage=${
                    isTablet ? "15" : isMobile ? "9" : "24"
                }`
        );
        return data;
    };

    const { data, isLoading } = useQuery({
        queryKey: ["fetchAnime", [genre, page]],
        queryFn: fetchAnime,
    });

    const onSelectedAnime = (animeId) => {
        router.visit("/anime/" + animeId);
    };

    return (
        <div className="mb-10">
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
                    <h1 className="capitalize font-bold text-xs lg:text-md">
                        {genre}
                    </h1>
                    {isLoading ? (
                        <button
                            className="btn bg-slate-500 btn-xs uppercase"
                            disabled
                        >
                            <GrNext size={8} />
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
                                    <GrNext size={8} />
                                </button>
                            ) : (
                                <button
                                    className="btn bg-slate-500 btn-xs uppercase"
                                    disabled
                                >
                                    <GrNext size={8} />
                                </button>
                            )}
                        </>
                    )}
                </div>
                <div>
                    <h1 className="capitalize font-bold text-xs lg:text-md">
                        Page: {page}
                    </h1>
                </div>
            </div>

            <div
                className={`grid ${
                    isTablet
                        ? "grid-cols-5"
                        : isMobile
                        ? "grid-cols-3"
                        : "grid-cols-8"
                }  gap-1 lg:gap-5 justify-center`}
            >
                {isLoading
                    ? loaders.map((anime) => (
                          <div
                              className="h-32 lg:h-52 w-full rounded-sm"
                              key={anime}
                          >
                              <div className="w-full h-full rounded-sm lg:shadow-lg shadow-black skeleton bg-slate-400" />
                          </div>
                      ))
                    : data.results.map((anime, index) => (
                          <div
                              key={anime.id}
                              className="relative h-32 lg:h-52  rounded-sm cursor-pointer"
                              {...(isDesktop
                                  ? {
                                        onMouseEnter: () =>
                                            setHoveredAnime(anime),
                                        onMouseLeave: () =>
                                            setHoveredAnime(null),
                                    }
                                  : {})}
                          >
                              <img
                                  onClick={() => onSelectedAnime(anime.id)}
                                  src={anime.image}
                                  alt={anime.title.userPreferred}
                                  className="w-full h-full rounded-sm lg:shadow-lg shadow-black lg:hover:scale-125 lg:hover:z-10 transition-transform duration-300 ease-out relative"
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
        </div>
    );
};

export default FlexAnimeGenre;
