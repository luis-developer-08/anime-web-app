import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Iframe from "react-iframe";

const AnimeIframePlayer = ({ anime, episodeId }) => {
    const [selectedQuality, setSelectedQuality] = useState("default");

    const fetchAnimeStreamLinks = async () => {
        const { data } = await axios.get(
            "https://anime-host-api.vercel.app/anime/gogoanime/watch/" +
                episodeId
        );
        return data;
    };

    const { data, isLoading } = useQuery({
        queryFn: fetchAnimeStreamLinks,
        queryKey: ["fetchAnimeStreamLinks", episodeId],
        enabled: episodeId != null,
    });

    useEffect(() => {
        if (data) {
            const availableQualities = data.sources.map(
                (source) => source.quality
            );
            if (!availableQualities.includes(selectedQuality)) {
                setSelectedQuality("720p");
            }
        }
    }, [data, selectedQuality]);

    const handleQualityChange = (event) => {
        setSelectedQuality(event.target.value);
    };

    return (
        <div>
            {episodeId ? (
                <>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            {/* Quality Selector */}
                            <div className="mb-4">
                                <label htmlFor="quality" className="mr-2">
                                    Select Quality:
                                </label>
                                <select
                                    id="quality"
                                    value={selectedQuality}
                                    onChange={handleQualityChange}
                                    className="bg-gray-200 rounded-md select-sm text-xs"
                                >
                                    {data.sources.map((source) => (
                                        <option
                                            key={source.quality}
                                            value={source.quality}
                                        >
                                            {source.quality}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Video Player with react-iframe */}
                            <Iframe
                                url={
                                    data.sources.find(
                                        (source) =>
                                            source.quality === selectedQuality
                                    ).url
                                }
                                width="100%"
                                height="500px"
                                className="mb-4"
                            />
                        </>
                    )}
                </>
            ) : (
                <Iframe
                    url={`https://www.youtube.com/embed/${anime.trailer.id}?autoplay=1`}
                    width="100%"
                    height="500px"
                    allowFullScreen
                    allow="autoplay"
                    className="mb-4"
                    title={`${
                        anime.title.english || anime.title.userPreferred
                    } Trailer`}
                />
            )}
        </div>
    );
};

export default AnimeIframePlayer;
