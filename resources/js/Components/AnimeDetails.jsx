import { router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const AnimeDetails = ({ anime, index, data, hoveredAnime }) => {
    const [isNearBottom, setIsNearBottom] = useState(false);

    // Function to check if the component is near the bottom of the screen
    const checkPosition = () => {
        const bottomOffset = 100; // Offset to trigger the "near bottom" detection
        const component = document.getElementById(`anime-detail-${anime.id}`);
        if (component) {
            const rect = component.getBoundingClientRect();
            const isNearBottom =
                rect.bottom >= window.innerHeight - bottomOffset;
            setIsNearBottom(isNearBottom);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", checkPosition);
        checkPosition();

        return () => {
            window.removeEventListener("scroll", checkPosition);
        };
    }, []);

    const onSelectedAnime = (animeId) => {
        router.visit("/anime/" + animeId);
    };

    const isLeftAligned = [6, 7, 8, 9].includes(index % 10); // Check if last digit is 8, 9, or 0

    return (
        <div
            id={`anime-detail-${anime.id}`}
            className="absolute z-10 bg-slate-800/90 text-white shadow-lg shadow-white rounded-lg p-4 w-[30vw] opacity-0 transition-transform duration-500 ease-in-out"
            style={{
                left: isLeftAligned ? "auto" : "100%", // Align to the left if the condition matches
                right: isLeftAligned ? "100%" : "auto", // Align to the right otherwise
                top: isNearBottom ? "auto" : "0", // If near the bottom, adjust positioning
                bottom: isNearBottom ? "0" : "auto", // Position at the bottom if near the bottom
                transform:
                    hoveredAnime?.id === anime.id
                        ? isLeftAligned
                            ? "translateX(-10px)" // Adjust for left-aligned details
                            : "translateX(10px) translateY(-10px)" // Move closer to the image
                        : "translateX(10px)", // Default position
                opacity: hoveredAnime?.id === anime.id ? 1 : 0, // Fade in/out effect
            }}
        >
            <h3 className="font-bold text-lg mb-2">
                {anime.title.english || anime.title.userPreferred}
            </h3>

            {/* Conditional rendering of iframe based on trailer data */}
            {anime.trailer?.id && (
                <iframe
                    src={`https://www.youtube.com/embed/${anime.trailer.id}?autoplay=1`}
                    width="100%"
                    height="200"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="mb-4"
                    title={`${
                        anime.title.english || anime.title.userPreferred
                    } Trailer`}
                ></iframe>
            )}

            <div
                className="text-sm"
                dangerouslySetInnerHTML={{
                    __html: anime.description?.slice(0, 150) + "...",
                }}
            />

            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm mt-2">
                        <strong>Episodes:</strong> {anime.totalEpisodes}
                    </p>
                    <p className="text-sm">
                        <strong>Status:</strong> {anime.status}
                    </p>
                </div>

                <div>
                    <button
                        className="btn btn-sm bg-slate-300"
                        onClick={() => onSelectedAnime(anime.id)}
                    >
                        Watch
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnimeDetails;
