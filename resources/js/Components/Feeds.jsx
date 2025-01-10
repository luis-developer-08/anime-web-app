import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const Feeds = ({ topic }) => {
    const fetchNewsFeeds = async () => {
        const { data } = await axios.get(
            import.meta.env.VITE_API_ANIME_2 +
                `/news/ann/recent-feeds?topic=${topic}`
        );
        return data;
    };

    const { data, isLoading } = useQuery({
        queryFn: fetchNewsFeeds,
        queryKey: ["fetchNewsFeeds", topic],
    });

    return (
        <div className="container mx-auto p-4">
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-lg overflow-hidden"
                        >
                            <div className="w-full h-48 bg-gray-300 animate-pulse"></div>
                            <div className="p-4 space-y-2">
                                <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
                                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                                <div className="h-4 bg-gray-300 rounded animate-pulse w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {data.map((feed) => (
                        <div
                            key={feed.id}
                            className="bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
                        >
                            <img
                                src={feed.thumbnail}
                                alt={feed.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-bold mb-2">
                                    {feed.title}
                                </h2>
                                <p className="text-gray-500 text-sm mb-4">
                                    Uploaded: {feed.uploadedAt}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {feed.topics.map((topic, index) => (
                                        <span
                                            key={index}
                                            className="text-xs font-medium px-2 py-1 bg-gray-200 rounded-full"
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                                <a
                                    href={feed.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    Read More
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Feeds;
