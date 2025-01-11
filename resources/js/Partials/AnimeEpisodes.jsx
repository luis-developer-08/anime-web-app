import { router } from "@inertiajs/react";
import React, { useState, useEffect } from "react";

const AnimeEpisodes = ({ anime = {}, isLoading, episodeId }) => {
    const episodes = anime.episodes || [];

    const chunkArray = (array, size) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    };

    const groupedEpisodes = isLoading ? [] : chunkArray(episodes, 100);

    const currentEpisodeIndex = episodes.findIndex(
        (episode) => episode.id === episodeId
    );

    const currentGroupIndex = Math.floor(currentEpisodeIndex / 100);

    const [expandedGroup, setExpandedGroup] = useState(
        currentGroupIndex >= 0 ? currentGroupIndex : null
    );

    const [manualToggle, setManualToggle] = useState(false);

    const onSelectedAnimeEpisode = (newEpisodeId) => {
        router.visit(`/anime/${anime.id}?episodeId=${newEpisodeId}`);
    };

    const handlePrev = () => {
        if (currentEpisodeIndex > 0) {
            const prevEpisodeId = episodes[currentEpisodeIndex - 1].id;
            onSelectedAnimeEpisode(prevEpisodeId);
        }
    };

    const handleNext = () => {
        if (
            currentEpisodeIndex >= 0 &&
            currentEpisodeIndex < episodes.length - 1
        ) {
            const nextEpisodeId = episodes[currentEpisodeIndex + 1].id;
            onSelectedAnimeEpisode(nextEpisodeId);
        }
    };

    const toggleGroup = (groupIndex) => {
        setExpandedGroup((prevGroup) =>
            prevGroup === groupIndex ? null : groupIndex
        );
        setManualToggle(true); // Mark manual toggling
    };

    useEffect(() => {
        // Auto-open group when episodeId changes, unless manually toggled
        if (!manualToggle) {
            if (episodeId === null) {
                // Open the first group (1-100) if episodeId is null
                setExpandedGroup(0);
            } else if (currentGroupIndex >= 0) {
                setExpandedGroup(currentGroupIndex);
            }
        }
    }, [episodeId, currentGroupIndex, manualToggle]);

    useEffect(() => {
        // Reset manual toggle when episodeId changes
        setManualToggle(false);
    }, [episodeId]);

    return (
        <div className="mb-5">
            <div className="flex justify-between items-center">
                <h1 className="text-xs lg:text-lg font-bold">Episodes</h1>
                <div className="join">
                    <button
                        onClick={handlePrev}
                        className="join-item btn btn-xs bg-slate-300 border-0"
                        disabled={currentEpisodeIndex <= 0}
                    >
                        Prev
                    </button>
                    <input
                        type="text"
                        className="input-xs join-item input w-12"
                        value={currentEpisodeIndex + 1} // Show as 1-based index
                        disabled
                    />
                    <button
                        onClick={handleNext}
                        className="join-item btn btn-xs bg-slate-300 border-0"
                        disabled={
                            currentEpisodeIndex === -1 ||
                            currentEpisodeIndex >= episodes.length - 1
                        }
                    >
                        Next
                    </button>
                </div>
            </div>
            <div className="mt-4 h-[40vh] overflow-y-auto">
                {isLoading ? (
                    <div className="flex flex-wrap justify-center gap-2">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <div
                                key={index}
                                className="w-16 h-8 rounded-md skeleton bg-slate-300"
                            ></div>
                        ))}
                    </div>
                ) : episodes.length > 0 ? (
                    groupedEpisodes.map((group, groupIndex) => (
                        <div
                            key={groupIndex}
                            className="mb-1 border rounded-md shadow-sm"
                        >
                            <div
                                className="flex justify-between items-center px-4 py-2 cursor-pointer"
                                onClick={() => toggleGroup(groupIndex)}
                            >
                                <h2 className="text-xs lg:text-lg">
                                    Episodes {groupIndex * 100 + 1} -{" "}
                                    {(groupIndex + 1) * 100}
                                </h2>
                            </div>
                            {expandedGroup === groupIndex && (
                                <div className="grid grid-cols-5 p-1">
                                    {group.map((episode) => (
                                        <button
                                            onClick={() =>
                                                onSelectedAnimeEpisode(
                                                    episode.id
                                                )
                                            }
                                            key={episode.id}
                                            disabled={episode.id === episodeId}
                                            className={`btn btn-sm rounded-md w-full text-xs ${
                                                episode.id === episodeId
                                                    ? "bg-gray-500 text-white cursor-not-allowed"
                                                    : "bg-slate-400"
                                            }`}
                                        >
                                            {episode.number}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">
                        No episodes available.
                    </p>
                )}
            </div>
        </div>
    );
};

export default AnimeEpisodes;
