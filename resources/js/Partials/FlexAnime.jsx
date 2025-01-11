import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import React, { Fragment, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AnimeDetails from "@/Components/AnimeDetails";
import { router } from "@inertiajs/react";
import useBreakpoints from "@/Hooks/useBreakpoints";

const FlexAnime = ({ category }) => {
    const { isMobile, isTablet, isDesktop } = useBreakpoints();

    const loaders = isMobile
        ? [1, 2, 3]
        : isTablet
        ? [1, 2, 3, 4, 5]
        : [1, 2, 3, 4, 5, 6, 7, 8];
    const [page, setPage] = useState(1);
    const [hoveredAnime, setHoveredAnime] = useState(null);

    const fetchAnime = async () => {
        const { data } = await axios.get(
            import.meta.env.VITE_API_ANIME_2 +
                `/meta/anilist/${category}?page=${page}&perPage=${
                    isMobile ? "3" : isTablet ? "5" : "8"
                }`
        );
        return data;
    };

    const { data, isLoading } = useQuery({
        queryKey: ["fetchAnime", [category, page]],
        queryFn: fetchAnime,
    });

    const onSelectedAnime = (animeId) => {
        router.visit("/anime/" + animeId);
    };

    return (
        <div className="mb-2 lg:mb-10">
            <div className="flex justify-between items-center gap-5 mt-5 mb-2">
                <div className="flex items-center gap-5">
                    {isLoading ? (
                        <button
                            className="btn bg-slate-500 btn-xs uppercase"
                            disabled
                        >
                            <GrPrevious size={8} />
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
                                    <GrPrevious size={8} />
                                </button>
                            ) : (
                                <button
                                    className="btn bg-slate-500 btn-xs uppercase"
                                    disabled
                                >
                                    <GrPrevious size={8} />
                                </button>
                            )}
                        </>
                    )}
                    <h1 className="capitalize font-bold text-xs lg:text-md">
                        {category}
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

            <div className="flex gap-1 lg:gap-5">
                {isLoading
                    ? loaders.map((anime) => (
                          <div
                              key={anime}
                              className={`w-full ${
                                  isMobile ? "h-36" : isTablet ? "h-72" : "h-72"
                              } rounded-sm cursor-pointer`}
                          >
                              <div
                                  key={anime}
                                  className={`${
                                      isMobile
                                          ? "h-36"
                                          : isTablet
                                          ? "h-72"
                                          : "h-72"
                                  } rounded-sm lg:shadow-lg shadow-black skeleton bg-slate-400`}
                              />
                          </div>
                      ))
                    : data.results.map((anime, index) => (
                          <div
                              key={anime.id}
                              className={`relative w-full ${
                                  isMobile ? "h-36" : isTablet ? "h-72" : "h-72"
                              } rounded-sm cursor-pointer`}
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
                                  className={`object-cover w-full h-full rounded-sm lg:shadow-lg shadow-black lg:hover:scale-125 transition-transform duration-300 ease-out relative`}
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

export default FlexAnime;
