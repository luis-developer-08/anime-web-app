import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import DramaDetails from "@/Components/DramaDetails";

const FlexFlixHQ = ({ category }) => {
    const loaders = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [page, setPage] = useState(1);
    const [hoveredDrama, setHoveredDrama] = useState(null);

    const fetchDrama = async () => {
        const { data } = await axios.get(
            `https://anime-host-api.vercel.app/movies/dramacool/${category}?page=${page}`
        );
        return data;
    };

    const { data, isLoading } = useQuery({
        queryKey: ["fetchDrama", [category, page]],
        queryFn: fetchDrama,
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

            <div className="grid grid-cols-10 gap-5 justify-center">
                {isLoading
                    ? loaders.map((anime) => (
                          <div className="h-52 rounded-md" key={anime}>
                              <div className="w-full h-full rounded-md shadow-lg shadow-black skeleton" />
                          </div>
                      ))
                    : data.results.map((drama, index) => (
                          <div
                              key={drama.id}
                              className="relative h-52 rounded-md cursor-pointer"
                              onMouseEnter={() => setHoveredDrama(drama)}
                              onMouseLeave={() => setHoveredDrama(null)}
                          >
                              <img
                                  src={drama.image}
                                  alt={drama.title}
                                  className="w-full h-full rounded-md shadow-lg shadow-black hover:scale-105 transition-transform duration-300 ease-out"
                              />
                              {hoveredDrama?.id === drama.id && (
                                  <DramaDetails
                                      drama={drama}
                                      index={index}
                                      data={data}
                                      hoveredDrama={hoveredDrama}
                                  />
                              )}
                          </div>
                      ))}
            </div>
        </>
    );
};

export default FlexFlixHQ;
