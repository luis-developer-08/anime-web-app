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
        checkPosition(); // Check position when the component first mounts

        return () => {
            window.removeEventListener("scroll", checkPosition);
        };
    }, []);

    return (
        <div
            id={`anime-detail-${anime.id}`}
            className="absolute z-10 bg-slate-800/90 text-white shadow-lg shadow-white rounded-lg p-4 w-[30vw] opacity-0 transition-opacity duration-500 ease-in-out"
            style={{
                left: index >= data.results.length - 3 ? "auto" : "100%", // Show card on left for the last 3 items
                right: index >= data.results.length - 3 ? "100%" : "auto", // Show card on left for the last 3 items
                top: isNearBottom ? "auto" : "0", // If near the bottom, remove the top positioning
                bottom: isNearBottom ? "0" : "auto", // Position at the bottom if near the bottom
                transform:
                    index >= data.results.length - 3
                        ? "none"
                        : "translateX(10px)", // No transform for the last 3 items
                opacity: hoveredAnime?.id === anime.id ? 1 : 0, // Fade in/out effect
            }}
        >
            {/* Embed YouTube video using the embed URL */}
            {anime.trailer.id && (
                <iframe
                    src={
                        "https://www.youtube.com/embed/" +
                        anime.trailer.id +
                        "?autoplay=1" // Autoplay and mute on load
                    }
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

            <h3 className="font-bold text-lg mb-2">
                {anime.title.english || anime.title.userPreferred}
            </h3>
            <div
                className="text-sm"
                dangerouslySetInnerHTML={{
                    __html: anime.description?.slice(0, 150) + "...",
                }}
            />

            <p className="text-sm mt-2">
                <strong>Episodes:</strong> {anime.totalEpisodes}
            </p>
            <p className="text-sm">
                <strong>Status:</strong> {anime.status}
            </p>
        </div>
    );
};

export default AnimeDetails;
