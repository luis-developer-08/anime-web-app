import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Iframe from "react-iframe";

const AnimeIframePlayer = ({ anime, episodeId }) => {
    const fetchAnimeStreamLinks = async () => {
        const { data } = await axios.get(
            `https://api-anime-taupe.vercel.app/anime/gogoanime/watch/${episodeId}`
        );
        return data;
    };

    const { data, isLoading } = useQuery({
        queryFn: fetchAnimeStreamLinks,
        queryKey: ["fetchAnimeStreamLinks", episodeId],
        enabled: !!episodeId,
    });

    return (
        <div style={{ position: "relative", width: "100%" }}>
            {episodeId ? (
                <>
                    {isLoading ? (
                        // Loader overlay with DaisyUI spinner
                        <div
                            style={{
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "600px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                zIndex: 10,
                            }}
                        >
                            <span className="loading loading-spinner loading-lg text-white"></span>
                        </div>
                    ) : (
                        <Iframe
                            url={data.headers.Referer}
                            width="100%"
                            height="600px"
                            allowFullScreen
                            allow="autoplay"
                            position="relative"
                        />
                    )}
                </>
            ) : (
                <>
                    {anime.trailer && anime.trailer.id ? (
                        <Iframe
                            url={`https://www.youtube.com/embed/${anime.trailer.id}?autoplay=1`}
                            width="100%"
                            height="600px"
                            allowFullScreen
                            allow="autoplay"
                            title={`${
                                anime.title.english || anime.title.userPreferred
                            } Trailer`}
                        />
                    ) : (
                        <></>
                    )}
                </>
            )}
        </div>
    );
};

export default AnimeIframePlayer;
