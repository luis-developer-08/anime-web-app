import { router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const AnimeEpisodes = ({ anime, isLoading, episodeId }) => {
    // Helper function to chunk the episodes array
    const chunkArray = (array, size) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    };

    // Group episodes by 100
    const groupedEpisodes = isLoading
        ? null
        : chunkArray(anime.episodes || [], 100);

    // Automatically expand the group containing the episodeId
    const getInitialExpandedGroup = () => {
        if (!groupedEpisodes || !episodeId) return null;

        for (let i = 0; i < groupedEpisodes.length; i++) {
            if (
                groupedEpisodes[i].some((episode) => episode.id === episodeId)
            ) {
                return i;
            }
        }
        return null;
    };

    const [expandedGroup, setExpandedGroup] = useState(getInitialExpandedGroup);

    const toggleGroup = (groupIndex) => {
        setExpandedGroup((prevGroup) =>
            prevGroup === groupIndex ? null : groupIndex
        );
    };

    const onSelectedAnimeEpisode = (episodeId) => {
        router.visit("/anime/" + anime.id + "?episodeId=" + episodeId);
    };

    useEffect(() => {
        // Auto-expand the group containing the selected episode on component mount
        const initialGroup = getInitialExpandedGroup();
        if (initialGroup !== null) setExpandedGroup(initialGroup);
    }, [groupedEpisodes, episodeId]);

    return (
        <div>
            <h1 className="text-lg font-bold text-center">Episodes</h1>
            <div className="mt-4 h-[70vh] overflow-y-auto">
                {isLoading ? (
                    <div className="flex flex-wrap justify-center gap-2">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <div
                                key={index}
                                className="w-16 h-8 rounded-md skeleton"
                            ></div>
                        ))}
                    </div>
                ) : anime.episodes && anime.episodes.length > 0 ? (
                    groupedEpisodes.map((group, groupIndex) => (
                        <div
                            key={groupIndex}
                            className="mb-1 border rounded-md shadow-sm"
                        >
                            <div
                                className="flex justify-between items-center px-4 py-2 cursor-pointer"
                                onClick={() => toggleGroup(groupIndex)}
                            >
                                <h2 className="text-sm">
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
