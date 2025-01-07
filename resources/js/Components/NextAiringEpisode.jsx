import React, { useEffect, useState } from "react";

const NextAiringEpisode = ({ nextAiringEpisode }) => {
    const [countdown, setCountdown] = useState(
        nextAiringEpisode?.timeUntilAiring || null
    );

    // Format the airing time to a readable format
    const formatTime = (timestamp) => {
        if (!timestamp) return "N/A";
        const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds
        return date.toLocaleString(); // Adjust to your desired format
    };

    // Calculate time remaining for airing (days, hours, minutes, seconds)
    const calculateTimeUntilAiring = (timeUntilAiring) => {
        if (timeUntilAiring === null || timeUntilAiring === undefined)
            return "N/A";

        const totalSeconds = timeUntilAiring;
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    // Update the countdown every second
    useEffect(() => {
        if (nextAiringEpisode?.timeUntilAiring !== undefined) {
            const timer = setInterval(() => {
                const updatedTimeUntilAiring = countdown - 1;
                if (updatedTimeUntilAiring <= 0) {
                    clearInterval(timer); // Stop the timer when time is up
                } else {
                    setCountdown(updatedTimeUntilAiring);
                }
            }, 1000);

            return () => clearInterval(timer); // Cleanup the timer on component unmount
        }
    }, [countdown, nextAiringEpisode?.timeUntilAiring]);

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-10">
            <h3 className="font-semibold text-center text-gray-800 text-sm">
                Next Episode
            </h3>
            <div className="mt-2">
                <p className="text-gray-600 text-xs">
                    <strong>Episode: </strong>
                    {nextAiringEpisode?.episode}
                </p>
                <p className="text-gray-600 text-xs">
                    <strong>Airing Time: </strong>
                    {formatTime(nextAiringEpisode?.airingTime)}
                </p>
                <p className="text-gray-600 text-xs">
                    <strong>Time Until Airing: </strong>
                    {countdown !== null
                        ? calculateTimeUntilAiring(countdown)
                        : calculateTimeUntilAiring(
                              nextAiringEpisode?.timeUntilAiring
                          )}
                </p>
            </div>
        </div>
    );
};

export default NextAiringEpisode;
