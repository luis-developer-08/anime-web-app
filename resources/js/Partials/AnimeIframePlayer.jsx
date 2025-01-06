import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player"; // Import ReactPlayer

const AnimeIframePlayer = ({ anime, episodeId }) => {
    const [selectedQuality, setSelectedQuality] = useState("720p");

    const fetchAnimeStreamLinks = async () => {
        const { data } = await axios.get(
            "https://anime-host-api.vercel.app/meta/anilist/watch/" + episodeId
        );
        return data;
    };

    const { data, isLoading } = useQuery({
        queryFn: fetchAnimeStreamLinks,
        queryKey: ["fetchAnimeStreamLinks", episodeId],
        enabled: episodeId != null ? true : false,
    });

    useEffect(() => {
        // Default to 720p if data is loaded
        if (data) {
            const availableQualities = data.sources.map(
                (source) => source.quality
            );
            if (!availableQualities.includes(selectedQuality)) {
                setSelectedQuality("720p"); // fallback to 720p if the selected quality is not available
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
                        <p>Loading...</p> // Show loading text
                    ) : (
                        <>
                            {/* Quality Selector */}

                            {/* Video Player with React Player */}
                            <ReactPlayer
                                url={
                                    data.sources.find(
                                        (source) =>
                                            source.quality === selectedQuality
                                    ).url
                                }
                                width="100%"
                                height="500px"
                                controls
                                playing
                                className="mb-4"
                            />

                            <div className="mb-4">
                                <label htmlFor="quality" className="mr-2">
                                    Select Quality:
                                </label>
                                <select
                                    id="quality"
                                    value={selectedQuality}
                                    onChange={handleQualityChange}
                                    className="bg-gray-2001 rounded-md select-sm text-xs"
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
                        </>
                    )}
                </>
            ) : (
                // Use ReactPlayer for trailer playback
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${anime.trailer.id}?autoplay=1`}
                    width="100%"
                    height="500px"
                    controls
                    playing
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
