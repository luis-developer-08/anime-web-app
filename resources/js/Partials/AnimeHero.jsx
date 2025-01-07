import { router } from "@inertiajs/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AnimeHero = () => {
    const fetchAnime = async () => {
        const { data } = await axios.get(
            `https://anime-host-api.vercel.app/meta/anilist/trending?page=1&perPage=10`
        );
        return data.results;
    };

    const { data, isLoading } = useQuery({
        queryKey: ["fetchAnime"],
        queryFn: fetchAnime,
    });

    const onSelectedAnime = (animeId) => {
        router.visit("/anime/" + animeId);
    };

    if (isLoading) {
        return <div className="text-center text-white">Loading...</div>;
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
    };

    return (
        <div className="absolute w-full h-screen top-0">
            <Slider {...settings} className="h-full">
                {data.map((anime) => (
                    <div key={anime.id} className="relative w-full h-screen">
                        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
                        {/* Trailer */}
                        {anime.trailer && anime.trailer.site === "youtube" ? (
                            <iframe
                                className="absolute inset-0 w-full h-full object-cover z-0"
                                src={`https://www.youtube.com/embed/${anime.trailer.id}?autoplay=1&mute=1&loop=1&playlist=${anime.trailer.id}&controls=0&modestbranding=1&rel=0&showinfo=0`}
                                title={anime.title.romaji}
                                frameBorder="0"
                                allow="autoplay; fullscreen"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <img
                                src={anime.image}
                                alt={anime.title.romaji}
                                className="absolute inset-0 w-full h-full object-cover z-0"
                            />
                        )}

                        {/* Overlay Content */}
                        <div className="relative z-20 flex flex-col justify-center items-center h-full text-white w-full">
                            <div className="flex justify-between gap-5 items-center px-20 w-full">
                                <img
                                    src={anime.image}
                                    alt={anime.title.romaji}
                                    className="h-80 object-cover z-0 rounded-md shadow-xl shadow-white"
                                />
                                <div className="text-right ps-20 ">
                                    <h1 className="text-4xl font-bold mb-7">
                                        {anime.title.english ||
                                            anime.title.romaji}
                                    </h1>
                                    <div
                                        className="text-sm text-wrap"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                anime.description?.slice(
                                                    0,
                                                    500
                                                ) + "...",
                                        }}
                                    />
                                    <button
                                        onClick={() =>
                                            onSelectedAnime(anime.id)
                                        }
                                        className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-lg text-lg mt-20 btn-wide"
                                    >
                                        Watch
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default AnimeHero;
