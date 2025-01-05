import React, { useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import TooltipCard from "@/Components/TooltipCard";

const SplideAnime = ({ category }) => {
    const loaders = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [page, setPage] = useState(1);

    const fetchAnime = async () => {
        const { data } = await axios.get(
            "https://anime-host-api.vercel.app/meta/anilist/" +
                category +
                "?page=" +
                page
        );

        return data;
    };

    const { data, isLoading } = useQuery({
        queryKey: ["fetchAnime", [category, page]],
        queryFn: fetchAnime,
    });

    return (
        <>
            <div className="flex justify-center items-center gap-5 mt-5 mb-2">
                {isLoading ? (
                    <button
                        className="btn btn-primary btn-xs uppercase"
                        disabled
                    >
                        prev
                    </button>
                ) : (
                    <>
                        {data.currentPage > 1 ? (
                            <button
                                className="btn btn-primary btn-xs uppercase"
                                onClick={() =>
                                    setPage((prevPage) => prevPage - 1)
                                }
                            >
                                prev
                            </button>
                        ) : (
                            <button
                                className="btn btn-primary btn-xs uppercase"
                                disabled
                            >
                                prev
                            </button>
                        )}
                    </>
                )}
                <h1 className="capitalize font-bold">{category}</h1>
                {isLoading ? (
                    <button
                        className="btn btn-primary btn-xs uppercase"
                        disabled
                    >
                        next
                    </button>
                ) : (
                    <>
                        {data.hasNextPage ? (
                            <button
                                className="btn btn-primary btn-xs uppercase"
                                onClick={() =>
                                    setPage((prevPage) => prevPage + 1)
                                }
                            >
                                next
                            </button>
                        ) : (
                            <button
                                className="btn btn-primary btn-xs uppercase"
                                disabled
                            >
                                next
                            </button>
                        )}
                    </>
                )}
            </div>
            <Splide
                aria-label="Anime Images"
                options={{
                    perPage: 10,
                    gap: 10,
                    arrows: false,
                    pagination: false,
                }}
            >
                {isLoading ? (
                    <>
                        {loaders.map((anime) => (
                            <SplideSlide key={anime}>
                                <div className="h-52 rounded-md">
                                    <div className="w-full h-full rounded-md shadow-md skeleton" />
                                </div>
                            </SplideSlide>
                        ))}
                    </>
                ) : (
                    <>
                        {data.results.map((anime) => (
                            <SplideSlide key={anime.id}>
                                <div className="h-52 rounded-md -z-10">
                                    <TooltipCard
                                        title={anime.userPreferred}
                                        details={anime.description}
                                    >
                                        <img
                                            src={anime.image}
                                            alt={anime.userPreferred}
                                        />
                                    </TooltipCard>
                                </div>
                            </SplideSlide>
                        ))}
                    </>
                )}
            </Splide>
        </>
    );
};

export default SplideAnime;
